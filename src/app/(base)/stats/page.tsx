import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getBuildTimeStats } from "@/lib/stats/build-time-stats";
import { getServerStats } from "@/lib/stats/server-stats";
import { getGitHubStats } from "@/lib/stats/github-stats";
import { getLighthouseStats } from "@/lib/stats/lighthouse-stats";
import { StatsPageHeader } from "@/components/stats/StatsPageHeader";
import { StatCard } from "@/components/stats/StatCard";
import { StatCardWithDecoration } from "@/components/stats/StatCardWithDecoration";
import {
  BookOne,
  TextFolder,
  Timelapse,
  Coffee,
  Eye,
  Calendar,
} from "@aurthle/icons";
import { CategoryBarChart } from "@/components/stats/CategoryBarChart";
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

  const locale = await getLocale();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Total Thoughts"
            value={buildTimeStats.totalPosts}
            suffix="thoughts"
            icon={<BookOne size={32} className="text-primary" variant="bulk" />}
            decoration="💭"
          />
          <StatCard
            label="Total Words"
            value={buildTimeStats.totalWords}
            suffix="words"
            icon={
              <TextFolder size={32} className="text-primary" variant="bulk" />
            }
            decoration="📝"
          />
          <StatCard
            label="Reading Time"
            value={buildTimeStats.totalReadingTime}
            suffix="min"
            icon={
              <Timelapse size={32} className="text-primary" variant="bulk" />
            }
            decoration="⏱️"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCardWithDecoration
            label="Coffee Consumed"
            value={coffeeCups}
            suffix="cups"
            icon={
              <Coffee size={32} className="text-amber-600" variant="bulk" />
            }
            decoration="☕"
            description="1 cup per 500 words"
          />
          <StatCardWithDecoration
            label="Site Age"
            value={daysSinceRevamp}
            suffix="days"
            icon={
              <Calendar size={32} className="text-primary" variant="bulk" />
            }
            decoration="📅"
            description={`Launched ${REVAMP_DATE.toLocaleDateString(locale, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
          />
          <StatCardWithDecoration
            label="Total Site Views"
            value={serverStats.totalViews}
            icon={<Eye size={32} className="text-primary" variant="bulk" />}
            decoration="👁️"
            description="Since launch"
          />
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopThoughtsCard
              title="Top Viewed Thoughts"
              thoughts={serverStats.topViewedThoughts.slice(0, 5)}
              metricLabel="views"
            />
            <TopThoughtsCard
              title="Top Reacted Thoughts"
              thoughts={serverStats.topReactedThoughts.slice(0, 5)}
              metricLabel="reactions"
            />
          </div>
          <CategoryBarChart categories={buildTimeStats.categories} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReactionBreakdown reactions={serverStats.reactions} />
          <CommunityMessagesCard count={serverStats.communityMessages} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-fit">
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
        <ContributionGraphCard contributions={githubStats.contributions} />
        {/* <div className="hidden! grid grid-cols-1 gap-2 lg:grid-cols-12 w-full">
          <ContributionGraphCard contributions={githubStats.contributions} />
          <div className="hidden! grid grid-cols-1 md:grid-cols-3 md:h-full w-full lg:flex flex-col gap-2 lg:col-span-2">
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
        </div> */}
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
