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
import { StatCard } from "@/components/stats/StatCard";
import {
  BookOne,
  TextFolder,
  Timelapse,
  Coffee,
  Eye,
  Calendar,
  ChatBubbleCircle,
} from "@aurthle/icons";
import { BarChartCard } from "@/components/stats/BarChartCard";
import { GitHubStatsCard } from "@/components/stats/GitHubStatsCard";
import { LighthouseScoreCard } from "@/components/stats/LighthouseScoreCard";
import { TopThoughtsList } from "@/components/stats/TopThoughtsList";
import { ReactionMiniCards } from "@/components/stats/ReactionMiniCards";
import { TrendUp, HeartOne } from "@aurthle/icons";
import { ContributionGraphCard } from "@/components/stats/ContributionGraphCard";
import { MostViewedThoughtCard } from "@/components/stats/MostViewedThoughtCard";
import { ChangelogUpdatesCard } from "@/components/stats/ChangelogUpdatesCard";
import { changelog } from "@/data/personal/changelog";
import { TopThoughtsListType } from "@/types/enum";

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
  const locale = await getLocale();

  // Fetch data from different sources
  const [buildTimeStats, serverStats, githubStats, lighthouseStats] =
    await Promise.all([
      getBuildTimeStats(),
      getServerStats(locale),
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

      <SectionLayout
        description={t("stats.sections.blog.description")}
        badge={t("stats.sections.blog.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="mt-6 md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Coffee Consumed"
            value={coffeeCups}
            suffix="cups"
            icon={<Coffee size={32} variant="bulk" />}
            decoration="☕"
            description="1 cup per 500 words"
          />
          <StatCard
            label="Site Age"
            value={daysSinceRevamp}
            suffix="days"
            icon={<Calendar size={32} variant="bulk" />}
            decoration="📅"
            description={`Launched ${REVAMP_DATE.toLocaleDateString(locale, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
          />
          <StatCard
            label="Total Site Views"
            value={serverStats.totalViews}
            icon={<Eye size={32} variant="bulk" />}
            decoration="👁️"
            description="Since launch"
          />
        </div>
      </SectionLayout>

      <SectionLayout
        description={t("stats.sections.engagement.description")}
        badge={t("stats.sections.engagement.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopThoughtsList
              title="Top Viewed Thoughts"
              description="Most read articles"
              type={TopThoughtsListType.REACTED}
              thoughts={serverStats.topViewedThoughts}
              icon={
                <TrendUp
                  size={32}
                  // className="text-rose-500"
                  variant="bulk"
                />
              }
              decoration="📈"
            />
            <TopThoughtsList
              title="Top Reacted Thoughts"
              description="Most loved articles"
              type={TopThoughtsListType.REACTED}
              thoughts={serverStats.topReactedThoughts}
              icon={
                <HeartOne
                  size={32}
                  // className="text-rose-500"
                  variant="bulk"
                />
              }
              decoration="❤️"
            />
          </div>
          <BarChartCard
            data={buildTimeStats.categories.map((cat) => ({
              name: cat.name,
              count: cat.count,
            }))}
            title="Categories"
            description="Thoughts by topic"
            iconName="ChartPresentationOne"
            decorationEmoji="📊"
          />
          <ReactionMiniCards reactions={serverStats.reactions} />
          {serverStats.topViewedThoughts.length > 0 &&
            serverStats.topViewedThoughts[0] && (
              <MostViewedThoughtCard
                title={serverStats.topViewedThoughts[0].title}
                slug={serverStats.topViewedThoughts[0].slug}
                coverImage={serverStats.topViewedThoughts[0].coverImage}
                views={serverStats.topViewedThoughts[0].count}
              />
            )}
        </div>
      </SectionLayout>

      <SectionLayout
        badge={t("stats.sections.blog.badge")}
        isFlex
        className="pb-0!"
      >
        <div className="grid md:w-[90%] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Thoughts"
            value={buildTimeStats.totalPosts}
            suffix="thoughts"
            icon={<BookOne size={32} variant="bulk" />}
            decorationPattern="💭"
          />
          <StatCard
            label="Total Words"
            value={buildTimeStats.totalWords}
            suffix="words"
            icon={<TextFolder size={32} variant="bulk" />}
            decorationPattern="📝"
          />
          <StatCard
            label="Community Messages"
            value={serverStats.communityMessages}
            suffix="messages"
            icon={<ChatBubbleCircle size={32} variant="bulk" />}
            decorationPattern="💬"
          />
          <StatCard
            label="Reading Time"
            value={buildTimeStats.totalReadingTime}
            suffix="min"
            icon={<Timelapse size={32} variant="bulk" />}
            decorationPattern="⏱️"
          />
        </div>
      </SectionLayout>

      {/* GitHub Section */}
      <SectionLayout
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
        description="Recent updates and changes"
        badge="Updates"
        isFlex
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChangelogUpdatesCard count={changelog.length} />
        </div>
      </SectionLayout>
    </>
  );
}
