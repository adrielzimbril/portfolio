"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getExternalUrl, getHumanDate } from "@/utils";
import type { Talk } from "@/module/content/utils/lib/talks";
import { TalksCard } from "@/components/shared/pages/talks/card";
import { useState } from "react";

export function MyTalksSection({ data }: { data: Talk[] }) {
  const [currentTime] = useState(() => Date.now());
  const [today] = useState(() => new Date());

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
        const eventDate = new Date(talk.event_date);
        const eventTime = eventDate.getTime();
        const isPastEvent =
          Number.isFinite(eventTime) && currentTime >= eventTime;
        const isToday =
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getDate() === today.getDate();
        const canShowParticipants = isPastEvent || isToday;
        const replayUrl = getExternalUrl(talk.replay_url);
        const eventUrl = getExternalUrl(talk.event_url);
        const participantsTag =
          canShowParticipants && typeof talk.participants === "number"
            ? [{ name: `${talk.participants} participants` }]
            : [];

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
            excerpt={talk.excerpt || ""}
            date={getHumanDate(talk.event_date, true)}
            tags={[{ name: talk.role }, ...participantsTag]}
            action={action}
          />
        );
      })}
    </LoadMoreSection>
  );
}
