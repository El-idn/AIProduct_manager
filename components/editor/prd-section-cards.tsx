"use client";

import type { PrdSection } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface PrdSectionCardsProps {
  sections: PrdSection[];
  onChange: (sections: PrdSection[]) => void;
  readOnly?: boolean;
}

export function PrdSectionCards({ sections, onChange, readOnly }: PrdSectionCardsProps) {
  const updateSection = (id: string, content: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {readOnly ? (
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                {section.content}
              </div>
            ) : (
              <Textarea
                value={section.content}
                onChange={(e) => updateSection(section.id, e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
