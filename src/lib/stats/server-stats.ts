import { unstable_cache } from "next/cache";
import { ServerStats, ThoughtMetric, ReactionType } from "@/lib/stats/types";
import { PageType } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Function to retrieve statistics from the server (Supabase)
export async function getServerStats(): Promise<ServerStats> {
  return unstable_cache(
    async () => {
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
          name: item.slug || "",
          slug: item.slug || "",
          title: item.slug || "", // You might need to fetch title from content
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
          title: slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()), // Convert slug to title case
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
    ["server-stats"],
    {
      revalidate: 3600, // Revalidate every hour
      tags: ["stats"],
    },
  )();
}
