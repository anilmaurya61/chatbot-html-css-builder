import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1', 
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000', 
    'X-Title': 'html-css-chatbot',
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'mistralai/mixtral-8x7b-instruct', 
    stream: false,
    messages: [
      {
        role: 'system',
        content: `You are an expert frontend engineer. Return a complete, responsive HTML document with embedded Tailwind CSS. Do not include JavaScript or explanations.`,
      },
      ...messages,
    ],
  });

  const result = response.choices?.[0]?.message?.content ?? '';
  return NextResponse.json({ content: result });
}
