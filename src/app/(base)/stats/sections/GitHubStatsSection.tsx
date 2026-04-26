import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { GitHubStatsCard } from "@/components/shared/pages/stats/GitHubStatsCard";
import { ContributionGraphCard } from "@/components/shared/pages/stats/ContributionGraphCard";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubStatsSectionProps {
  stars: number;
  forks: number;
  commits: number;
  contributions: number[];
}

export async function GitHubStatsSection({
  stars,
  forks,
  commits,
  contributions,
}: GitHubStatsSectionProps) {
  const t = await getTranslations();

  return (
    <Skeleton name="stats-github" loading={false}>
      <SectionLayout
        badge={t("stats.sections.github.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-fit">
          <GitHubStatsCard
            type="stars"
            label={t("stats.cards.github.stars")}
            value={stars}
          />
          <GitHubStatsCard
            type="forks"
            label={t("stats.cards.github.forks")}
            value={forks}
          />
          <GitHubStatsCard
            type="commits"
            label={t("stats.cards.github.commits")}
            value={commits}
          />
        </div>
        <ContributionGraphCard contributions={contributions} />
      </SectionLayout>
    </Skeleton>
  );
}
