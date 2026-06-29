"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ChatThread,
  PrdDocument,
  User,
  UserRole,
  Workspace,
  WorkspaceGoal,
} from "@/lib/types";
import { generateId } from "@/lib/utils";

interface AppState {
  user: User | null;
  workspace: Workspace | null;
  prds: PrdDocument[];
  chatThread: ChatThread | null;
  demoModeBannerDismissed: boolean;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  setWorkspace: (name: string, goals: WorkspaceGoal[]) => void;
  logout: () => void;
  addPrd: (prd: PrdDocument) => void;
  updatePrd: (id: string, updates: Partial<PrdDocument>) => void;
  getPrd: (id: string) => PrdDocument | undefined;
  savePrdVersion: (id: string, sections: PrdDocument["sections"]) => void;
  setChatThread: (thread: ChatThread | null) => void;
  dismissDemoBanner: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      workspace: null,
      prds: [],
      chatThread: null,
      demoModeBannerDismissed: false,

      setUser: (user) => set({ user }),

      setRole: (role) =>
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        })),

      setWorkspace: (name, goals) =>
        set({
          workspace: {
            id: generateId(),
            name,
            goals,
          },
        }),

      logout: () =>
        set({
          user: null,
          workspace: null,
          prds: [],
          chatThread: null,
        }),

      addPrd: (prd) => set((state) => ({ prds: [prd, ...state.prds] })),

      updatePrd: (id, updates) =>
        set((state) => ({
          prds: state.prds.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),

      getPrd: (id) => get().prds.find((p) => p.id === id),

      savePrdVersion: (id, sections) =>
        set((state) => ({
          prds: state.prds.map((p) => {
            if (p.id !== id) return p;
            const versions = [
              { savedAt: new Date().toISOString(), sections: [...p.sections] },
              ...p.versions,
            ].slice(0, 5);
            return {
              ...p,
              sections,
              versions,
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      setChatThread: (thread) => set({ chatThread: thread }),

      dismissDemoBanner: () => set({ demoModeBannerDismissed: true }),
    }),
    {
      name: "prodpilot-store",
      partialize: (state) => ({
        user: state.user,
        workspace: state.workspace,
        prds: state.prds,
        chatThread: state.chatThread,
        demoModeBannerDismissed: state.demoModeBannerDismissed,
      }),
    }
  )
);
