import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export async function getReactions(
  entityType:
    | PageType.THOUGHT
    | PageType.PROJECT
    | PageType.CONNECTIONS
    | PageType.QUESTS
    | PageType.HUB
    | PageType.CHANGELOG,
  entityId: string,
): Promise<Record<ReactionType, number>> {
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

  const tableName = getTableName(entityType);
  const idField = getIdField(entityType);

  const { data, error } = await supabase
    .from(tableName as any)
    .select("reaction_type")
    .eq(idField as any, entityId);

  if (error) {
    return {};
  }

  const reactions: Record<string, number> = {
    like: 0,
    heart: 0,
    celebrate: 0,
    insightful: 0,
  };

  data?.forEach((item) => {
    const type = item.reaction_type as keyof typeof reactions;
    reactions[type] = (reactions[type] || 0) + 1;
  });

  return reactions;
}

function getTableName(
  entityType:
    | PageType.THOUGHT
    | PageType.PROJECT
    | PageType.CONNECTIONS
    | PageType.QUESTS
    | PageType.HUB
    | PageType.CHANGELOG,
): string {
  switch (entityType) {
    case PageType.THOUGHT:
      return "thought_reactions";
    case PageType.PROJECT:
      return "project_reactions";
    case PageType.CONNECTIONS:
      return "connection_reactions";
    case PageType.QUESTS:
      return "quest_reactions";
    case PageType.HUB:
      return "hub_reactions";
    case PageType.CHANGELOG:
      return "changelog_reactions";
  }
}

function getIdField(
  entityType:
    | PageType.THOUGHT
    | PageType.PROJECT
    | PageType.CONNECTIONS
    | PageType.QUESTS
    | PageType.HUB
    | PageType.CHANGELOG,
): string {
  switch (entityType) {
    case PageType.THOUGHT:
      return "slug";
    case PageType.PROJECT:
      return "project_id";
    case PageType.CONNECTIONS:
      return "connection_id";
    case PageType.QUESTS:
      return "quest_id";
    case PageType.HUB:
      return "slug";
    case PageType.CHANGELOG:
      return "version";
  }
}
