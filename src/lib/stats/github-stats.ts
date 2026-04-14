import { unstable_cache } from "next/cache";
import type {
  GitHubStats,
  ContributionData,
  ContributionDay,
  ContributionWeek,
} from "./types";

// Configuration GitHub
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "adrielzimbril";
const GITHUB_REPO = process.env.GITHUB_REPO || "portfolio-shiro";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Fonction pour récupérer les statistiques GitHub
export async function getGitHubStats(): Promise<GitHubStats> {
  return unstable_cache(
    async () => {
      console.log("[GitHub Stats] Fetching GitHub stats...");
      console.log("[GitHub Stats] Username:", GITHUB_USERNAME);
      console.log("[GitHub Stats] Repo:", GITHUB_REPO);
      console.log("[GitHub Stats] Token set:", !!GITHUB_TOKEN);

      if (!GITHUB_TOKEN) {
        console.warn(
          "[GitHub Stats] GITHUB_TOKEN not set, returning empty stats",
        );
        return getEmptyGitHubStats();
      }

      try {
        const [repoStats, contributions] = await Promise.all([
          fetchRepoStats(),
          fetchContributions(),
        ]);

        console.log(
          "[GitHub Stats] Repo stats received:",
          JSON.stringify(repoStats, null, 2),
        );
        console.log(
          "[GitHub Stats] Contributions received:",
          contributions.totalContributions,
        );

        if (!repoStats) {
          console.error("[GitHub Stats] Repo stats is null");
          return getEmptyGitHubStats();
        }

        return {
          stars: repoStats.stargazerCount || 0,
          forks: repoStats.forkCount || 0,
          commits: repoStats.defaultBranchRef?.target?.history?.totalCount || 0,
          contributions,
        };
      } catch (error) {
        console.error("[GitHub Stats] Error fetching GitHub stats:", error);
        return getEmptyGitHubStats();
      }
    },
    ["github-stats"],
    {
      revalidate: 3600, // Revalider toutes les heures
      tags: ["stats", "github"],
    },
  )();
}

async function fetchRepoStats() {
  console.log("[GitHub Stats] Fetching repo stats...");

  const query = `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        stargazerCount
        forkCount
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { owner: GITHUB_USERNAME, name: GITHUB_REPO },
    }),
  });

  console.log("[GitHub Stats] Response status:", response.status);

  if (!response.ok) {
    console.error(
      "[GitHub Stats] Failed to fetch GitHub repo stats:",
      response.status,
    );
    throw new Error("Failed to fetch GitHub repo stats");
  }

  const data = await response.json();
  console.log("[GitHub Stats] Response data:", data);

  if (!data.data) {
    console.error("[GitHub Stats] No data.data in response");
    console.error(
      "[GitHub Stats] Full response:",
      JSON.stringify(data, null, 2),
    );
    return null;
  }

  if (!data.data.repository) {
    console.error("[GitHub Stats] No data.data.repository in response");
    console.error(
      "[GitHub Stats] Full response:",
      JSON.stringify(data, null, 2),
    );
    return null;
  }

  return data.data.repository;
}

async function fetchContributions(): Promise<ContributionData> {
  console.log("[GitHub Stats] Fetching contributions...");

  try {
    // Utiliser l'API REST GitHub pour récupérer les contributions
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/stats/contributors`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(
        "[GitHub Stats] Failed to fetch contributions:",
        response.status,
      );
      return getEmptyContributions();
    }

    const contributors = await response.json();

    if (!Array.isArray(contributors) || contributors.length === 0) {
      console.log("[GitHub Stats] No contributors found");
      return getEmptyContributions();
    }

    // Trouver les contributions de l'utilisateur principal
    const mainContributor = contributors.find(
      (c: any) => c.author.login === GITHUB_USERNAME,
    );

    if (!mainContributor) {
      console.log("[GitHub Stats] Main contributor not found");
      return getEmptyContributions();
    }

    console.log(
      "[GitHub Stats] Main contributor found:",
      mainContributor.author.login,
    );

    // Transformer les données de contributions en ContributionData
    const weeks: ContributionWeek[] = [];
    const now = new Date();

    for (let i = 0; i < 52; i++) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - i * 7);

      const days: ContributionDay[] = [];
      for (let j = 0; j < 7; j++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(dayDate.getDate() + j);

        // Trouver les contributions pour ce jour
        const dayContributions = mainContributor.weeks.find((w: any) => {
          const weekDate = new Date(w.w * 1000);
          return weekDate.toDateString() === dayDate.toDateString();
        });

        const contributionCount = dayContributions?.days[j]?.c || 0;
        const contributionLevel = getContributionLevel(contributionCount);

        days.push({
          date: dayDate.toISOString().split("T")[0] || dayDate.toISOString(),
          contributionCount,
          contributionLevel,
        });
      }

      weeks.unshift({ contributionDays: days });
    }

    const totalContributions = mainContributor.total || 0;

    console.log("[GitHub Stats] Total contributions:", totalContributions);

    return {
      totalContributions,
      weeks,
    };
  } catch (error) {
    console.error("[GitHub Stats] Error fetching contributions:", error);
    return getEmptyContributions();
  }
}

function getContributionLevel(
  count: number,
):
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE" {
  if (count === 0) return "NONE";
  if (count <= 2) return "FIRST_QUARTILE";
  if (count <= 4) return "SECOND_QUARTILE";
  if (count <= 6) return "THIRD_QUARTILE";
  return "FOURTH_QUARTILE";
}

function getEmptyGitHubStats(): GitHubStats {
  return {
    stars: 0,
    forks: 0,
    commits: 0,
    contributions: getEmptyContributions(),
  };
}

function getEmptyContributions(): ContributionData {
  const weeks: ContributionWeek[] = [];
  const now = new Date();

  for (let i = 0; i < 52; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);

    const days: ContributionDay[] = [];
    for (let j = 0; j < 7; j++) {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + j);

      days.push({
        date: dayDate.toISOString().split("T")[0] || dayDate.toISOString(),
        contributionCount: 0,
        contributionLevel: "NONE",
      });
    }

    weeks.unshift({ contributionDays: days });
  }

  return {
    totalContributions: 0,
    weeks,
  };
}
