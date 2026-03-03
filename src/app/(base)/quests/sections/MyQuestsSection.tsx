"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getHumanDate, getResourcesUrl } from "@/utils";
import type { Quest } from "@/module/content/utils/lib/quests";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { QuestCard } from "@/components/shared/pages/quests/card";
import { DEFAULT_COLOR_CODE_NAME_LIST, PageType } from "@/types";

export function MyQuestsSection({ data }: { data: Quest[] }) {
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
      {list.map((quest) => {
        const registrationClosed = isRegistrationClosed(
          quest.registration_deadline
        );
        const submissionClosed = isSubmissionClosed(
          quest.submission_deadline,
          quest.quest_end
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
              `Fin des inscriptions : ${getHumanDate(
                quest.registration_deadline,
                true
              )}`,
              `Date limite de soumission : ${getHumanDate(
                quest.submission_deadline,
                true
              )}`,
              `Annonce des resultats : ${getHumanDate(quest.quest_end, true)}`,
            ]}
            action={{
              label: submissionClosed ? "Voir les resultats" : "Participer",
              href: getResourcesUrl(PageType.QUESTS, quest.slug),
            }}
          />
        );
      })}
    </LoadMoreSection>
  );
}
