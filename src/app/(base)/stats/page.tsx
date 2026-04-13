import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { getBuildTimeStats } from "@/lib/stats/build-time-stats";
import { getServerStats } from "@/lib/stats/server-stats";
import { getGitHubStats } from "@/lib/stats/github-stats";
import { getLighthouseStats } from "@/lib/stats/lighthouse-stats";
import { StatsPageHeader } from "@/components/stats/StatsPageHeader";
import { StatsSectionHeader } from "@/components/stats/StatsSectionHeader";
import { StatCard } from "@/components/stats/StatCard";
import { TopArticlesCard } from "@/components/stats/TopArticlesCard";
import { ReactionBreakdown } from "@/components/stats/ReactionBreakdown";
import { CategoryBarChart } from "@/components/stats/CategoryBarChart";
import { DaysSinceRevamp } from "@/components/stats/DaysSinceRevamp";
import { CoffeeCupsCard } from "@/components/stats/CoffeeCupsCard";
import { MostViewedArticleCard } from "@/components/stats/MostViewedArticleCard";
import { CommunityMessagesCard } from "@/components/stats/CommunityMessagesCard";
import { ChangelogUpdatesCard } from "@/components/stats/ChangelogUpdatesCard";
import { SiteViewsCard } from "@/components/stats/SiteViewsCard";
import { GitHubStatsCard } from "@/components/stats/GitHubStatsCard";
import { ContributionGraphCard } from "@/components/stats/ContributionGraphCard";
import { LighthouseScoreCard } from "@/components/stats/LighthouseScoreCard";
import { StatsPageWrapper } from "@/components/stats/StatsPageWrapper";

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
  // Parallel data fetching
  const [buildTimeStats, serverStats, githubStats, lighthouseStats] =
    await Promise.all([
      getBuildTimeStats(),
      getServerStats(),
      getGitHubStats(),
      getLighthouseStats(),
    ]);

  // Computed stats
  const coffeeCups = Math.floor(buildTimeStats.totalWords / 500);

  // Format reading time nicely
  const hours = Math.floor(buildTimeStats.combinedReadingMinutes / 60);
  const minutes = buildTimeStats.combinedReadingMinutes % 60;
  const readingTimeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  // Get the most viewed article for the featured card
  const mostViewedArticle = serverStats.topViewedArticles[0];

  return (
    <StatsPageWrapper>
      <div className="mt-14 space-y-12 pb-16 md:mt-16 md:space-y-16">
        <StatsPageHeader />

        {/* Blog Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSectionHeader
            title="Blog Stats"
            description="Content creation metrics and popular articles"
            delay={0.2}
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            {/* Row 1: Key metrics + Most Viewed Article */}
            <div className="md:col-span-2">
              <StatCard
                label="Total Articles"
                value={buildTimeStats.totalArticles}
                delay={0.25}
              />
            </div>
            {mostViewedArticle && mostViewedArticle.imageName && (
              <div className="md:col-span-5 md:row-span-2">
                <MostViewedArticleCard
                  title={mostViewedArticle.title}
                  slug={mostViewedArticle.slug}
                  imageName={mostViewedArticle.imageName}
                  viewCount={mostViewedArticle.count}
                  delay={0.3}
                />
              </div>
            )}
            <div className="md:col-span-5">
              <CoffeeCupsCard cups={coffeeCups} delay={0.35} />
            </div>

            {/* Row 2: Writing stats */}
            <div className="md:col-span-2">
              <StatCard
                label="Words Written"
                value={buildTimeStats.totalWords}
                delay={0.4}
              />
            </div>
            <div className="md:col-span-5">
              <StatCard
                label="Reading Time"
                value={readingTimeFormatted}
                animate={false}
                delay={0.45}
              />
            </div>

            {/* Row 3-4: Article lists + Category chart */}
            <div className="md:col-span-5">
              <TopArticlesCard
                title="Top Viewed Articles"
                articles={serverStats.topViewedArticles.slice(1, 5)}
                metricLabel="views"
                delay={0.5}
              />
            </div>
            <div className="md:col-span-7 md:row-span-2">
              <CategoryBarChart
                categories={buildTimeStats.categoryBreakdown}
                delay={0.55}
              />
            </div>
            <div className="md:col-span-5">
              <TopArticlesCard
                title="Most Reacted Articles"
                articles={serverStats.topReactedArticles.slice(0, 4)}
                metricLabel="reactions"
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Engagement Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSectionHeader
            title="Engagement"
            description="Site activity and community interactions"
            delay={0.65}
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            {/* Row 1: Views + Reactions + Community */}
            <div className="md:col-span-3">
              <SiteViewsCard value={serverStats.totalViews} delay={0.7} />
            </div>
            <div className="md:col-span-5 md:row-span-2">
              <ReactionBreakdown
                reactions={serverStats.reactionsByType}
                delay={0.75}
              />
            </div>
            <div className="md:col-span-4">
              <CommunityMessagesCard
                count={serverStats.communityWallMessages}
                delay={0.8}
              />
            </div>

            {/* Row 2: Site meta */}
            <div className="md:col-span-3">
              <ChangelogUpdatesCard
                count={buildTimeStats.changelogCount}
                delay={0.85}
              />
            </div>
            <div className="md:col-span-4">
              <DaysSinceRevamp revampDate={REVAMP_DATE} delay={0.9} />
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSectionHeader
            title="GitHub"
            description="Open source contributions and repository stats"
            delay={0.95}
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            {githubStats.contributions && (
              <div className="h-full md:col-span-9">
                <ContributionGraphCard
                  contributions={githubStats.contributions}
                  delay={1.0}
                />
              </div>
            )}
            <div className="flex h-full flex-col gap-2 md:col-span-3">
              <div className="flex-1">
                <GitHubStatsCard
                  type="stars"
                  label="GitHub Stars"
                  value={githubStats.stars}
                  delay={1.05}
                />
              </div>
              <div className="flex-1">
                <GitHubStatsCard
                  type="forks"
                  label="Forks"
                  value={githubStats.forks}
                  delay={1.1}
                />
              </div>
              <div className="flex-1">
                <GitHubStatsCard
                  type="commits"
                  label="Commits"
                  value={githubStats.commits}
                  delay={1.15}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        {(lighthouseStats.mobile || lighthouseStats.desktop) && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSectionHeader
              title="Performance"
              description="Lighthouse scores for site speed and accessibility"
              delay={1.2}
            />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              {lighthouseStats.mobile && (
                <div className="md:col-span-6">
                  <LighthouseScoreCard
                    scores={lighthouseStats.mobile}
                    strategy="mobile"
                    delay={1.25}
                  />
                </div>
              )}
              {lighthouseStats.desktop && (
                <div className="md:col-span-6">
                  <LighthouseScoreCard
                    scores={lighthouseStats.desktop}
                    strategy="desktop"
                    delay={1.3}
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </StatsPageWrapper>
  );
}
