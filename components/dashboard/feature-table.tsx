"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featurePrioritization } from "@/lib/mock/seed";
import { formatNumber } from "@/lib/utils";

export function FeatureTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Feature Prioritization (RICE)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-white/10 text-left">
                <th className="pb-3 font-medium">Feature</th>
                <th className="pb-3 font-medium">Reach</th>
                <th className="pb-3 font-medium">Impact</th>
                <th className="pb-3 font-medium">Confidence</th>
                <th className="pb-3 font-medium">Effort</th>
                <th className="pb-3 font-medium">RICE</th>
              </tr>
            </thead>
            <tbody>
              {featurePrioritization.map((row, i) => (
                <tr key={row.feature} className="border-b border-white/5">
                  <td className="py-3 font-medium">
                    <span className="text-muted-foreground mr-2">#{i + 1}</span>
                    {row.feature}
                  </td>
                  <td className="py-3">{formatNumber(row.reach)}</td>
                  <td className="py-3">{row.impact}</td>
                  <td className="py-3">{row.confidence}</td>
                  <td className="py-3">{row.effort}</td>
                  <td className="py-3 font-semibold text-violet-400">
                    {formatNumber(row.rice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
