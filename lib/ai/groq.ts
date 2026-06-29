import { createGroq } from "@ai-sdk/groq";

export function hasGroqKey(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const defaultModel = () => groq("llama-3.3-70b-versatile");
export const fallbackModel = () => groq("llama-3.1-8b-instant");
