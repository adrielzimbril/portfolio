"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

interface GitHubStatsCardProps {
  type: "stars" | "forks" | "commits";
  label: string;
  value: number;
  className?: string;
}

export function GitHubStatsCard({
  type,
  label,
  value,
  className,
}: GitHubStatsCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <h3 className="mb-1 text-sm font-medium text-foreground">{label}</h3>
        <p className="mt-auto text-2xl font-semibold tracking-tight text-foreground">
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
