"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/use-app-store";
import { EmptyState } from "@/components/layout/empty-state";

export function RecentPrdsList() {
  const prds = useAppStore((s) => s.prds);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent PRDs</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/prd">New PRD</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {prds.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No PRDs yet"
            description="Generate your first PRD with AI to see it here."
            actionLabel="Create PRD"
            onAction={() => (window.location.href = "/prd")}
          />
        ) : (
          <div className="space-y-2">
            {prds.slice(0, 5).map((prd) => (
              <Link
                key={prd.id}
                href={`/prd/${prd.id}`}
                className="hover:bg-accent/50 flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 transition-colors"
              >
                <div>
                  <p className="font-medium">{prd.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(prd.updatedAt).toLocaleDateString()} · {prd.priority}
                  </p>
                </div>
                <FileText className="text-muted-foreground size-4" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
