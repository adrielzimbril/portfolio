import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getBuildTimeStats } from "@/lib/stats/build-time-stats";
import { getServerStats } from "@/lib/stats/server-stats";
import { getGitHubStats } from "@/lib/stats/github-stats";
import { getLighthouseStats } from "@/lib/stats/lighthouse-stats";
import { getAllChangelog } from "@/integrations/content/lib/changelog";
import { HeaderSection } from "@/app/(base)/stats/sections/HeaderSection";
import { GeneralStatsSection } from "@/app/(base)/stats/sections/GeneralStatsSection";
import { EngagementSection } from "@/app/(base)/stats/sections/EngagementSection";
import { BlogStatsSection } from "@/app/(base)/stats/sections/BlogStatsSection";
import { GitHubStatsSection } from "@/app/(base)/stats/sections/GitHubStatsSection";
import { PerformanceSection } from "@/app/(base)/stats/sections/PerformanceSection";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("stats.title"),
    description: t("stats.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("stats.title"),
      description: t("stats.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("stats.title"),
      description: t("stats.description"),
    },
  };
}

export default async function StatsPage() {
  const locale = await getLocale();

  // Fetch data from different sources
  const [buildTimeStats, serverStats, githubStats, lighthouseStats, changelog] =
    await Promise.all([
      getBuildTimeStats(),
      getServerStats(locale),
      getGitHubStats(),
      getLighthouseStats(),
      getAllChangelog(),
    ]);

  return (
    <>
      <Skeleton name="stats-hero" loading={false}>
        <HeaderSection />
      </Skeleton>
      <Skeleton name="stats-general" loading={false}>
        <GeneralStatsSection
          totalViews={serverStats.totalViews}
          totalWords={buildTimeStats.totalWords}
        />
      </Skeleton>
      <Skeleton name="stats-engagement" loading={false}>
        <EngagementSection
          topViewedThoughts={serverStats.topViewedThoughts}
          topReactedThoughts={serverStats.topReactedThoughts}
          reactions={serverStats.reactions}
          categories={buildTimeStats.categories.map((cat) => ({
            name: cat.name,
            count: cat.count,
          }))}
          changelog={changelog}
        />
      </Skeleton>
      <Skeleton name="stats-blog" loading={false}>
        <BlogStatsSection
          totalPosts={buildTimeStats.totalPosts}
          totalWords={buildTimeStats.totalWords}
          communityMessages={serverStats.communityMessages}
          totalReadingTime={buildTimeStats.totalReadingTime}
        />
      </Skeleton>
      <Skeleton name="stats-github" loading={false}>
        <GitHubStatsSection
          stars={githubStats.stars}
          forks={githubStats.forks}
          commits={githubStats.commits}
          contributions={githubStats.contributions}
          variant="default"
        />
      </Skeleton>
      <Skeleton name="stats-performance" loading={false}>
        <PerformanceSection
          mobileScores={lighthouseStats.mobile}
          desktopScores={lighthouseStats.desktop}
        />
      </Skeleton>
    </>
  );
}
