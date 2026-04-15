import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getReactions(
  entityType: "article" | "project" | "connection" | "quest",
  entityId: string,
) {
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
    .from(tableName)
    .select("reaction_type")
    .eq(idField, entityId);

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
  entityType: "article" | "project" | "connection" | "quest",
): string {
  switch (entityType) {
    case "article":
      return "article_reactions";
    case "project":
      return "project_reactions";
    case "connection":
      return "connection_reactions";
    case "quest":
      return "quest_reactions";
  }
}

function getIdField(
  entityType: "article" | "project" | "connection" | "quest",
): string {
  switch (entityType) {
    case "article":
      return "slug";
    case "project":
      return "project_id";
    case "connection":
      return "connection_id";
    case "quest":
      return "quest_id";
  }
}
