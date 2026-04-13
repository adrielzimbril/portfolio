import type {
  GitHubStats,
  ContributionData,
  ContributionWeek,
  ContributionDay,
} from "./types";

export async function getGitHubStats(): Promise<GitHubStats> {
  // TODO: Implement real GitHub API fetching
  // For now, return mock data to match the design

  // Generate mock contribution data for the last year
  const weeks: ContributionWeek[] = [];
  const today = new Date();

  for (let week = 0; week < 52; week++) {
    const weekDate = new Date(today);
    weekDate.setDate(weekDate.getDate() - week * 7);

    const contributionDays: ContributionDay[] = [];
    for (let day = 0; day < 7; day++) {
      const dayDate = new Date(weekDate);
      dayDate.setDate(dayDate.getDate() - (6 - day));

      const count = Math.floor(Math.random() * 10);
      let level: ContributionDay["contributionLevel"] = "NONE";
      if (count > 0 && count <= 3) level = "FIRST_QUARTILE";
      else if (count > 3 && count <= 6) level = "SECOND_QUARTILE";
      else if (count > 6 && count <= 9) level = "THIRD_QUARTILE";
      else if (count > 9) level = "FOURTH_QUARTILE";

      contributionDays.push({
        date: dayDate.toISOString().split("T")[0] || "",
        contributionCount: count,
        contributionLevel: level,
      });
    }

    weeks.unshift({ contributionDays });
  }

  const contributions: ContributionData = {
    totalContributions: 847,
    weeks,
  };

  return {
    stars: 1234,
    forks: 567,
    commits: 2345,
    contributions,
  };
}
