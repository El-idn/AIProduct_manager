"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { CommandPalette } from "@/components/layout/command-palette";
import { DemoModeBanner } from "@/components/layout/demo-mode-banner";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <DemoModeBanner />
        <TopNav onOpenCommand={() => setCommandOpen(true)} />
        <main className={cn("flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6")}>
          {children}
        </main>
        <MobileNav />
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
