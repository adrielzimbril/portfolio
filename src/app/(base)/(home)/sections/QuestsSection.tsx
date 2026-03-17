import { getLocale, getTranslations } from "next-intl/server";
import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { QuestCard } from "@/components/shared/pages/quests/card";
import { DEFAULT_COLOR_CODE_NAME_LIST, PageType } from "@/types";
import { getAllQuests } from "@/module/content/utils/lib";
import type { Quest } from "@/module/content/utils/lib/quests";
import { getResourcesUrl } from "@/utils/base-url";
import { getHumanDate } from "@/utils/format-date";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";

const config = {
  limit: 2,
};

export async function QuestsSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const quests = await getAllQuests({ limit: config.limit, locale });

  return (
    <SectionLayout
      title={t("common.page-sections.quests.title")}
      description={t("common.page-sections.quests.description")}
      link={routes.quests.link}
      badge={t("common.page-sections.quests.badge")}
    >
      {quests.map((quest, index) => {
        const registrationClosed = isRegistrationClosed(
          quest.registration_deadline,
        );
        const submissionClosed = isSubmissionClosed(
          quest.submission_deadline,
          quest.quest_end,
        );

        return (
          <QuestCard
            key={index}
            title={quest.title}
            slug={quest.slug}
            cover={quest.cover}
            tags={[
              {
                name: t(
                  registrationClosed
                    ? "quests.cards.tags.registration.closed"
                    : "quests.cards.tags.registration.open",
                ),
                meta: {
                  color: registrationClosed
                    ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                    : DEFAULT_COLOR_CODE_NAME_LIST.PURPLE,
                },
              },
              {
                name: t(
                  submissionClosed
                    ? "quests.cards.tags.submission.closed"
                    : "quests.cards.tags.submission.open",
                ),
                meta: {
                  color: submissionClosed
                    ? DEFAULT_COLOR_CODE_NAME_LIST.ORANGE
                    : DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
                },
              },
            ]}
            description={quest.excerpt}
            features={[
              t("quests.cards.features.registrationEnd", {
                date: getHumanDate(quest.registration_deadline, true),
              }),
              t("quests.cards.features.submissionDeadline", {
                date: getHumanDate(quest.submission_deadline, true),
              }),
              t("quests.cards.features.resultsAnnouncement", {
                date: getHumanDate(quest.quest_end, true),
              }),
            ]}
            action={{
              label: t(
                submissionClosed
                  ? "quests.cards.actions.viewResults"
                  : "quests.cards.actions.participate",
              ),
              href: getResourcesUrl(PageType.QUESTS, quest.slug),
            }}
          />
        );
      })}
    </SectionLayout>
  );
}
