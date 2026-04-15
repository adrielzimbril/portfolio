import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export function useReactions(pageType: PageType, entityId: string) {
  const [reactions, setReactions] = useState<Record<ReactionType, number>>({
    like: 0,
    heart: 0,
    celebrate: 0,
    insightful: 0,
    sceptic: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reactions" as any)
        .select("reaction_type")
        .eq("page_type", pageType)
        .eq("entity_id", entityId);

      if (!error && data) {
        const reactionCounts: Record<string, number> = {
          like: 0,
          heart: 0,
          celebrate: 0,
          insightful: 0,
          sceptic: 0,
        };

        data.forEach((item) => {
          const type = item.reaction_type as keyof typeof reactionCounts;
          reactionCounts[type] = (reactionCounts[type] || 0) + 1;
        });

        setReactions(reactionCounts);
      }
      setLoading(false);
    };

    fetchReactions();
  }, [pageType, entityId]);

  return { reactions, loading };
}
