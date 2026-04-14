"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

interface SiteViewsCardProps {
  value: number;
  className?: string;
}

export function SiteViewsCard({ value, className }: SiteViewsCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-medium text-foreground">Total Site Views</h3>
        </div>

        <p className="mt-auto text-3xl font-semibold tracking-tight text-foreground">
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
