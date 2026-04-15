import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getAllPosts } from "@/integrations/content/lib";
import { getBuildTimeStats } from "@/lib/stats/build-time-stats";
import { getServerStats } from "@/lib/stats/server-stats";
import { getGitHubStats } from "@/lib/stats/github-stats";
import { getLighthouseStats } from "@/lib/stats/lighthouse-stats";
import { StatsPageHeader } from "@/components/stats/StatsPageHeader";
import { StatCard } from "@/components/stats/StatCard";
import { CategoryBarChart } from "@/components/stats/CategoryBarChart";
import { DaysSinceRevamp } from "@/components/stats/DaysSinceRevamp";
import { CoffeeCupsCard } from "@/components/stats/CoffeeCupsCard";
import { SiteViewsCard } from "@/components/stats/SiteViewsCard";
import { GitHubStatsCard } from "@/components/stats/GitHubStatsCard";
import { LighthouseScoreCard } from "@/components/stats/LighthouseScoreCard";
import { TopThoughtsCard } from "@/components/stats/TopThoughtsCard";
import { ReactionBreakdown } from "@/components/stats/ReactionBreakdown";
import { ContributionGraphCard } from "@/components/stats/ContributionGraphCard";
import { CommunityMessagesCard } from "@/components/stats/CommunityMessagesCard";
import { MostViewedThoughtCard } from "@/components/stats/MostViewedThoughtCard";
import { ChangelogUpdatesCard } from "@/components/stats/ChangelogUpdatesCard";
import { changelog } from "@/data/personal/changelog";

// Revamp date - TODO: Adapter à votre date de revamp
const REVAMP_DATE = new Date("2025-08-17");

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
  const t = await getTranslations();

  // Fetch data from different sources
  const [buildTimeStats, serverStats, githubStats, lighthouseStats] =
    await Promise.all([
      getBuildTimeStats(),
      getServerStats(),
      getGitHubStats(),
      getLighthouseStats(),
    ]);

  // Calculate additional data
  const coffeeCups = Math.floor(buildTimeStats.totalWords / 500);
  const daysSinceRevamp = Math.floor(
    (new Date().getTime() - REVAMP_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <>
      <PageHero
        title={t("stats.page.title")}
        description={t("stats.page.description")}
        imagePath={{ emoji: "📊" }}
        isMobileShowed
      />

      <StatsPageHeader />

      {/* Content Stats Section */}
      <SectionLayout
        title={t("stats.sections.blog.title")}
        description={t("stats.sections.blog.description")}
        badge={t("stats.sections.blog.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Thoughts"
            value={buildTimeStats.totalPosts}
            suffix="thoughts"
          />
          <CoffeeCupsCard cups={coffeeCups} />
          <StatCard
            label="Total Words"
            value={buildTimeStats.totalWords}
            suffix="words"
          />
          <StatCard
            label="Reading Time"
            value={buildTimeStats.totalReadingTime}
            suffix="min"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBarChart categories={buildTimeStats.categories} />
          <DaysSinceRevamp revampDate={REVAMP_DATE} />
        </div>
      </SectionLayout>

      {/* Engagement Section */}
      <SectionLayout
        title={t("stats.sections.engagement.title")}
        description={t("stats.sections.engagement.description")}
        badge={t("stats.sections.engagement.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SiteViewsCard value={serverStats.totalViews} />
          <ReactionBreakdown reactions={serverStats.reactions} />
          <CommunityMessagesCard count={serverStats.communityMessages} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopThoughtsCard
            title="Top Viewed Thoughts"
            thoughts={serverStats.topViewedThoughts}
            metricLabel="views"
          />
          <TopThoughtsCard
            title="Top Reacted Thoughts"
            thoughts={serverStats.topReactedThoughts}
            metricLabel="reactions"
          />
        </div>
      </SectionLayout>

      {/* GitHub Section */}
      <SectionLayout
        title={t("stats.sections.github.title")}
        description={t("stats.sections.github.description")}
        badge={t("stats.sections.github.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 w-full">
          <ContributionGraphCard contributions={githubStats.contributions} />
          <div className="md:grid grid-cols-1 md:grid-cols-2 h-full lg:flex flex-col gap-2 lg:col-span-2">
            <GitHubStatsCard
              type="stars"
              label="GitHub Stars"
              value={githubStats.stars}
            />
            <GitHubStatsCard
              type="forks"
              label="Forks"
              value={githubStats.forks}
            />
            <GitHubStatsCard
              type="commits"
              label="Commits"
              value={githubStats.commits}
            />
          </div>
        </div>
      </SectionLayout>

      <SectionLayout
        title="Performance"
        description="Lighthouse performance scores"
        badge="Performance"
        className="pb-0!"
      >
        <LighthouseScoreCard
          scores={lighthouseStats.mobile}
          strategy="mobile"
        />
        <LighthouseScoreCard
          scores={lighthouseStats.desktop}
          strategy="desktop"
        />
      </SectionLayout>

      {/* Changelog Section */}
      <SectionLayout
        title="Changelog"
        description="Recent updates and changes"
        badge="Updates"
        isFlex
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChangelogUpdatesCard count={changelog.length} />
          {serverStats.topViewedThoughts.length > 0 &&
            serverStats.topViewedThoughts[0] && (
              <MostViewedThoughtCard
                title={serverStats.topViewedThoughts[0].title}
                views={serverStats.topViewedThoughts[0].count}
              />
            )}
        </div>
      </SectionLayout>
    </>
  );
}
