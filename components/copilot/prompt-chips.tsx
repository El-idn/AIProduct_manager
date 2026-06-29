"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PromptChipsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
  className?: string;
}

export function PromptChips({ prompts, onSelect, className }: PromptChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
