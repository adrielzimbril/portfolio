import { getLocale, getTranslations } from "next-intl/server";
import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { TalksCard } from "@/components/shared/pages/talks/card";
import { AttendanceType } from "@/types";
import { getAllTalks } from "@/integrations/content/lib";
import type { Talk } from "@/integrations/content/lib/talks";
import { getExternalUrl, getHumanDate } from "@/utils";

const config = {
  limit: 2,
};

export async function TalksSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const currentTime = Date.now();
  const talks = await getAllTalks({ limit: config.limit, locale });

  return (
    <SectionLayout
      title={t("common.page-sections.talks.title")}
      description={t("common.page-sections.talks.description")}
      link={routes.talks.link}
      badge={t("common.page-sections.talks.badge")}
    >
      {talks.map((talk, index) => {
        const eventDate = new Date(talk.event_date);
        const eventTime = eventDate.getTime();
        const isPastEvent =
          Number.isFinite(eventTime) && currentTime >= eventTime;
        const replayUrl = getExternalUrl(talk.replay_url);
        const eventUrl = getExternalUrl(talk.event_url);

        const action = isPastEvent
          ? replayUrl
            ? { label: t("talks.card.actions.viewReplay"), href: replayUrl }
            : null
          : {
              label: t("talks.card.actions.participate"),
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
            key={index}
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
    </SectionLayout>
  );
}
