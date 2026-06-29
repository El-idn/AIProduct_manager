import { streamText } from "ai";
import { z } from "zod";
import { defaultModel, fallbackModel, hasGroqKey } from "@/lib/ai/groq";
import { createMockPrdStreamResponse } from "@/lib/ai/mock-responses";
import { buildPrdPrompt } from "@/lib/ai/prompts";
import { checkRateLimit } from "@/lib/ai/rate-limit";

export const maxDuration = 60;

const prdInputSchema = z.object({
  idea: z.string().min(10),
  audience: z.string().min(3),
  businessGoal: z.string().min(3),
  priority: z.enum(["low", "medium", "high", "critical"]),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter ?? 60) },
    });
  }

  const body = await req.json();
  const parsed = prdInputSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 });
  }

  if (!hasGroqKey()) {
    return createMockPrdStreamResponse();
  }

  const prompt = buildPrdPrompt(parsed.data);

  try {
    const result = streamText({
      model: defaultModel(),
      prompt,
    });
    return result.toDataStreamResponse();
  } catch {
    const result = streamText({
      model: fallbackModel(),
      prompt,
    });
    return result.toDataStreamResponse();
  }
}
