import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/product-context';
import { getKnowledgeBase } from '@/lib/data';

export const maxDuration = 30;

const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  baseURL: 'https://api.deepseek.com',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.DEEPSEEK_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'DEEPSEEK_API_KEY tidak diset. Sila tambah dalam .env' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let knowledgeContext = '';
  try {
    const kbItems = await getKnowledgeBase();
    if (kbItems.length > 0) {
      const grouped: Record<string, string[]> = {};
      for (const item of kbItems) {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(`${item.title}: ${item.content}`);
      }
      const sections = Object.entries(grouped)
        .map(([cat, entries]) => `[${cat}]\n${entries.join('\n')}`)
        .join('\n\n');
      knowledgeContext = `\n\n## KNOWLEDGE BASE (rujukan terkini dari admin)\n\n${sections}`;
    }
  } catch {
    // fallback — guna system prompt tanpa KB
  }

  const result = await streamText({
    model: deepseek('deepseek-chat'),
    system: CHATBOT_SYSTEM_PROMPT + knowledgeContext,
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}
