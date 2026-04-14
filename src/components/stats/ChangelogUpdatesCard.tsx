"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";

interface ChangelogUpdatesCardProps {
  count: number;
  className?: string;
}

export function ChangelogUpdatesCard({
  count,
  className,
}: ChangelogUpdatesCardProps) {
  return (
    <Link href="/changelog" className="block h-full">
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="relative z-20 mt-auto">
            <h3 className="mb-1 font-medium text-foreground">
              Changelog
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {count}
              </span>
              <span className="text-sm text-muted-foreground">updates</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
