import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Coffee, Eye, Star, Users, Github, Zap } from "lucide-react";
import { getAllPosts } from "@/integrations/content/lib";

// Revamp date
const REVAMP_DATE = new Date("2025-01-01");

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
  const posts = await getAllPosts({ published: true });

  // Real data calculations
  const totalArticles = posts.length;
  const totalWords = posts.reduce((sum, post) => {
    const wordCount = post.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return sum + wordCount;
  }, 0);
  const readingMinutes = Math.ceil(totalWords / 200);
  const coffeeCups = Math.floor(totalWords / 500);

  // Days since revamp
  const now = new Date();
  const daysSinceRevamp = Math.floor(
    (now.getTime() - REVAMP_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Format reading time
  const hours = Math.floor(readingMinutes / 60);
  const minutes = readingMinutes % 60;
  const readingTimeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <>
      <PageHero
        title={t("stats.page.title")}
        description={t("stats.page.description")}
        imagePath={{ emoji: "📊" }}
        isMobileShowed
      />

      {/* Blog Stats Section */}
      <SectionLayout
        title={t("stats.sections.blog.title")}
        description={t("stats.sections.blog.description")}
        badge={t("stats.sections.blog.badge")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <FileText className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">{totalArticles}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Coffee className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">{coffeeCups}</div>
              <div className="text-sm text-muted-foreground">Coffee Cups</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Zap className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">
                {totalWords.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Words Written</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Eye className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">
                {readingTimeFormatted}
              </div>
              <div className="text-sm text-muted-foreground">Reading Time</div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* Engagement Section */}
      <SectionLayout
        title={t("stats.sections.engagement.title")}
        description={t("stats.sections.engagement.description")}
        badge={t("stats.sections.engagement.badge")}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Eye className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
              <div className="text-xs text-muted-foreground mt-2">
                Analytics integration needed
              </div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Star className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">Reactions</div>
              <div className="text-xs text-muted-foreground mt-2">
                Analytics integration needed
              </div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Users className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">
                Community Messages
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Supabase integration needed
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* GitHub Section */}
      <SectionLayout
        title={t("stats.sections.github.title")}
        description={t("stats.sections.github.description")}
        badge={t("stats.sections.github.badge")}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Star className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
              <div className="text-xs text-muted-foreground mt-2">
                GitHub API integration needed
              </div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Github className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">Followers</div>
              <div className="text-xs text-muted-foreground mt-2">
                GitHub API integration needed
              </div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <FileText className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">-</div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
              <div className="text-xs text-muted-foreground mt-2">
                GitHub API integration needed
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* Site Meta Section */}
      <SectionLayout
        title="Site Meta"
        description="Site information and statistics"
        badge="Info ℹ️"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Zap className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">{daysSinceRevamp}</div>
              <div className="text-sm text-muted-foreground">
                Days Since Revamp
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {REVAMP_DATE.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <FileText className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">0</div>
              <div className="text-sm text-muted-foreground">
                Changelog Updates
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Changelog integration needed
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </>
  );
}
