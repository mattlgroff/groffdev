import { supabase } from 'src/lib/supabase';
import { openai } from 'src/lib/openai';
import { encode } from 'gpt-3-encoder';

const reservedTokensForResponse = 512;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Check if the query is missing
    const { query, previousUserMessages, lastSystemMessage } = req.body;
    if (!query) {
      res.status(400).json({ error: 'Missing query' });
      return;
    }

    // Remove newlines from the query as per OpenAI recommendation
    const input = query.replace(/\n/g, ' ');

    // We have to pass our query through the text-embedding-ada-002 model to get an embedding
    const embeddingResponse = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input,
    });
    const [{ embedding }] = embeddingResponse.data.data;

    // Now we can pass our embedding to the match_sections postgres function
    const response = await supabase.rpc('match_groffdev_pages', {
      query_embedding: embedding,
      match_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 5, // Choose the number of matches
    });
    const { data: sections } = response;

    // Crafting the prompt for our completions response
    let sectionsText = '';
    for (const section of sections) {
      let sectionBody = section.body.substring(0, 1000);
      sectionsText += `\nSource: ${section.document_title} Pages: ${section.section_title}\n${sectionBody}\n`;
    }

    let systemMessage = `
      You are a friendly and knowledgeable GroffDev chatbot, trained to provide accurate answers using the information found on GroffDev, the personal website and blog of Matthew Groff. Given the following pages from the site, answer the question using only that information. Please answer in a conversational and factual manner, including the relevant information from the pages provided. If the answer is not explicitly written in GroffDev, say "Sorry, that's outside the scope of GroffDev."
    
      Context Pages:
      ${sectionsText}
    `;

    const userMessage = `Question: "${query}"`;

    let encodedSystemMessage = encode(systemMessage);
    const encodedUserMessage = encode(userMessage);

    let totalTokenCount =
      encodedSystemMessage.length +
      encodedUserMessage.length +
      reservedTokensForResponse;

    // If totalTokenCount exceeds 3500, shrink the message
    while (totalTokenCount > 3500) {
      const tokenOverage = totalTokenCount - 3500;
      if (systemMessage.length > tokenOverage) {
        systemMessage = systemMessage.slice(
          0,
          systemMessage.length - tokenOverage
        );
        encodedSystemMessage = encode(systemMessage);
      } else {
        throw new Error('System message too long to fit within token limits.');
      }
      totalTokenCount =
        encodedSystemMessage.length +
        encodedUserMessage.length +
        reservedTokensForResponse;
    }

    // Create the messages array
    const messages = createMessagesArray(query, sectionsText, previousUserMessages, lastSystemMessage);
    console.log('messages', messages);
    

    // Now we can pass our messages to the gpt-3.5-turbo model to get our completion (result)
    const chatResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: reservedTokensForResponse,
      temperature: 0.2,
    });

    if (
      !chatResponse.data.choices ||
      !chatResponse.data.choices[0]?.message?.content
    ) {
      throw new Error(
        'There was a problem when asking your question, please try again.'
      );
    }

    const {
      id,
      choices: [
        {
          message: { content: text },
        },
      ],
    } = chatResponse.data;

    // Adding the record to groffdev_chatbot_conversations table in Supabase
    await supabase.from('groffdev_chatbot_conversations').insert([
      {
        question: query,
        response: text,
        timestamp: new Date(),
      },
    ]);

    // send the response
    res.status(200).json({ id, text });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
}

function createMessagesArray(query, sectionsText, previousUserMessages, lastSystemMessage) {
  // Initial array with system message and user's query
  let messagesArray = [
    {
      role: 'system',
      content: `
        You are a friendly and knowledgeable GroffDev chatbot, trained to provide accurate answers using the information found on GroffDev, the personal website and blog of Matthew Groff. Given the following pages from the site, answer the question using only that information. Please answer in a conversational and factual manner, including the relevant information from the pages provided. If the answer is not explicitly written in GroffDev, say "Sorry, that's outside the scope of GroffDev."
    
        Context Pages:
        ${sectionsText}
      `,
    },
  ];

  // Add previous user messages to the array
  messagesArray = messagesArray.concat(previousUserMessages.map((message) => ({
    role: 'user',
    content: message,
  })));

  // If last system message exists, add it to the array
  if (lastSystemMessage) {
    messagesArray.push({
      role: 'system',
      content: lastSystemMessage,
    });
  }

  messagesArray.push(
    {
      role: 'user',
      content: `Question: "${query}"`,
    },
  );

  return messagesArray;
}