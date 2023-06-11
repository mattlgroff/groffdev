import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { SimpleLayout } from 'src/components/SimpleLayout';
import { Button } from 'src/components/Button';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    // Add this line to create a reference to the input
    const inputRef = useRef();

    useEffect(() => {
      // Automatically focus the input when the component renders
      inputRef.current.focus();
    }, [messages, isLoading]);

  const sendMessage = async (event) => {
    event.preventDefault();

    // Get the previous messages sent by the user
    const previousUserMessages = messages
      .filter((message) => message.sender === 'user')
      .map((message) => message.text);

    // Get the last system message, if one exists.
    const lastSystemMessage = messages
      .filter((message) => message.sender === 'bot')
      .map((message) => message.text)
      .pop();

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, sender: 'user' },
    ]);

    setQuery('');
    setIsLoading(true); // start loading

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, previousUserMessages, lastSystemMessage }),
      });
      const data = await response.json();

      if (data.error || data.errorMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.error || data.errorMessage, sender: 'bot' },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.text, sender: 'bot' },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Sorry, there was an issue with your request. Please try again.',
          sender: 'bot',
        },
      ]);
    }

    setIsLoading(false); // end loading
  };

  return (
    <>
      <Head>
        <title>GroffDev ChatBot</title>
        <meta name="description" content="Chat with GroffDev's ChatBot." />
      </Head>
      <SimpleLayout
        title="GroffDev ChatBot"
        intro="Enter your query below and get the answer from our friendly ChatBot. It's trained on the other pages of this site."
      >
        <div className="rounded-md bg-white p-4 shadow-md dark:bg-zinc-700">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`text-${
                message.sender === 'bot' ? 'teal-500' : 'black'
              } mb-2 rounded-md p-2`}
            >
              {message.text}
            </div>
          ))}
          <form onSubmit={sendMessage} className="mt-4 flex items-center">
            <input
              type="text"
              className="mr-4 flex-grow rounded-md border border-zinc-500/20 p-2 dark:border-zinc-800/50 dark:bg-zinc-800 dark:text-zinc-100"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={inputRef}
            />
            <Button type="submit" className="group w-20" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Send'}
            </Button>
          </form>
        </div>
      </SimpleLayout>
    </>
  );
}
