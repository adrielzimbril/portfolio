"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

interface CoffeeCupsCardProps {
  cups: number;
  className?: string;
}

export function CoffeeCupsCard({ cups, className }: CoffeeCupsCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-xl">
          ☕
        </div>

        <h3 className="mb-2 font-medium text-foreground">Coffee Consumed</h3>
        <p className="text-sm text-muted-foreground">Estimated fuel</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-foreground">
              ~{cups.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">cups</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            1 cup per 500 words
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
