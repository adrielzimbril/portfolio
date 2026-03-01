"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getHumanDate } from "@/utils";
import type { Talk } from "@/module/content/utils/lib/talks";

export function TalksListSection({ data }: { data: Talk[] }) {
  const { data: list, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: data,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {list.map((item) => (
        <Card
          key={item.slug}
          className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
        >
          <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border p-4 bg-b-white-invert-fr">
                <p className="text-sm font-medium text-b-base-accent">
                  {item.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{getHumanDate(item.event_date)}</Badge>
                <Badge variant="secondary">{item.role}</Badge>
              </div>
              <p className="text-xl font-medium text-b-white-invert-sec line-clamp-3">
                {item.excerpt}
              </p>
              <Link href={`/talks#${item.slug}`} likeButton whileTap size="xs">
                Voir la masterclass
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </LoadMoreSection>
  );
}
