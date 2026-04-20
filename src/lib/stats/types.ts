// Types for site statistics

export enum ReactionType {
  LIKE = "like",
  HEART = "heart",
  CELEBRATE = "celebrate",
  INSIGHTFUL = "insightful",
  SCEPTIC = "sceptic",
  LAUGH = "laugh",
  WOW = "wow",
  SAD = "sad",
  ANGRY = "angry",
  FIRE = "fire",
  CLAP = "clap",
  ROCKET = "rocket",
  PARTY = "party",
}

export const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
  [ReactionType.LAUGH]: "😂",
  [ReactionType.WOW]: "😮",
  [ReactionType.SAD]: "😢",
  [ReactionType.ANGRY]: "😡",
  [ReactionType.FIRE]: "🔥",
  [ReactionType.CLAP]: "👏",
  [ReactionType.ROCKET]: "🚀",
  [ReactionType.PARTY]: "🥳",
};

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
  topViewedThoughts: ThoughtMetric[];
  topReactedThoughts: ThoughtMetric[];
  communityMessages: number;
}

export interface ThoughtMetric {
  slug: string;
  title: string;
  coverImage?: string;
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
