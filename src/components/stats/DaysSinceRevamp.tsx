"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

interface DaysSinceRevampProps {
  revampDate: Date;
  className?: string;
}

export function DaysSinceRevamp({
  revampDate,
  className,
}: DaysSinceRevampProps) {
  const now = new Date();
  const diffTime = now.getTime() - revampDate.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <h3 className="mb-2 font-medium text-foreground">Site Age</h3>
        <p className="text-sm text-muted-foreground">Since last revamp</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight text-foreground">
              {days}
            </span>
            <span className="text-lg text-muted-foreground">days</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Launched{" "}
            {revampDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
