import React from "react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Eye, Star, Users, Briefcase } from "lucide-react";

async function getGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/users/adrielzimbril", {
      next: { revalidate: 3600 }, // Cache for 1 hour
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

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Statistics | ${t("home.title")}`,
    description: "Insights and metrics about my work and projects.",
  };
}

export default async function StatsPage() {
  const githubStats = await getGitHubStats();

  const metrics = [
    {
      label: "GitHub Followers",
      value: githubStats.followers,
      icon: Users,
      color: "blue",
    },
    {
      label: "Public Repositories",
      value: githubStats.publicRepos,
      icon: Github,
      color: "purple",
    },
    {
      label: "GitHub Stars",
      value: "150+", // Hardcoded or sum of stars from repo API if needed
      icon: Star,
      color: "yellow",
    },
    {
      label: "Site Views",
      value: "12k+",
      icon: Eye,
      color: "green",
    },
  ];

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Statistics
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Open-source metrics and site analytics. A transparency layer into my digital journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className="border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 text-${metric.color}-500`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tighter">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Decorative Chart Placeholder */}
      <div className="mt-12 p-8 rounded-3xl border border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl min-h-[300px] flex items-center justify-center overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none" />
         <p className="text-muted-foreground italic font-medium">Activity visualization coming soon...</p>
      </div>
    </div>
  );
}
