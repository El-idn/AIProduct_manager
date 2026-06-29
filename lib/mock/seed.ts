export const kpiMetrics = [
  { label: "DAU", value: 12450, change: 8.2, trend: "up" as const },
  { label: "MAU", value: 48200, change: 12.4, trend: "up" as const },
  { label: "Retention", value: 68.5, change: -2.1, trend: "down" as const, suffix: "%" },
  { label: "Churn", value: 3.2, change: -0.8, trend: "up" as const, suffix: "%" },
];

export const sprintVelocity = [
  { sprint: "S1", points: 34 },
  { sprint: "S2", points: 42 },
  { sprint: "S3", points: 38 },
  { sprint: "S4", points: 51 },
  { sprint: "S5", points: 47 },
  { sprint: "S6", points: 55 },
];

export const sentimentData = [
  { month: "Jan", positive: 62, neutral: 28, negative: 10 },
  { month: "Feb", positive: 58, neutral: 30, negative: 12 },
  { month: "Mar", positive: 65, neutral: 25, negative: 10 },
  { month: "Apr", positive: 70, neutral: 22, negative: 8 },
  { month: "May", positive: 67, neutral: 24, negative: 9 },
  { month: "Jun", positive: 72, neutral: 20, negative: 8 },
];

export const featurePrioritization = [
  { feature: "AI Copilot v2", reach: 10000, impact: 3, confidence: 0.8, effort: 5, rice: 4800 },
  { feature: "Onboarding Redesign", reach: 8000, impact: 2, confidence: 0.9, effort: 3, rice: 4800 },
  { feature: "Team Permissions", reach: 5000, impact: 2, confidence: 0.7, effort: 4, rice: 1750 },
  { feature: "Mobile Dashboard", reach: 12000, impact: 1, confidence: 0.6, effort: 6, rice: 1200 },
  { feature: "Jira Integration", reach: 3000, impact: 3, confidence: 0.5, effort: 8, rice: 562 },
];

export const aiRecommendations = [
  {
    title: "Prioritize onboarding improvements",
    description:
      "Retention dropped 2.1% this month. Customer feedback clusters show onboarding friction as the top complaint.",
    priority: "high",
  },
  {
    title: "Ship AI Copilot v2",
    description:
      "Highest RICE score with strong user demand. Engineering capacity available in Q3.",
    priority: "medium",
  },
];

export const anomalyAlerts = [
  {
    id: "1",
    type: "risk" as const,
    title: "Retention dropped 12% WoW",
    description: "Day-7 retention fell from 42% to 37% in the past week. Onboarding drop-off is the primary driver.",
    metric: "Retention",
    change: -12,
  },
  {
    id: "2",
    type: "opportunity" as const,
    title: "Conversion spike in trial signups",
    description: "Trial-to-paid conversion increased 18% after the pricing page redesign.",
    metric: "Conversion",
    change: 18,
  },
  {
    id: "3",
    type: "risk" as const,
    title: "Churn elevated in SMB segment",
    description: "SMB churn rate hit 5.1%, above the 3.5% threshold. Support tickets cite missing integrations.",
    metric: "Churn",
    change: 5.1,
  },
];

export const revenueData = [
  { month: "Jan", mrr: 42000, arr: 504000 },
  { month: "Feb", mrr: 44500, arr: 534000 },
  { month: "Mar", mrr: 47200, arr: 566400 },
  { month: "Apr", mrr: 49800, arr: 597600 },
  { month: "May", mrr: 52100, arr: 625200 },
  { month: "Jun", mrr: 55400, arr: 664800 },
];

export const engagementData = [
  { day: "Mon", sessions: 8200, pageViews: 24500 },
  { day: "Tue", sessions: 9100, pageViews: 26800 },
  { day: "Wed", sessions: 8800, pageViews: 25200 },
  { day: "Thu", sessions: 9500, pageViews: 28100 },
  { day: "Fri", sessions: 10200, pageViews: 30400 },
  { day: "Sat", sessions: 5400, pageViews: 14200 },
  { day: "Sun", sessions: 4800, pageViews: 12800 },
];

export const retentionCohorts = [
  { week: "W1", d1: 85, d7: 62, d30: 45 },
  { week: "W2", d1: 87, d7: 64, d30: 47 },
  { week: "W3", d1: 84, d7: 58, d30: 42 },
  { week: "W4", d1: 86, d7: 61, d30: 44 },
];

export const conversionFunnel = [
  { stage: "Visitors", value: 100000 },
  { stage: "Signups", value: 12500 },
  { stage: "Activated", value: 8200 },
  { stage: "Trial", value: 4100 },
  { stage: "Paid", value: 1850 },
];

export const churnData = [
  { month: "Jan", rate: 4.2 },
  { month: "Feb", rate: 3.8 },
  { month: "Mar", rate: 3.5 },
  { month: "Apr", rate: 3.9 },
  { month: "May", rate: 3.4 },
  { month: "Jun", rate: 3.2 },
];

export const landingFeatures = [
  {
    title: "AI PRD Generator",
    description:
      "Turn feature ideas into engineering-ready PRDs with problem statements, user stories, and acceptance criteria.",
  },
  {
    title: "Prioritization Engine",
    description:
      "Score features with RICE, MoSCoW, and impact-effort matrices. AI recommends what to build next.",
  },
  {
    title: "Feedback Intelligence",
    description:
      "Cluster customer feedback, detect sentiment trends, and surface recurring feature requests automatically.",
  },
  {
    title: "Roadmap Planning",
    description:
      "Drag-and-drop timelines with AI sprint recommendations and dependency detection.",
  },
  {
    title: "KPI Monitoring",
    description:
      "Track DAU, retention, churn, and revenue with AI-powered anomaly detection and alerts.",
  },
  {
    title: "AI Copilot",
    description:
      "Ask natural language questions about your product, metrics, and roadmap in a streaming chat workspace.",
  },
];

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For solo PMs exploring AI workflows",
    features: ["10 AI generations/mo", "1 workspace", "Basic analytics", "PRD export"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing product teams",
    features: [
      "Unlimited AI",
      "Team collaboration",
      "Advanced analytics",
      "Prioritization engine",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations at scale",
    features: ["SSO", "Audit logs", "Custom AI models", "Dedicated onboarding"],
  },
];
