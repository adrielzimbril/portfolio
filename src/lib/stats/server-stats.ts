import { unstable_cache } from "next/cache";
import { ServerStats, ThoughtMetric, ReactionType } from "@/lib/stats/types";
import { PageType } from "@/types";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { getAllPosts } from "@/integrations/content/lib/posts";

// Function to retrieve statistics from the server (Supabase)
export async function getServerStats(locale?: string): Promise<ServerStats> {
  const cookieStore = await cookies();

  return unstable_cache(
    async () => {
      const supabase = createClient(cookieStore);

      // Fetch all posts to get titles and cover images (filtered by locale if provided)
      const allPosts = await getAllPosts({ locale });
      const postTitleMap = new Map(
        allPosts.map((post) => [post.slug, post.title]),
      );
      const postCoverMap = new Map(
        allPosts.map((post) => [post.slug, post.cover || ""]),
      );

      // Fetch total views from page_counters
      const { data: pageCounters } = await supabase
        .from("page_counters")
        .select("total_views");

      const totalViews =
        pageCounters?.reduce((sum, pc) => sum + (pc.total_views || 0), 0) || 0;

      // Fetch reactions from single reactions table
      const reactions: Record<ReactionType, number> = {
        [ReactionType.LIKE]: 0,
        [ReactionType.HEART]: 0,
        [ReactionType.CELEBRATE]: 0,
        [ReactionType.INSIGHTFUL]: 0,
        [ReactionType.SCEPTIC]: 0,
        [ReactionType.LAUGH]: 0,
        [ReactionType.WOW]: 0,
        [ReactionType.SAD]: 0,
        [ReactionType.ANGRY]: 0,
        [ReactionType.FIRE]: 0,
        [ReactionType.CLAP]: 0,
        [ReactionType.ROCKET]: 0,
        [ReactionType.PARTY]: 0,
      };

      const { data: allReactions } = await supabase
        .from("reactions")
        .select("reaction_type");

      allReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch top viewed thoughts
      const { data: topViewedData } = await supabase
        .from("page_counters")
        .select("slug, total_views")
        .eq("type", PageType.THOUGHT)
        .order("total_views", { ascending: false })
        .limit(10);

      const topViewedThoughts: ThoughtMetric[] =
        topViewedData?.map((item) => ({
          slug: item.slug || "",
          coverImage: postCoverMap.get(item.slug || "") || "",
          title: postTitleMap.get(item.slug || "") || item.slug || "",
          count: item.total_views || 0,
        })) || [];

      // Fetch top reacted thoughts
      const { data: thoughtReactionCounts } = await supabase
        .from("reactions")
        .select("entity_id")
        .eq("page_type", PageType.THOUGHT);

      const reactionCounts: Record<string, number> = {};
      thoughtReactionCounts?.forEach((r) => {
        reactionCounts[r.entity_id] = (reactionCounts[r.entity_id] || 0) + 1;
      });

      const topReactedThoughts: ThoughtMetric[] = Object.entries(reactionCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([slug, count]) => ({
          slug,
          title:
            postTitleMap.get(slug) ||
            slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Convert slug to title case if title not found
          count,
        }));

      // Fetch community messages count
      const { count: communityMessages } = await supabase
        .from("community_wall")
        .select("*", { count: "exact", head: true });

      return {
        totalViews,
        reactions,
        topViewedThoughts,
        topReactedThoughts,
        communityMessages: communityMessages || 0,
      };
    },
    ["server-stats", locale || "default"],
    {
      revalidate: 3600, // Revalidate every hour
      tags: ["stats"],
    },
  )();
}
