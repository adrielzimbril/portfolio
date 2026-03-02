"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
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
      {list.map((quest) => (
        <QuestCard
          key={quest.slug}
          title={quest.title}
          slug={quest.slug}
          cover={quest.cover}
          //type={quest.type}
          //tags={quest.tags}
          tags={[
            {
              name: `📝 ${
                isRegistrationClosed(quest)
                  ? "Inscriptions cloturées"
                  : "Inscriptions ouvertes"
              }`,
              meta: {
                color: isRegistrationClosed(quest)
                  ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                  : DEFAULT_COLOR_CODE_NAME_LIST.PURPLE,
              },
            },
            {
              name: `📨 ${
                isSubmissionClosed(quest)
                  ? "Soumissions cloturées"
                  : "Soumissions ouvertes"
              }`,
              meta: {
                color: isSubmissionClosed(quest)
                  ? DEFAULT_COLOR_CODE_NAME_LIST.ORANGE
                  : DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
              },
            },
          ]}
          description={quest.excerpt}
          features={[
            `📅 Fin des inscriptions : ${getHumanDate(quest.registration_deadline, true)}`,
            `📤 Date limite de soumission : ${getHumanDate(quest.submission_deadline, true)}`,
            `🏆 Annonce des résultats : ${getHumanDate(quest.quest_end, true)}`,
          ]}
          //avatars={quest.studentsProfileImage}
          //userCount={quest.studentsNumber}
          action={{
            label: isSubmissionClosed(quest)
              ? "Voir les résultats"
              : "Participer",
            href: getResourcesUrl(PageType.QUESTS, quest.slug),
          }}
        />
      ))}
    </LoadMoreSection>
  );
}
