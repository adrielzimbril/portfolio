import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("pageType") as PageType;
  const entityId = searchParams.get("entityId");

  if (!pageType || !entityId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const supabase = createClient(cookies());

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
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = createClient(cookies());
    const { data: { user } } = await supabase.auth.getUser();

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
      return NextResponse.json({ error: "Missing user identification" }, { status: 401 });
    }

    const { data: existingReaction } = await query.maybeSingle();

    if (existingReaction) {
      // Remove reaction
      const { error } = await supabase
        .from("reactions")
        .delete()
        .eq("id", existingReaction.id);

      if (error) throw error;
      return NextResponse.json({ action: "removed" });
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

      const { error } = await supabase
        .from("reactions")
        .insert(reactionData);

      if (error && error.code !== "23505") throw error; // Ignore if duplicate from race condition
      return NextResponse.json({ action: "added" });
    }
  } catch (error: any) {
    console.error("API Reaction error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
