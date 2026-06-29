"use client";

import { PageHeader } from "@/components/layout/page-header";
import { AnomalyCard } from "@/components/dashboard/anomaly-card";
import { KpiChart } from "@/components/charts/kpi-chart";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import {
  anomalyAlerts,
  churnData,
  conversionFunnel,
  engagementData,
  retentionCohorts,
  revenueData,
} from "@/lib/mock/seed";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const revenueChart = revenueData.map((d) => ({ month: d.month, mrr: d.mrr }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="KPI Analytics"
        description="Revenue, engagement, retention, and AI-detected anomalies."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {anomalyAlerts.map((alert) => (
          <AnomalyCard key={alert.id} {...alert} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <KpiChart data={revenueChart} title="Monthly Recurring Revenue" dataKey="mrr" xKey="month" />
        <BarChartCard
          title="Weekly Engagement"
          data={engagementData}
          dataKey="sessions"
          xKey="day"
          color="#22c55e"
        />
      </div>

      <LineChartCard
        title="Retention Cohorts"
        data={retentionCohorts}
        xKey="week"
        lines={[
          { dataKey: "d1", color: "#8b5cf6", name: "Day 1" },
          { dataKey: "d7", color: "#22c55e", name: "Day 7" },
          { dataKey: "d30", color: "#f59e0b", name: "Day 30" },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversionFunnel.map((stage, i) => {
                const max = conversionFunnel[0].value;
                const pct = (stage.value / max) * 100;
                return (
                  <div key={stage.stage}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{stage.stage}</span>
                      <span className="text-muted-foreground">
                        {formatNumber(stage.value)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-violet-500 transition-all"
                        style={{ width: `${pct}%`, opacity: 1 - i * 0.15 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <BarChartCard
          title="Churn Rate"
          data={churnData}
          dataKey="rate"
          xKey="month"
          color="#ef4444"
        />
      </div>
    </div>
  );
}
