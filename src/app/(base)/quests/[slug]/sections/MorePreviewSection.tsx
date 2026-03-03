"use client";
import React from "react";
import { QuestCard } from "@/components/shared/pages/quests/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { Quest } from "@/module/content/types";
import { useTranslations } from "use-intl";
import { getHumanDate, getResourcesUrl } from "@/utils";
import { DEFAULT_COLOR_CODE_NAME_LIST, PageType } from "@/types";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib";

export function MorePreviewSection({ data }: { data: Quest[] }) {
  const t = useTranslations();

  return (
    <CardPreviewSection
      title={t("quests.inner-page.more-preview-section.title")}
    >
      {data.map((quest, index) => {
        const registrationClosed = isRegistrationClosed(
          quest.registration_deadline,
        );
        const submissionClosed = isSubmissionClosed(
          quest.submission_deadline,
          quest.quest_end,
        );

        return (
          <QuestCard
            key={quest.slug}
            title={quest.title}
            slug={quest.slug}
            cover={quest.cover}
            tags={[
              {
                name: `Inscriptions ${
                  registrationClosed ? "cloturees" : "ouvertes"
                }`,
                meta: {
                  color: registrationClosed
                    ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                    : DEFAULT_COLOR_CODE_NAME_LIST.PURPLE,
                },
              },
              {
                name: `Soumissions ${
                  submissionClosed ? "cloturees" : "ouvertes"
                }`,
                meta: {
                  color: submissionClosed
                    ? DEFAULT_COLOR_CODE_NAME_LIST.ORANGE
                    : DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
                },
              },
            ]}
            description={quest.excerpt}
            features={[
              `📅 Fin des inscriptions : ${getHumanDate(
                quest.registration_deadline,
                true,
              )}`,
              `📤 Date limite de soumission : ${getHumanDate(
                quest.submission_deadline,
                true,
              )}`,
              `🏆 Annonce des resultats : ${getHumanDate(quest.quest_end, true)}`,
            ]}
            action={{
              label: submissionClosed ? "Voir les resultats" : "Participer",
              href: getResourcesUrl(PageType.QUESTS, quest.slug),
            }}
          />
        );
      })}
    </CardPreviewSection>
  );
}
