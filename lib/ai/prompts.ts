export const PRD_SECTIONS = [
  "Problem Statement",
  "Goals",
  "Success Metrics",
  "User Personas",
  "User Stories",
  "Acceptance Criteria",
  "Edge Cases",
  "Release Scope",
] as const;

export function buildPrdPrompt(input: {
  idea: string;
  audience: string;
  businessGoal: string;
  priority: string;
}): string {
  return `You are a senior product manager. Generate a comprehensive PRD for the following feature.

Feature Idea: ${input.idea}
Target Audience: ${input.audience}
Business Goal: ${input.businessGoal}
Priority: ${input.priority}

Respond in markdown with EXACTLY these section headings (use ## for each):
## Problem Statement
## Goals
## Success Metrics
## User Personas
## User Stories
## Acceptance Criteria
## Edge Cases
## Release Scope

Be specific, actionable, and engineering-ready. Use bullet points where appropriate.`;
}

export function buildCopilotSystemPrompt(context: {
  role?: string;
  workspaceName?: string;
  goals?: string[];
  recentPrds?: string[];
}): string {
  const parts = [
    "You are ProdPilot AI, an expert product management copilot.",
    "Help with PRDs, prioritization, customer feedback analysis, roadmap planning, and KPI interpretation.",
    "Be concise, structured, and actionable. Use markdown formatting when helpful.",
  ];

  if (context.workspaceName) {
    parts.push(`Workspace: ${context.workspaceName}`);
  }
  if (context.role) {
    parts.push(`User role: ${context.role}`);
  }
  if (context.goals?.length) {
    parts.push(`Workspace goals: ${context.goals.join(", ")}`);
  }
  if (context.recentPrds?.length) {
    parts.push(`Recent PRDs: ${context.recentPrds.join("; ")}`);
  }

  return parts.join("\n");
}
