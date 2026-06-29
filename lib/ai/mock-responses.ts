const MOCK_PRD = `## Problem Statement

Users struggle to complete onboarding within the first session, leading to low activation rates and early churn. The current flow has 12 steps with unclear value propositions at each stage.

## Goals

- Reduce time-to-first-value from 15 minutes to under 5 minutes
- Increase Day-1 activation rate from 45% to 65%
- Decrease onboarding-related support tickets by 40%

## Success Metrics

- Day-1 activation rate ≥ 65%
- Onboarding completion rate ≥ 80%
- Time-to-first-value ≤ 5 minutes
- NPS for onboarding experience ≥ 40

## User Personas

**Alex — Startup Founder**: Needs quick setup, minimal configuration, immediate ROI visibility.
**Jordan — Product Manager**: Wants structured workflows, team collaboration, and exportable docs.

## User Stories

- As a new user, I want a guided setup wizard so that I can configure my workspace in under 5 minutes.
- As a PM, I want to skip optional steps so that I can reach my dashboard faster.
- As a team lead, I want to invite teammates during onboarding so that collaboration starts immediately.

## Acceptance Criteria

- [ ] Onboarding wizard displays progress indicator (step X of Y)
- [ ] Users can skip non-required steps and return later
- [ ] Workspace is created and dashboard loads within 3 seconds of completion
- [ ] All form inputs validate inline with clear error messages

## Edge Cases

- User closes browser mid-onboarding — progress must persist in local storage
- User attempts to create workspace with duplicate name — show friendly error
- Network failure during final step — retry mechanism with saved draft

## Release Scope

**MVP (v1.0):** 5-step wizard, role selection, workspace creation, goal selection
**v1.1:** Team invites, import from CSV, customizable templates
**Out of scope:** SSO, enterprise provisioning, custom branding`;

const MOCK_COPILOT_RESPONSES: Record<string, string> = {
  default:
    "Based on your workspace context, I'd recommend focusing on onboarding improvements this sprint. Your retention metrics show a 2.1% decline, and customer feedback clusters indicate friction in the first-time user experience.\n\n**Suggested next steps:**\n1. Run a funnel analysis on onboarding drop-off points\n2. Prioritize the onboarding redesign (RICE score: 4800)\n3. Set up a weekly retention review with the team",
  prd: "Here's a draft outline for an onboarding PRD:\n\n**Problem:** Users aren't reaching activation within the first session.\n**Goal:** Reduce time-to-value to under 5 minutes.\n**Key metrics:** Day-1 activation ≥ 65%, completion rate ≥ 80%.\n\nWould you like me to generate the full PRD with user stories and acceptance criteria?",
  churn:
    "Churn analysis summary:\n\n- **Primary driver:** Onboarding friction (38% of churned users cited this)\n- **Secondary:** Missing integrations (22%)\n- **SMB segment** churn elevated at 5.1%\n\n**Recommendations:** Ship onboarding v2, add Jira integration to Pro tier, implement exit surveys.",
  prioritize:
    "Feature prioritization (RICE scores):\n\n1. **AI Copilot v2** — 4,800 (highest impact, moderate effort)\n2. **Onboarding Redesign** — 4,800 (high confidence, low effort)\n3. **Team Permissions** — 1,750\n4. **Mobile Dashboard** — 1,200\n5. **Jira Integration** — 562\n\nI recommend shipping Onboarding Redesign first given retention trends.",
};

export function getMockPrdResponse(): string {
  return MOCK_PRD;
}

export function getMockChatResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("prd") || lower.includes("onboarding")) {
    return MOCK_COPILOT_RESPONSES.prd;
  }
  if (lower.includes("churn") || lower.includes("retention")) {
    return MOCK_COPILOT_RESPONSES.churn;
  }
  if (lower.includes("priorit")) {
    return MOCK_COPILOT_RESPONSES.prioritize;
  }
  return MOCK_COPILOT_RESPONSES.default;
}

export async function* streamMockText(text: string, chunkSize = 8, delayMs = 30) {
  for (let i = 0; i < text.length; i += chunkSize) {
    yield text.slice(i, i + chunkSize);
    await new Promise((r) => setTimeout(r, delayMs));
  }
}

export function createMockStreamResponse(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of streamMockText(text)) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Demo-Mode": "true",
    },
  });
}

export function createMockPrdStreamResponse(): Response {
  return createMockStreamResponse(getMockPrdResponse());
}
