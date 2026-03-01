"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getHumanDate } from "@/utils";
import type { Talk } from "@/module/content/utils/lib/talks";
import { TalksCard } from "@/components/shared/pages/talks/card";

export function MyTalksSection({ data }: { data: Talk[] }) {
  const {
    data: list,
    loadMore,
    loading,
    hasMore,
    loadedItems,
    totalItems,
  } = useLoadMore({
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
      {list.map((talk) => (
        <TalksCard
          key={talk.slug}
          title={talk.title}
          cover={talk.cover}
          slug={talk.slug}
          excerpt={talk.excerpt || ""}
          primaryTag={getHumanDate(talk.event_date)}
          tags={[{ name: talk.role }]}
        />
      ))}
    </LoadMoreSection>
  );
}
