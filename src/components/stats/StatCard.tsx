"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="flex flex-col items-start justify-center p-6">
        {icon && (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-foreground">
            {icon}
          </div>
        )}
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {suffix && (
            <span className="text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
