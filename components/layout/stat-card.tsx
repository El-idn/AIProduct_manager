import { cn, formatNumber, formatPercent } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
  suffix?: string;
}

export function StatCard({ label, value, change, trend, suffix }: StatCardProps) {
  const isPositive = trend === "up";
  const changeIsGood =
    (label === "Churn" && change < 0) ||
    (label !== "Churn" && isPositive) ||
    (label === "Retention" && !isPositive);

  return (
    <Card className="py-4">
      <CardHeader className="px-4 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="text-2xl font-bold">
          {suffix ? `${value}${suffix}` : formatNumber(value)}
        </div>
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            changeIsGood ? "text-emerald-400" : "text-red-400"
          )}
        >
          {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {formatPercent(change)} vs last month
        </div>
      </CardContent>
    </Card>
  );
}
