 import OpenAI from 'openai';
 import { OPENAI_KEY } from './constants';

    const openai = new OpenAI({
      apiKey: OPENAI_KEY, // Or replace with your actual API key
      dangerouslyAllowBrowser: true,
    });

export default openai;