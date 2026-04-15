// Types pour les statistiques du site
// Adaptés du design de Braydon Coyer mais adaptés au projet actuel

export enum ReactionType {
  LIKE = "like",
  HEART = "heart",
  CELEBRATE = "celebrate",
  INSIGHTFUL = "insightful",
}

export interface BuildTimeStats {
  totalWords: number;
  totalReadingTime: number;
  totalPosts: number;
  categories: CategoryCount[];
}

export interface CategoryCount {
  name: string;
  count: number;
}

export interface ServerStats {
  totalViews: number;
  reactions: Record<ReactionType, number>;
  topViewedArticles: ArticleMetric[];
  topReactedArticles: ArticleMetric[];
  communityMessages: number;
}

export interface ArticleMetric {
  slug: string;
  title: string;
  count: number;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  commits: number;
  contributions: ContributionData;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fetchedAt: string;
}

export interface LighthouseStats {
  mobile: LighthouseScores;
  desktop: LighthouseScores;
}

export interface AllStats {
  buildTime: BuildTimeStats;
  server: ServerStats;
  github: GitHubStats;
  lighthouse: LighthouseStats;
}

export interface ComputedStats {
  coffeeCups: number;
  daysSinceRevamp: number;
}
