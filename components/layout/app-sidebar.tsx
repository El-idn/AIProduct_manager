"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Map,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/copilot", label: "AI Copilot", icon: Sparkles },
  { href: "/prd", label: "PRDs", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/roadmap", label: "Roadmap", icon: Map, comingSoon: true },
  { href: "/feedback", label: "Feedback", icon: MessageSquare, comingSoon: true },
  { href: "/team", label: "Team", icon: Users, comingSoon: true },
  { href: "/settings", label: "Settings", icon: Settings, comingSoon: true },
];

export function AppSidebar({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "border-border bg-background/80 flex h-full flex-col border-r backdrop-blur-xl",
        collapsed ? "w-16" : "w-[var(--sidebar-width)]"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
          <Sparkles className="size-4" />
        </div>
        {!collapsed && (
          <span className="font-semibold tracking-tight">ProdPilot AI</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          if (item.comingSoon) {
            return (
              <div
                key={item.href}
                className={cn(
                  "text-muted-foreground flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm opacity-50",
                  collapsed && "justify-center px-2"
                )}
                title="Coming soon"
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <Badge variant="outline" className="text-[10px]">
                      Soon
                    </Badge>
                  </>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
