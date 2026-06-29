"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { PrdSectionCards } from "@/components/editor/prd-section-cards";
import { parsePrdMarkdown, sectionsToMarkdown } from "@/lib/ai/parse-prd";
import { useAppStore } from "@/lib/store/use-app-store";
import type { PrdDocument, PrdSection } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { readDataStream } from "@/lib/ai/read-stream";

const prdFormSchema = z.object({
  idea: z.string().min(10, "Describe your feature idea (min 10 characters)"),
  audience: z.string().min(3, "Target audience is required"),
  businessGoal: z.string().min(3, "Business goal is required"),
  priority: z.enum(["low", "medium", "high", "critical"]),
});

type PrdForm = z.infer<typeof prdFormSchema>;

type Step = "input" | "generating" | "editor";

export default function PrdPage() {
  const router = useRouter();
  const addPrd = useAppStore((s) => s.addPrd);
  const [step, setStep] = useState<Step>("input");
  const [streamedText, setStreamedText] = useState("");
  const [sections, setSections] = useState<PrdSection[]>([]);
  const [formData, setFormData] = useState<PrdForm | null>(null);
  const [prdId, setPrdId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PrdForm>({
    resolver: zodResolver(prdFormSchema),
    defaultValues: { priority: "medium" },
  });

  const priority = watch("priority");

  const generatePrd = async (data: PrdForm) => {
    setFormData(data);
    setStep("generating");
    setStreamedText("");

    try {
      const response = await fetch("/api/ai/prd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Generation failed");

      let fullText = "";
      await readDataStream(response, (chunk) => {
        fullText += chunk;
        setStreamedText(fullText);
      });

      const parsed = parsePrdMarkdown(fullText);
      setSections(parsed);
      const id = generateId();
      setPrdId(id);
      setStep("editor");
    } catch {
      toast.error("Failed to generate PRD. Please try again.");
      setStep("input");
    }
  };

  const savePrd = () => {
    if (!formData || !prdId) return;
    const prd: PrdDocument = {
      id: prdId,
      title: formData.idea.slice(0, 60) + (formData.idea.length > 60 ? "..." : ""),
      idea: formData.idea,
      audience: formData.audience,
      businessGoal: formData.businessGoal,
      priority: formData.priority,
      sections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [],
    };
    addPrd(prd);
    toast.success("PRD saved successfully");
    router.push(`/prd/${prdId}`);
  };

  const exportMarkdown = () => {
    const md = sectionsToMarkdown(sections);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prd-${prdId ?? "draft"}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown exported");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="AI PRD Generator"
        description="Describe your feature idea and get a structured, engineering-ready PRD."
      />

      {step === "input" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-violet-400" />
              Feature Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(generatePrd)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idea">Feature idea</Label>
                <Textarea
                  id="idea"
                  placeholder="Describe the feature you want to build..."
                  className="min-h-[100px]"
                  {...register("idea")}
                />
                {errors.idea && (
                  <p className="text-destructive text-xs">{errors.idea.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target audience</Label>
                <Input id="audience" placeholder="e.g. Product managers at SaaS startups" {...register("audience")} />
                {errors.audience && (
                  <p className="text-destructive text-xs">{errors.audience.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessGoal">Business goal</Label>
                <Input id="businessGoal" placeholder="e.g. Increase user activation by 20%" {...register("businessGoal")} />
                {errors.businessGoal && (
                  <p className="text-destructive text-xs">{errors.businessGoal.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(v) => setValue("priority", v as PrdForm["priority"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                <Sparkles className="mr-2 size-4" />
                Generate PRD
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "generating" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Loader2 className="size-4 animate-spin text-violet-400" />
              Generating your PRD...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-mono text-sm">
              {streamedText || "Starting generation..."}
              <span className="animate-pulse">▊</span>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "editor" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={savePrd}>Save PRD</Button>
            <Button variant="outline" onClick={exportMarkdown}>
              Export Markdown
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("PDF export available in Pro tier (demo)")}
            >
              Export PDF
            </Button>
            <Button variant="ghost" onClick={() => setStep("input")}>
              Start over
            </Button>
          </div>
          <PrdSectionCards sections={sections} onChange={setSections} />
        </div>
      )}
    </div>
  );
}
