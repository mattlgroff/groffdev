import { supabase } from 'src/lib/supabase'
import { openai } from 'src/lib/openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  try {
    // Check if the query is missing
    const { query } = req.body
    if (!query) {
      res.status(400).json({ error: 'Missing query' })
      return
    }

    // Remove newlines from the query as per OpenAI recommendation
    const input = query.replace(/\n/g, ' ')

    // We have to pass our query through the text-embedding-ada-002 model to get an embedding
    const embeddingResponse = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input,
    })
    const [{ embedding }] = embeddingResponse.data.data

    // Now we can pass our embedding to the match_sections postgres function
    const response = await supabase.rpc('match_groffdev_pages', {
      query_embedding: embedding,
      match_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 3, // Choose the number of matches
    })
    const { data: sections } = response

    // Crafting the prompt for our completions response
    let sectionsText = ''
    for (const section of sections) {
      sectionsText += `\n### ${section.document_title} - ${section.section_title}\n${section.body}\n`
    }

    const prompt = `
          You are a friendly and knowledgeable GroffDev chatbot, trained to provide accurate answers using the information found on GroffDev, the personal website and blog of Matthew Groff. Given the following pages from the site, answer the question using only that information. Please answer in a conversational and factual manner, including the relevant information from the pages provided. If the answer is not explicitly written in GroffDev, say "Sorry, that's outside the scope of GroffDev."
    
          Context sections:
          ${sectionsText}
        
          Question: """
          ${query}
          """
        
          Response:
        `

    // Now we can pass our prompt to the text-davinci-003 model to get our completion (result)
    const completionResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 512, // Choose the max allowed tokens in completion
      temperature: 0, // Set to 0 for deterministic results
    })

    const {
      id,
      choices: [{ text }],
    } = completionResponse.data

    // Adding the record to groffdev_chatbot_conversations table in Supabase
    await supabase.from('groffdev_chatbot_conversations').insert([
      {
        question: query,
        response: text,
        timestamp: new Date(),
      },
    ]);

    // send the response
    res.status(200).json({ id, text })
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' })
    }
  }
}
