"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { CategoryCount } from "@/lib/stats/types";

interface CategoryBarChartProps {
  categories: CategoryCount[];
  className?: string;
}

const BAR_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-muted",
  "bg-destructive",
  "bg-blue-500",
];

export function CategoryBarChart({
  categories,
  className,
}: CategoryBarChartProps) {
  const maxCount = Math.max(...categories.map((c) => c.count), 1);
  const displayCategories = categories.slice(0, 6);

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <h3 className="mb-2 font-medium text-foreground">Categories</h3>
        <p className="mb-4 text-sm text-muted-foreground">Articles by topic</p>

        <div className="flex flex-1 flex-col gap-3">
          {displayCategories.map((category, index) => {
            const percentage = (category.count / maxCount) * 100;
            const color = BAR_COLORS[index % BAR_COLORS.length];

            return (
              <div key={category.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {category.name}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {category.count}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    style={{ width: `${percentage}%` }}
                    className={cn("h-full rounded-full", color)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {categories.length > 6 && (
          <p className="mt-4 text-xs text-muted-foreground opacity-60">
            +{categories.length - 6} more categories
          </p>
        )}
      </CardContent>
    </Card>
  );
}
