import { unstable_cache } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ServerStats, ThoughtMetric, ReactionType } from "@/lib/stats/types";
import { PageType } from "@/types";

// Function to retrieve statistics from the server (Supabase)
export async function getServerStats(): Promise<ServerStats> {
  return unstable_cache(
    async () => {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
          },
        },
      );

      // Fetch total views from page_counters
      const { data: pageCounters } = await supabase
        .from("page_counters" as any)
        .select("total_views");

      const totalViews =
        pageCounters?.reduce((sum, pc) => sum + (pc.total_views || 0), 0) || 0;

      // Fetch reactions from all reaction tables
      const reactionTypes: ReactionType[] = [
        ReactionType.LIKE,
        ReactionType.HEART,
        ReactionType.CELEBRATE,
        ReactionType.INSIGHTFUL,
      ];

      const reactions: Record<ReactionType, number> = {
        [ReactionType.LIKE]: 0,
        [ReactionType.HEART]: 0,
        [ReactionType.CELEBRATE]: 0,
        [ReactionType.INSIGHTFUL]: 0,
      };

      // Fetch from thought_reactions (thoughts)
      const { data: thoughtReactions } = await supabase
        .from("thought_reactions" as any)
        .select("reaction_type");

      thoughtReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch from project_reactions
      const { data: projectReactions } = await supabase
        .from("project_reactions" as any)
        .select("reaction_type");

      projectReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch from hub_reactions
      const { data: hubReactions } = await supabase
        .from("hub_reactions" as any)
        .select("reaction_type");

      hubReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch from connection_reactions
      const { data: connectionReactions } = await supabase
        .from("connection_reactions" as any)
        .select("reaction_type");

      connectionReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch from quest_reactions
      const { data: questReactions } = await supabase
        .from("quest_reactions" as any)
        .select("reaction_type");

      questReactions?.forEach((r) => {
        const type = r.reaction_type as ReactionType;
        if (type in reactions) {
          reactions[type]++;
        }
      });

      // Fetch top viewed thoughts
      const { data: topViewedData } = await supabase
        .from("page_counters" as any)
        .select("slug, total_views")
        .eq("type", PageType.THOUGHT)
        .order("total_views", { ascending: false })
        .limit(10);

      const topViewedThoughts: ThoughtMetric[] =
        topViewedData?.map((item) => ({
          slug: item.slug || "",
          title: item.slug || "", // You might need to fetch title from content
          count: item.total_views || 0,
        })) || [];

      // Fetch top reacted thoughts
      const { data: thoughtReactionCounts } = await supabase
        .from("thought_reactions" as any)
        .select("slug");

      const reactionCounts: Record<string, number> = {};
      thoughtReactionCounts?.forEach((r) => {
        reactionCounts[r.slug] = (reactionCounts[r.slug] || 0) + 1;
      });

      const topReactedThoughts: ThoughtMetric[] = Object.entries(reactionCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([slug, count]) => ({
          slug,
          title: slug, // You might need to fetch title from content
          count,
        }));

      // Fetch community messages count
      const { count: communityMessages } = await supabase
        .from("community_wall" as any)
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
      revalidate: 3600, // Revalider toutes les heures
      tags: ["stats"],
    },
  )();
}
