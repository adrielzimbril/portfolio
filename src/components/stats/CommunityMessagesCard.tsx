"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";

interface CommunityMessagesCardProps {
  count: number;
  className?: string;
}

export function CommunityMessagesCard({
  count,
  className,
}: CommunityMessagesCardProps) {
  return (
    <Link href="/community-wall" className="block h-full">
      <Card className={cn("w-full min-h-[340px]", className)}>
        <CardContent className="p-6">
          <div className="relative z-20 mt-auto">
            <h3 className="mb-1 font-medium text-foreground">
              Community Messages
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
                {count.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">messages</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
