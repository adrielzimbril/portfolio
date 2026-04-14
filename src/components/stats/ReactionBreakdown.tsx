"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { ReactionType } from "@/lib/stats/types";

interface ReactionBreakdownProps {
  reactions: Record<ReactionType, number>;
  className?: string;
}

export function ReactionBreakdown({
  reactions,
  className,
}: ReactionBreakdownProps) {
  const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <h3 className="mb-2 font-medium text-foreground">Reactions</h3>
        <p className="mb-4 text-3xl font-bold tabular-nums tracking-tight text-foreground">
          {total.toLocaleString()}
          <span className="ml-2 text-sm font-normal text-muted-foreground">total</span>
        </p>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {Object.entries(reactions).map(([type, count]) => (
            <div
              key={type}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-b-base p-3"
            >
              <span className="text-lg font-semibold tabular-nums text-foreground">
                {count.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
