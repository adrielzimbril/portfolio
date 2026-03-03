"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { TalksCard } from "@/components/shared/pages/talks/card";
import { useLoadMore } from "@/hooks/useLoadMore";
import type { Talk } from "@/module/content/utils/lib/talks";
import { getExternalUrl, getHumanDate } from "@/utils";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { AttendanceType } from "@/types";

export function MyTalksSection({ data }: { data: Talk[] }) {
  const [currentTime] = useState(() => Date.now());
  const t = useTranslations();

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
        const replayUrl = getExternalUrl(talk.replay_url);
        const eventUrl = getExternalUrl(talk.event_url);

        const action = isPastEvent
          ? replayUrl
            ? { label: "Voir replay", href: replayUrl }
            : null
          : {
              label: "Participer",
              href: eventUrl || `/talks#${talk.slug}`,
            };

        const mode = talk.attendance_mode;
        const modeLabel =
          mode === AttendanceType.ONLINE
            ? t("talks.badges.online")
            : t("talks.badges.inPerson");

        const tags = [talk.role, modeLabel]
          .filter(Boolean)
          .map((name) => ({ name: name as string }));

        return (
          <TalksCard
            key={talk.slug}
            title={talk.title}
            cover={talk.cover}
            excerpt={talk.excerpt || ""}
            date={getHumanDate(talk.event_date, true)}
            tags={tags}
            participantsCount={talk.participants || 0}
            action={action}
          />
        );
      })}
    </LoadMoreSection>
  );
}
