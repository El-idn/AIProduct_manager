export type UserRole = "founder" | "pm" | "engineer" | "designer";

export type WorkspaceGoal =
  | "roadmap"
  | "prd"
  | "kpi"
  | "feedback";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
}

export interface Workspace {
  id: string;
  name: string;
  goals: WorkspaceGoal[];
}

export interface PrdSection {
  id: string;
  title: string;
  content: string;
}

export interface PrdDocument {
  id: string;
  title: string;
  idea: string;
  audience: string;
  businessGoal: string;
  priority: "low" | "medium" | "high" | "critical";
  sections: PrdSection[];
  createdAt: string;
  updatedAt: string;
  versions: { savedAt: string; sections: PrdSection[] }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatThread {
  id: string;
  messages: ChatMessage[];
  updatedAt: string;
}
