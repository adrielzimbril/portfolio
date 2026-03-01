"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
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
      {list.map((talk) => {
        const eventTime = new Date(talk.event_date).getTime();
        const isPastEvent = Number.isFinite(eventTime) && Date.now() >= eventTime;
        const replayUrl = talk.replay_url?.trim();
        const eventUrl = talk.event_url?.trim();

        const action = isPastEvent
          ? replayUrl
            ? { label: "Voir replay", href: replayUrl }
            : null
          : {
              label: "Participer",
              href: eventUrl || `/talks#${talk.slug}`,
            };

        return (
          <TalksCard
            key={talk.slug}
            title={talk.title}
            cover={talk.cover}
            slug={talk.slug}
            excerpt={talk.excerpt || ""}
            primaryTag={getHumanDate(talk.event_date)}
            tags={[{ name: talk.role }]}
            action={action}
          />
        );
      })}
    </LoadMoreSection>
  );
}
