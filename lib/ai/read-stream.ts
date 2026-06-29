export async function readDataStream(
  response: Response,
  onChunk: (text: string) => void
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("0:")) {
        try {
          const text = JSON.parse(line.slice(2));
          if (typeof text === "string") onChunk(text);
        } catch {
          // skip malformed lines
        }
      }
    }
  }
}
