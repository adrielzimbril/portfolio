import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getBuildTimeStats } from "@/lib/stats/build-time-stats";
import { getServerStats } from "@/lib/stats/server-stats";
import { getGitHubStats } from "@/lib/stats/github-stats";
import { getLighthouseStats } from "@/lib/stats/lighthouse-stats";
import { StatCard } from "@/components/shared/pages/stats/StatCard";
import {
  BookOne,
  TextFolder,
  Timelapse,
  Coffee,
  Eye,
  Calendar,
  ChatBubbleCircle,
} from "@aurthle/icons";
import { ThoughtsCategoriesCard } from "@/components/shared/pages/stats/ThoughtsCategoriesCard";
import { GitHubStatsCard } from "@/components/shared/pages/stats/GitHubStatsCard";
import { LighthouseScoreCard } from "@/components/shared/pages/stats/LighthouseScoreCard";
import { ThoughtsTopList } from "@/components/shared/pages/stats/ThoughtsTopList";
import { ReactionsSection } from "@/components/shared/pages/stats/ReactionsSection";
import { TrendUp, HeartOne } from "@aurthle/icons";
import { ContributionGraphCard } from "@/components/shared/pages/stats/ContributionGraphCard";
import { ThoughtMostViewedCard } from "@/components/shared/pages/stats/ThoughtMostViewedCard";
import { ChangelogUpdatesCard } from "@/components/shared/pages/stats/ChangelogUpdatesCard";
import { getAllChangelog } from "@/integrations/content/lib/changelog";
import { TopThoughtsListType } from "@/types/enum";
import { ConfigValue } from "@/config";

const REVAMP_DATE = new Date(ConfigValue.NEXT_PUBLIC_REVAMP_DATE);

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
  const [buildTimeStats, serverStats, githubStats, lighthouseStats, changelog] =
    await Promise.all([
      getBuildTimeStats(),
      getServerStats(locale),
      getGitHubStats(),
      getLighthouseStats(),
      getAllChangelog(),
    ]);

  // Calculate additional data
  const coffeeCups = Math.floor(buildTimeStats.totalWords / 500);
  const daysSinceRevamp = Math.floor(
    (new Date().getTime() - REVAMP_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <>
      <Skeleton name="stats-hero" loading={false}>
        <PageHero
          title={t("stats.page.title")}
          description={t("stats.page.description")}
          imagePath={{ emoji: "📊" }}
          isMobileShowed
        />
      </Skeleton>

      <Skeleton name="stats-general" loading={false}>
        <SectionLayout badge="Statistique 👨‍💻" isFlex className="py-0!">
          <div className="mt-6 md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Vues totales du site"
              value={serverStats.totalViews}
              icon={<Eye size={32} variant="bulk" />}
              decoration="👁️"
              description="Depuis le lancement"
            />
            <StatCard
              label="Cafés consommés"
              value={coffeeCups}
              suffix="tasses"
              icon={<Coffee size={32} variant="bulk" />}
              decoration="☕"
              description="1 tasse pour 500 mots"
            />
            <StatCard
              label="Âge du site"
              value={daysSinceRevamp}
              suffix="jours"
              icon={<Calendar size={32} variant="bulk" />}
              decoration="📅"
              description={`Lancé le ${REVAMP_DATE.toLocaleDateString(locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
            />
          </div>
        </SectionLayout>
      </Skeleton>

      <Skeleton name="stats-engagement" loading={false}>
        <SectionLayout
          badge={t("stats.sections.engagement.badge")}
          isFlex
          className="pb-0!"
        >
          <div className="w-full lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThoughtsTopList
              title="Articles les plus vus"
              description="Articles les plus lus"
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
            <ThoughtsTopList
              title="Articles les plus aimés"
              description="Articles avec le plus de réactions"
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
          <div className="w-full">
            <ReactionsSection reactions={serverStats.reactions} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 col-span-2">
            {serverStats.topViewedThoughts.length > 0 &&
              serverStats.topViewedThoughts[0] && (
                <ThoughtMostViewedCard
                  title={serverStats.topViewedThoughts[0].title}
                  slug={serverStats.topViewedThoughts[0].slug}
                  coverImage={serverStats.topViewedThoughts[0].coverImage}
                  views={serverStats.topViewedThoughts[0].count}
                />
              )}
            <div className="grid grid-cols-1 md:grid-cols-4 h-full w-full lg:flex lg:flex-col gap-2 lg:col-span-4">
              <ThoughtsCategoriesCard
                data={buildTimeStats.categories.map((cat) => ({
                  name: cat.name,
                  count: cat.count,
                }))}
                title="Catégories"
                description="Articles par sujet"
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

      <Skeleton name="stats-blog" loading={false}>
        <SectionLayout
          badge={t("stats.sections.blog.badge")}
          isFlex
          className="pb-0!"
        >
          <div className="grid md:w-[90%] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total des articles"
              value={buildTimeStats.totalPosts}
              suffix="articles"
              icon={<BookOne size={32} variant="bulk" />}
              decorationPattern="💭"
            />
            <StatCard
              label="Total des mots"
              value={buildTimeStats.totalWords}
              suffix="mots"
              icon={<TextFolder size={32} variant="bulk" />}
              decorationPattern="📝"
            />
            <StatCard
              label="Messages de la communauté"
              value={serverStats.communityMessages}
              suffix="messages"
              icon={<ChatBubbleCircle size={32} variant="bulk" />}
              decorationPattern="💬"
            />
            <StatCard
              label="Temps de lecture"
              value={buildTimeStats.totalReadingTime}
              suffix="min"
              icon={<Timelapse size={32} variant="bulk" />}
              decorationPattern="⏱️"
            />
          </div>
        </SectionLayout>
      </Skeleton>

      <Skeleton name="stats-github" loading={false}>
        <SectionLayout
          badge={t("stats.sections.github.badge")}
          isFlex
          className="pb-0!"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-fit">
            <GitHubStatsCard
              type="stars"
              label="Étoiles GitHub"
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
        </SectionLayout>
      </Skeleton>

      <Skeleton name="stats-performance" loading={false}>
        <SectionLayout badge="Performance du site ⚡">
          <LighthouseScoreCard
            scores={lighthouseStats.mobile}
            strategy="mobile"
          />
          <LighthouseScoreCard
            scores={lighthouseStats.desktop}
            strategy="desktop"
          />
        </SectionLayout>
      </Skeleton>
    </>
  );
}
