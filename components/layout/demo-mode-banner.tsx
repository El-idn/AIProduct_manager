"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/use-app-store";

export function DemoModeBanner() {
  const dismissed = useAppStore((s) => s.demoModeBannerDismissed);
  const dismiss = useAppStore((s) => s.dismissDemoBanner);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">
      <span>
        Demo mode — add <code className="rounded bg-black/30 px-1">GROQ_API_KEY</code> for live AI
        streaming. Get a free key at{" "}
        <a
          href="https://console.groq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          console.groq.com
        </a>
      </span>
      <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={dismiss}>
        <X className="size-4" />
      </Button>
    </div>
  );
}
