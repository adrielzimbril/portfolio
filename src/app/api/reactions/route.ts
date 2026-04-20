import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { logger } from "@/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("pageType") as PageType;
  const entityId = searchParams.get("entityId");

  if (!pageType || !entityId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("reactions")
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
      laugh: 0,
      wow: 0,
      sad: 0,
      angry: 0,
      fire: 0,
      clap: 0,
      rocket: 0,
      party: 0,
    };

    if (data) {
      data.forEach((item) => {
        const type = item.reaction_type as ReactionType;
        if (reactionCounts[type] !== undefined) {
          reactionCounts[type]++;
        }
      });
    }

    return NextResponse.json({ counts: reactionCounts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageType, entityId, reactionType, anonymousId } = body;

    if (!pageType || !entityId || !reactionType) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check existing reaction
    let query = supabase
      .from("reactions")
      .select("*")
      .eq("page_type", pageType)
      .eq("entity_id", entityId)
      .eq("reaction_type", reactionType);

    if (user?.id) {
      query = query.eq("user_id", user.id);
    } else if (anonymousId) {
      query = query.eq("anonymous_id", anonymousId);
    } else {
      return NextResponse.json(
        { error: "Missing user identification" },
        { status: 401 },
      );
    }

    const { data: existingReaction } = await query.maybeSingle();

    let action: "added" | "removed" | "already_reacted" = "added";

    if (existingReaction) {
      // Check if this was done elsewhere (race condition / sync issue)
      // For now, we'll treat it as remove (toggle behavior)
      // But in the future, we could detect if it was done elsewhere
      const { error } = await supabase
        .from("reactions")
        .delete()
        .eq("id", existingReaction.id);

      if (error) throw error;
      action = "removed";
    } else {
      // Add reaction
      const reactionData: any = {
        page_type: pageType,
        entity_id: entityId,
        reaction_type: reactionType,
      };

      if (user?.id) {
        reactionData.user_id = user.id;
      } else {
        reactionData.anonymous_id = anonymousId;
      }

      const { error } = await supabase.from("reactions").insert(reactionData);

      if (error) {
        if (error.code === "23505") {
          // Duplicate - reaction was added elsewhere
          action = "already_reacted";
        } else {
          throw error;
        }
      }
    }

    // Fetch updated counts and user status
    const [countsData, userReactionsData] = await Promise.all([
      supabase
        .from("reactions")
        .select("reaction_type")
        .eq("page_type", pageType)
        .eq("entity_id", entityId),
      supabase
        .from("reactions")
        .select("reaction_type")
        .eq("page_type", pageType)
        .eq("entity_id", entityId)
        .eq(user?.id ? "user_id" : "anonymous_id", user?.id || anonymousId),
    ]);

    const reactionCounts: Record<ReactionType, number> = {
      like: 0,
      heart: 0,
      celebrate: 0,
      insightful: 0,
      sceptic: 0,
      laugh: 0,
      wow: 0,
      sad: 0,
      angry: 0,
      fire: 0,
      clap: 0,
      rocket: 0,
      party: 0,
    };

    if (countsData.data) {
      countsData.data.forEach((item) => {
        const type = item.reaction_type as ReactionType;
        if (reactionCounts[type] !== undefined) {
          reactionCounts[type]++;
        }
      });
    }

    const userStatus: Record<ReactionType, boolean> = {
      like: false,
      heart: false,
      celebrate: false,
      insightful: false,
      sceptic: false,
      laugh: false,
      wow: false,
      sad: false,
      angry: false,
      fire: false,
      clap: false,
      rocket: false,
      party: false,
    };

    if (userReactionsData.data) {
      userReactionsData.data.forEach((item) => {
        const type = item.reaction_type as ReactionType;
        if (userStatus[type] !== undefined) {
          userStatus[type] = true;
        }
      });
    }

    return NextResponse.json({
      action,
      counts: reactionCounts,
      userStatus,
    });
  } catch (error: any) {
    logger.error("API Reaction error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
