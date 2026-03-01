"use client";

import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getHumanDate } from "@/utils";
import type { Challenge } from "@/module/content/utils/lib/challenges";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/challenges";

export function ChallengesListSection({ data }: { data: Challenge[] }) {
  const { data: list, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
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
      {list.map((challenge) => (
        <Card
          key={challenge.slug}
          className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
        >
          <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="h4">{challenge.title}</h3>
              <p className="text-xl font-medium text-b-white-invert-sec line-clamp-3">
                {challenge.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Inscription: {getHumanDate(challenge.registration_deadline)}</Badge>
                <Badge variant="secondary">
                  Soumission: {getHumanDate(challenge.submission_deadline)}
                </Badge>
                <Badge variant={isRegistrationClosed(challenge) ? "secondary" : "default"}>
                  {isRegistrationClosed(challenge) ? "Inscriptions fermees" : "Inscriptions ouvertes"}
                </Badge>
                <Badge variant={isSubmissionClosed(challenge) ? "secondary" : "default"}>
                  {isSubmissionClosed(challenge) ? "Soumissions fermees" : "Soumissions ouvertes"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/challenges/${challenge.slug}`} likeButton whileTap size="xs">
                  Voir le challenge
                </Link>
                <Link href={`/challenges/${challenge.slug}/register`} likeButton whileTap size="xs" variant="secondary">
                  S'inscrire
                </Link>
                <Link href={`/challenges/${challenge.slug}/travail/submit`} likeButton whileTap size="xs" variant="secondary">
                  Soumettre son travail
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </LoadMoreSection>
  );
}
