"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getHumanDate } from "@/utils";
import type { Quest } from "@/module/content/utils/lib/quests";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { QuestCard } from "@/components/shared/pages/quests/card";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";

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
        <>
          <Card
            key={quest.slug}
            className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
          >
            <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="h4">{quest.title}</h3>
                <p className="text-xl font-medium text-b-white-invert-sec line-clamp-3">
                  {quest.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>
                    Inscription: {getHumanDate(quest.registration_deadline)}
                  </Badge>
                  <Badge variant="secondary">
                    Soumission: {getHumanDate(quest.submission_deadline)}
                  </Badge>
                  <Badge variant="secondary">
                    Résultats: {getHumanDate(quest.quest_end)}
                  </Badge>
                  <Badge
                    variant={
                      isRegistrationClosed(quest) ? "secondary" : "default"
                    }
                  >
                    {isRegistrationClosed(quest)
                      ? "Inscriptions fermees"
                      : "Inscriptions ouvertes"}
                  </Badge>
                  <Badge
                    variant={
                      isSubmissionClosed(quest) ? "secondary" : "default"
                    }
                  >
                    {isSubmissionClosed(quest)
                      ? "Soumissions fermees"
                      : "Soumissions ouvertes"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/quests/${quest.slug}`}
                    likeButton
                    whileTap
                    size="xs"
                  >
                    Voir le quest
                  </Link>
                  {!isRegistrationClosed(quest) && (
                    <Link
                      href={`/quests/${quest.slug}/register`}
                      likeButton
                      whileTap
                      size="xs"
                      variant="secondary"
                    >
                      S'inscrire
                    </Link>
                  )}
                  {!isSubmissionClosed(quest) && (
                    <Link
                      href={`/quests/${quest.slug}/travail/submit`}
                      likeButton
                      whileTap
                      size="xs"
                      variant="secondary"
                    >
                      Soumettre son travail
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
          />
        </>
      ))}
    </LoadMoreSection>
  );
}
