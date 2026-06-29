"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnomalyCardProps {
  title: string;
  description: string;
  metric: string;
  change: number;
  type: "risk" | "opportunity";
}

export function AnomalyCard({ title, description, metric, change, type }: AnomalyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={cn(
          "border-l-4",
          type === "risk" ? "border-l-red-500" : "border-l-emerald-500"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {type === "risk" ? (
              <AlertTriangle className="size-4 text-red-400" />
            ) : (
              <TrendingUp className="size-4 text-emerald-400" />
            )}
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Badge variant="outline" className="ml-auto text-[10px]">
              {metric}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{description}</p>
          <p
            className={cn(
              "mt-2 text-sm font-semibold",
              type === "risk" ? "text-red-400" : "text-emerald-400"
            )}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
