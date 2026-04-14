"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";

interface MostViewedArticleCardProps {
  title: string;
  slug: string;
  imageName: string;
  viewCount: number;
  className?: string;
}

export function MostViewedArticleCard({
  title,
  slug,
  imageName,
  viewCount,
  className,
}: MostViewedArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <Card className={cn("w-full min-h-[420px]", className)}>
        <CardContent className="p-6">
          <h3 className="mb-1 font-medium text-foreground">
            Most Viewed Article
          </h3>
          <h4 className="mb-3 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {title}
          </h4>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
              {viewCount.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">views</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
