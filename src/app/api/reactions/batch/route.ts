import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("pageType") as PageType;
  const entityId = searchParams.get("entityId");
  const anonymousId = searchParams.get("anonymousId");

  if (!pageType || !entityId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const [countsData, userReactionsData] = await Promise.all([
      supabase
        .from("reactions")
        .select("reaction_type")
        .eq("page_type", pageType)
        .eq("entity_id", entityId),
      user?.id || anonymousId
        ? supabase
            .from("reactions")
            .select("reaction_type")
            .eq("page_type", pageType)
            .eq("entity_id", entityId)
            .eq(
              user?.id ? "user_id" : "anonymous_id",
              (user?.id || anonymousId)!,
            )
        : Promise.resolve({ data: null }),
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
      counts: reactionCounts,
      userStatus,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
