import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { getSupabaseConfig } from "@/config";

export async function getReactions(
  pageType: PageType,
  entityId: string,
): Promise<Record<ReactionType, number>> {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();
  const supabase = createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
    },
  });

  const { data, error } = await supabase
    .from("reactions" as any)
    .select("reaction_type")
    .eq("page_type", pageType)
    .eq("entity_id", entityId);

  if (error) {
    return {};
  }

  const reactions: Record<string, number> = {
    like: 0,
    heart: 0,
    celebrate: 0,
    insightful: 0,
    sceptic: 0,
  };

  data?.forEach((item) => {
    const type = item.reaction_type as keyof typeof reactions;
    reactions[type] = (reactions[type] || 0) + 1;
  });

  return reactions;
}
