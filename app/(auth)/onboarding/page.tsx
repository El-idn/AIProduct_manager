"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store/use-app-store";
import type { UserRole, WorkspaceGoal } from "@/lib/types";
import { cn } from "@/lib/utils";

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: "founder", label: "Founder", description: "Building and scaling a product" },
  { value: "pm", label: "Product Manager", description: "Owning roadmap and delivery" },
  { value: "engineer", label: "Engineer", description: "Shipping features and systems" },
  { value: "designer", label: "Designer", description: "Crafting user experiences" },
];

const goals: { value: WorkspaceGoal; label: string }[] = [
  { value: "roadmap", label: "Roadmap planning" },
  { value: "prd", label: "PRD generation" },
  { value: "kpi", label: "KPI tracking" },
  { value: "feedback", label: "Customer feedback analysis" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const setRole = useAppStore((s) => s.setRole);
  const setWorkspace = useAppStore((s) => s.setWorkspace);
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<WorkspaceGoal[]>([]);
  const [generating, setGenerating] = useState(false);

  const toggleGoal = (goal: WorkspaceGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const finish = async () => {
    if (!selectedRole || !workspaceName || selectedGoals.length === 0) return;
    setGenerating(true);
    setRole(selectedRole);
    setWorkspace(workspaceName, selectedGoals);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-lg border-white/10">
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="size-5 text-violet-400" />
            <span className="text-sm font-medium">Setup your workspace</span>
          </div>
          <CardTitle>Welcome to ProdPilot AI</CardTitle>
          <CardDescription>Step {step} of 4</CardDescription>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  s <= step ? "bg-violet-500" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <Label>Select your role</Label>
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-colors",
                      selectedRole === role.value
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <p className="font-medium">{role.label}</p>
                    <p className="text-muted-foreground text-sm">{role.description}</p>
                  </button>
                ))}
                <Button
                  className="w-full"
                  disabled={!selectedRole}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="workspace">Workspace name</Label>
                  <Input
                    id="workspace"
                    placeholder="Acme Product Team"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={workspaceName.length < 2}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Label>What are your goals?</Label>
                {goals.map((goal) => (
                  <label
                    key={goal.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3 hover:border-white/20"
                  >
                    <Checkbox
                      checked={selectedGoals.includes(goal.value)}
                      onCheckedChange={() => toggleGoal(goal.value)}
                    />
                    <span>{goal.label}</span>
                  </label>
                ))}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={selectedGoals.length === 0}
                    onClick={() => setStep(4)}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 text-center"
              >
                <div className="py-8">
                  <Sparkles className="mx-auto size-12 text-violet-400" />
                  <h3 className="mt-4 text-lg font-medium">Generate your dashboard</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    We&apos;ll set up KPI widgets, AI recommendations, and shortcuts based on your
                    goals.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={finish} disabled={generating}>
                    {generating ? "Generating..." : "Launch Dashboard"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
