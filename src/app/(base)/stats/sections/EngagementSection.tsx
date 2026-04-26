import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ThoughtsTopList } from "@/components/shared/pages/stats/ThoughtsTopList";
import { ReactionsSection } from "@/components/shared/pages/stats/ReactionsSection";
import { ThoughtMostViewedCard } from "@/components/shared/pages/stats/ThoughtMostViewedCard";
import { ThoughtsCategoriesCard } from "@/components/shared/pages/stats/ThoughtsCategoriesCard";
import { ChangelogUpdatesCard } from "@/components/shared/pages/stats/ChangelogUpdatesCard";
import { TrendUp, HeartOne } from "@aurthle/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { TopThoughtsListType } from "@/types/enum";
import type { Changelog } from "@/integrations/content/types/types";

interface EngagementSectionProps {
  topViewedThoughts: Array<{ title: string; slug: string; coverImage?: string; count: number }>;
  topReactedThoughts: Array<{ title: string; slug: string; count: number }>;
  reactions: Record<string, number>;
  categories: Array<{ name: string; count: number }>;
  changelog: Changelog[];
}

export async function EngagementSection({
  topViewedThoughts,
  topReactedThoughts,
  reactions,
  categories,
  changelog,
}: EngagementSectionProps) {
  const t = await getTranslations();

  return (
    <Skeleton name="stats-engagement" loading={false}>
      <SectionLayout
        badge={t("stats.sections.engagement.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="w-full lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ThoughtsTopList
            title={t("stats.cards.topViewed.title")}
            description={t("stats.cards.topViewed.description")}
            type={TopThoughtsListType.REACTED}
            thoughts={topViewedThoughts}
            icon={
              <TrendUp
                size={32}
                variant="bulk"
              />
            }
            decoration="📈"
          />
          <ThoughtsTopList
            title={t("stats.cards.topReacted.title")}
            description={t("stats.cards.topReacted.description")}
            type={TopThoughtsListType.REACTED}
            thoughts={topReactedThoughts}
            icon={
              <HeartOne
                size={32}
                variant="bulk"
              />
            }
            decoration="❤️"
          />
        </div>
        <div className="w-full">
          <ReactionsSection reactions={reactions} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 col-span-2">
          {topViewedThoughts.length > 0 &&
            topViewedThoughts[0] && (
              <ThoughtMostViewedCard
                title={topViewedThoughts[0].title}
                slug={topViewedThoughts[0].slug}
                coverImage={topViewedThoughts[0].coverImage}
                views={topViewedThoughts[0].count}
              />
            )}
          <div className="grid grid-cols-1 md:grid-cols-4 h-full w-full lg:flex lg:flex-col gap-2 lg:col-span-4">
            <ThoughtsCategoriesCard
              data={categories}
              title={t("stats.cards.categories.title")}
              description={t("stats.cards.categories.description")}
              decorationEmoji="📊"
            />
            <ChangelogUpdatesCard
              count={changelog.length}
              changelog={changelog}
            />
          </div>
        </div>
      </SectionLayout>
    </Skeleton>
  );
}
