"use client";

import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/layout/stat-card";
import { KpiChart } from "@/components/charts/kpi-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { FeatureTable } from "@/components/dashboard/feature-table";
import { AiRecommendationCard } from "@/components/dashboard/ai-recommendation-card";
import { RecentPrdsList } from "@/components/dashboard/recent-prds-list";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import {
  aiRecommendations,
  kpiMetrics,
  sprintVelocity,
} from "@/lib/mock/seed";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Your product command center — KPIs, AI insights, and recent work."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <KpiChart data={sprintVelocity} title="Sprint Velocity" dataKey="points" xKey="sprint" />
        <SentimentChart />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeatureTable />
        </div>
        <div className="space-y-4">
          {aiRecommendations.map((rec) => (
            <AiRecommendationCard key={rec.title} {...rec} />
          ))}
        </div>
      </div>

      <RecentPrdsList />
    </div>
  );
}
