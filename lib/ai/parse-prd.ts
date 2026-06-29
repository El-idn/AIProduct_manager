import { PRD_SECTIONS } from "@/lib/ai/prompts";
import type { PrdSection } from "@/lib/types";
import { generateId } from "@/lib/utils";

export function parsePrdMarkdown(markdown: string): PrdSection[] {
  const sections: PrdSection[] = [];
  const lines = markdown.split("\n");
  let currentTitle: string | null = null;
  let currentContent: string[] = [];

  const flush = () => {
    if (currentTitle) {
      sections.push({
        id: generateId(),
        title: currentTitle,
        content: currentContent.join("\n").trim(),
      });
    }
    currentContent = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      flush();
      currentTitle = headingMatch[1].trim();
      continue;
    }
    if (currentTitle) {
      currentContent.push(line);
    }
  }
  flush();

  if (sections.length === 0) {
    return PRD_SECTIONS.map((title) => ({
      id: generateId(),
      title,
      content: markdown.trim(),
    }));
  }

  return sections;
}

export function sectionsToMarkdown(sections: PrdSection[]): string {
  return sections.map((s) => `## ${s.title}\n\n${s.content}`).join("\n\n");
}
