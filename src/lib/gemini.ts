import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function getClimateSuggestion(topic: string): Promise<string> {
  try {
    const prompt = topic.includes('?') 
      ? topic 
      : `Provide practical and actionable suggestions related to climate change focusing on ${topic}. Include specific steps, potential impact, and why it's important. Keep the response concise and engaging.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting climate suggestion:', error);
    throw new Error('Failed to get suggestion');
  }
}