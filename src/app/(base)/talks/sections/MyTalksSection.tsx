"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getExternalUrl, getHumanDate } from "@/utils";
import type { Talk } from "@/module/content/utils/lib/talks";
import { TalksCard } from "@/components/shared/pages/talks/card";
import { useState } from "react";
import { useLocale } from "use-intl";

function getTalkModeLabel(
  rawMode: string | undefined,
  locale: string,
): string | null {
  if (!rawMode) return null;

  const normalized = rawMode
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const isOnline = [
    "online",
    "remote",
    "virtual",
    "webinar",
    "webinaire",
    "en ligne",
  ].some((value) => normalized.includes(value));
  const isOnsite = [
    "onsite",
    "on-site",
    "in person",
    "in-person",
    "presentiel",
    "sur place",
  ].some((value) => normalized.includes(value));

  if (!isOnline && !isOnsite) return null;

  if (locale.startsWith("fr")) return isOnline ? "En ligne" : "Présentiel";
  if (locale.startsWith("zh")) return isOnline ? "线上" : "线下";
  return isOnline ? "Online" : "In person";
}

export function MyTalksSection({ data }: { data: Talk[] }) {
  const [currentTime] = useState(() => Date.now());
  const locale = useLocale();

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
        const talkWithMode = talk as Talk & {
          attendance_mode?: string;
          mode?: string;
        };
        const modeLabel = getTalkModeLabel(
          talkWithMode.attendance_mode ?? talkWithMode.mode,
          locale,
        );
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
