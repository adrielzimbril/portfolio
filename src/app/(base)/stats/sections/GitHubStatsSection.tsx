import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { GitHubStatsCard } from "@/components/shared/pages/stats/GitHubStatsCard";
import { ContributionGraphCard } from "@/components/shared/pages/stats/ContributionGraphCard";
import { ContributionData } from "@/lib/stats/types";

interface GitHubStatsSectionProps {
  stars: number;
  forks: number;
  commits: number;
  contributions: ContributionData;
  variant: "default" | "compact";
}

export async function GitHubStatsSection({
  stars,
  forks,
  commits,
  contributions,
  variant,
}: GitHubStatsSectionProps) {
  const t = await getTranslations();

  return (
    <SectionLayout
      badge={t("stats.sections.github.badge")}
      isFlex
      className="pb-0!"
    >
      {variant === "default" ? (
        <>
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
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 w-full">
            <ContributionGraphCard contributions={contributions} />
            <div className="grid grid-cols-1 md:grid-cols-3 md:h-full w-full lg:flex flex-col gap-2 lg:col-span-2">
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
          </div>
        </>
      )}
    </SectionLayout>
  );
}
