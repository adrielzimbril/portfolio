import type { ServerStats, ReactionType } from "./types";

export async function getServerStats(): Promise<ServerStats> {
  // TODO: Implement real data fetching from your analytics/database
  // For now, return mock data to match the design
  
  return {
    totalViews: 12543,
    totalReactions: 892,
    reactionsByType: {
      like: 456,
      heart: 234,
      celebrate: 145,
      insightful: 57,
    },
    topViewedArticles: [
      { slug: "getting-started", title: "Getting Started with Next.js", count: 2341 },
      { slug: "react-hooks", title: "Understanding React Hooks", count: 1876 },
      { slug: "typescript", title: "TypeScript Best Practices", count: 1543 },
      { slug: "tailwind", title: "Tailwind CSS Tips", count: 1234 },
      { slug: "performance", title: "Web Performance Guide", count: 987 },
    ],
    topReactedArticles: [
      { slug: "getting-started", title: "Getting Started with Next.js", count: 156 },
      { slug: "react-hooks", title: "Understanding React Hooks", count: 134 },
      { slug: "typescript", title: "TypeScript Best Practices", count: 112 },
      { slug: "tailwind", title: "Tailwind CSS Tips", count: 98 },
    ],
    communityWallMessages: 234,
  };
}
