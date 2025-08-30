

import OpenAI from 'openai';

const openai = new OpenAI({
  // OpenRouter API Base URL
  baseURL: "https://openrouter.ai/api/v1", 
  // Your OpenRouter API key, securely loaded from environment variables
  apiKey: process.env.REACT_APP_OPENAI_KEY, 
  dangerouslyAllowBrowser: true,
});

export default openai;
