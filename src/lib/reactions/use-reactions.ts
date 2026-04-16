import useSWR from "swr";
import { supabase } from "@/integrations/supabase/client";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export function useReactions(pageType: PageType, entityId: string) {
  const fetcher = async () => {
    const { data, error } = await supabase
      .from("reactions" as any)
      .select("reaction_type")
      .eq("page_type", pageType)
      .eq("entity_id", entityId);

    if (error) throw error;

    const reactionCounts: Record<ReactionType, number> = {
      like: 0,
      heart: 0,
      celebrate: 0,
      insightful: 0,
      sceptic: 0,
    };

    if (data) {
      data.forEach((item) => {
        const type = item.reaction_type as ReactionType;
        if (reactionCounts[type] !== undefined) {
          reactionCounts[type]++;
        }
      });
    }

    return reactionCounts;
  };

  const { data: reactions, error, isLoading, mutate } = useSWR(
    entityId ? `reactions_${pageType}_${entityId}` : null,
    fetcher,
    {
      fallbackData: {
        like: 0,
        heart: 0,
        celebrate: 0,
        insightful: 0,
        sceptic: 0,
      },
      revalidateOnFocus: true,
    }
  );

  return { 
    reactions: reactions!, 
    loading: isLoading,
    mutate
  };
}
