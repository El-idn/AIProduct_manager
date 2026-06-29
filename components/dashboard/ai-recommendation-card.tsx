import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface AiRecommendationCardProps {
  title: string;
  description: string;
  priority: string;
}

export function AiRecommendationCard({
  title,
  description,
  priority,
}: AiRecommendationCardProps) {
  return (
    <Card className="py-4">
      <CardHeader className="px-4 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-violet-400" />
          <CardTitle className="text-sm font-medium">AI Recommendation</CardTitle>
          <Badge variant={priority === "high" ? "default" : "secondary"} className="ml-auto text-[10px]">
            {priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <h4 className="font-medium">{title}</h4>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
