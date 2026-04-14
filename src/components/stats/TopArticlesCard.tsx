"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";
import type { ArticleMetric } from "@/lib/stats/types";

interface TopArticlesCardProps {
  title: string;
  articles: ArticleMetric[];
  metricLabel: string;
  className?: string;
}

export function TopArticlesCard({
  title,
  articles,
  metricLabel,
  className,
}: TopArticlesCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <h3 className="mb-4 font-medium text-foreground">{title}</h3>

        {articles.length > 0 ? (
          <ul className="flex flex-1 flex-col gap-3">
            {articles.map((article, index) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-b-base text-xs font-medium text-foreground">
                      {index + 1}
                    </span>
                    <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {article.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                    {article.count.toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No data available yet</p>
        )}
      </CardContent>
    </Card>
  );
}
