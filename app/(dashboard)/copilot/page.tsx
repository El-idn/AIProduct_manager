"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { PromptChips } from "@/components/copilot/prompt-chips";
import { useAppStore } from "@/lib/store/use-app-store";
import { cn } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  "Generate onboarding PRD",
  "Summarize churn reasons",
  "Prioritize these features",
  "Why did retention drop?",
];

export default function CopilotPage() {
  const user = useAppStore((s) => s.user);
  const workspace = useAppStore((s) => s.workspace);
  const prds = useAppStore((s) => s.prds);
  const chatThread = useAppStore((s) => s.chatThread);
  const setChatThread = useAppStore((s) => s.setChatThread);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages } =
    useChat({
      api: "/api/ai/chat",
      body: {
        context: {
          role: user?.role,
          workspaceName: workspace?.name,
          goals: workspace?.goals,
          recentPrds: prds.slice(0, 3).map((p) => p.title),
        },
      },
      initialMessages: chatThread?.messages ?? [],
    });

  useEffect(() => {
    if (messages.length > 0) {
      setChatThread({
        id: chatThread?.id ?? "default",
        messages: messages.map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [messages, setChatThread, chatThread?.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handlePrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 lg:flex-row">
      <div className="flex flex-1 flex-col">
        <PageHeader
          title="AI Copilot"
          description="Ask questions about your product, metrics, and roadmap."
        />

        <ScrollArea className="flex-1 rounded-xl border border-white/10">
          <div className="space-y-4 p-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="mb-4 size-10 text-violet-400" />
                <h3 className="text-lg font-medium">How can I help?</h3>
                <p className="text-muted-foreground mt-1 max-w-sm text-sm">
                  Ask about PRDs, prioritization, churn analysis, or roadmap planning.
                </p>
                <PromptChips prompts={SUGGESTED_PROMPTS} onSelect={handlePrompt} />
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-xl px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-violet-600/20 ml-auto"
                    : "bg-white/5 mr-auto"
                )}
              >
                <p className="mb-1 text-xs font-medium opacity-60">
                  {message.role === "user" ? "You" : "ProdPilot AI"}
                </p>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="bg-white/5 mr-auto max-w-[85%] rounded-xl px-4 py-3 text-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {messages.length > 0 && (
          <PromptChips prompts={SUGGESTED_PROMPTS} onSelect={handlePrompt} className="mt-2" />
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Ask ProdPilot AI anything..."
            className="min-h-[44px] resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
      </div>

      <Card className="hidden w-72 shrink-0 lg:block">
        <CardHeader>
          <CardTitle className="text-sm">Workspace Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Workspace</p>
            <p className="font-medium">{workspace?.name ?? "Not set"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Role</p>
            <p className="font-medium capitalize">{user?.role ?? "Not set"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Goals</p>
            <p className="font-medium">
              {workspace?.goals?.join(", ") ?? "None"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Recent PRDs</p>
            {prds.length === 0 ? (
              <p className="text-muted-foreground">No PRDs yet</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {prds.slice(0, 3).map((p) => (
                  <li key={p.id} className="truncate text-xs">
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setMessages([])}
          >
            Clear chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
