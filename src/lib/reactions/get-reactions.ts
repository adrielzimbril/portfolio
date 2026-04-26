import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export async function getReactions(
  pageType: PageType,
  entityId: string,
): Promise<Record<ReactionType, number>> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("reactions")
    .select("reaction_type")
    .eq("page_type", pageType)
    .eq("entity_id", entityId);

  const reactions: Record<string, number> = {
    like: 0,
    heart: 0,
    celebrate: 0,
    insightful: 0,
    sceptic: 0,
  };

  if (error) {
    return reactions;
  }

  data?.forEach((item) => {
    const type = item.reaction_type as keyof typeof reactions;
    reactions[type] = (reactions[type] || 0) + 1;
  });

  return reactions;
}
