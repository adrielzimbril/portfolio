import { unstable_cache } from "next/cache";
import type {
  GitHubStats,
  ContributionData,
  ContributionDay,
  ContributionWeek,
} from "./types";

// Configuration GitHub - TODO: Adapter avec vos propres valeurs
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "adrielzimbril";
const GITHUB_REPO = process.env.GITHUB_REPO || "shirofolio";
const GITHUB_TOKEN = process.env.NPM_GITHUB_TOKEN;

// Fonction pour récupérer les statistiques GitHub
export async function getGitHubStats(): Promise<GitHubStats> {
  return unstable_cache(
    async () => {
      if (!GITHUB_TOKEN) {
        console.warn("GITHUB_TOKEN not set, returning default GitHub stats");
        return getDefaultGitHubStats();
      }

      try {
        const [repoStats, contributions] = await Promise.all([
          fetchRepoStats(),
          fetchContributions(),
        ]);

        return {
          stars: repoStats.stargazerCount,
          forks: repoStats.forkCount,
          commits: repoStats.defaultBranchRef.target.history.totalCount,
          contributions,
        };
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return getDefaultGitHubStats();
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

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repo stats");
  }

  const data = await response.json();
  return data.data.repository;
}

async function fetchContributions(): Promise<ContributionData> {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const query = `
    query($owner: String!, $name: String!, $from: DateTime!) {
      repository(owner: $owner, name: $name) {
        owner {
          login
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history(from: $from) {
                totalCount
              }
            }
          }
        }
      }
    }
  `;

  // Pour l'instant, retourne une contribution graph par défaut
  // TODO: Implémenter la vraie logique de récupération des contributions
  return getDefaultContributions();
}

function getDefaultGitHubStats(): GitHubStats {
  return {
    stars: 0,
    forks: 0,
    commits: 0,
    contributions: getDefaultContributions(),
  };
}

function getDefaultContributions(): ContributionData {
  // Crée une contribution graph vide par défaut
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
