import { streamText } from "ai";
import { defaultModel, fallbackModel, hasGroqKey } from "@/lib/ai/groq";
import { createMockStreamResponse, getMockChatResponse } from "@/lib/ai/mock-responses";
import { buildCopilotSystemPrompt } from "@/lib/ai/prompts";
import { checkRateLimit } from "@/lib/ai/rate-limit";

export const maxDuration = 30;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter ?? 60) },
    });
  }

  const { messages, context } = await req.json();
  const lastMessage = messages?.[messages.length - 1]?.content ?? "";

  if (!hasGroqKey()) {
    return createMockStreamResponse(getMockChatResponse(lastMessage));
  }

  try {
    const result = streamText({
      model: defaultModel(),
      system: buildCopilotSystemPrompt(context ?? {}),
      messages,
    });
    return result.toDataStreamResponse();
  } catch {
    const result = streamText({
      model: fallbackModel(),
      system: buildCopilotSystemPrompt(context ?? {}),
      messages,
    });
    return result.toDataStreamResponse();
  }
}
