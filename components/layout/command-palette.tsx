"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Plus,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const run = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => run("/dashboard")}>
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => run("/copilot")}>
            <Sparkles className="mr-2 size-4" />
            AI Copilot
          </CommandItem>
          <CommandItem onSelect={() => run("/prd")}>
            <FileText className="mr-2 size-4" />
            PRDs
          </CommandItem>
          <CommandItem onSelect={() => run("/analytics")}>
            <BarChart3 className="mr-2 size-4" />
            Analytics
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => run("/prd")}>
            <Plus className="mr-2 size-4" />
            New PRD
          </CommandItem>
          <CommandItem onSelect={() => run("/copilot")}>
            <Sparkles className="mr-2 size-4" />
            Open Copilot
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
