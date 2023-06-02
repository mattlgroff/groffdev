import { Configuration, OpenAIApi } from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)
