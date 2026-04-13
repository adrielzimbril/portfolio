import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Eye, Star, Users, FileText, Coffee, Zap } from "lucide-react";

async function getGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/users/adrielzimbril", {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    return {
      followers: data.followers || 0,
      publicRepos: data.public_repos || 0,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return { followers: 0, publicRepos: 0 };
  }
}

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
  const githubStats = await getGitHubStats();
  const t = await getTranslations();

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
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Coffee className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">45</div>
              <div className="text-sm text-muted-foreground">Coffee Cups</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Zap className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">24k</div>
              <div className="text-sm text-muted-foreground">Words Written</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Eye className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">2h</div>
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
              <div className="text-4xl font-bold mb-2">12.5k</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Star className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">156</div>
              <div className="text-sm text-muted-foreground">Reactions</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Users className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">23</div>
              <div className="text-sm text-muted-foreground">
                Community Messages
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
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Github className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">
                {githubStats.followers}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </CardContent>
          </Card>
          <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <FileText className="size-8 mb-4" />
              <div className="text-4xl font-bold mb-2">
                {githubStats.publicRepos}
              </div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </>
  );
}
