import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PageType } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("pageType") as PageType;
  const entityId = searchParams.get("entityId");
  const reactionType = searchParams.get("reactionType");
  const anonymousId = searchParams.get("anonymousId");

  if (!pageType || !entityId || !reactionType) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  try {
    let query = supabase
      .from("reactions")
      .select("id")
      .eq("page_type", pageType)
      .eq("entity_id", entityId)
      .eq("reaction_type", reactionType);

    if (user?.id) {
      query = query.eq("user_id", user.id);
    } else if (anonymousId) {
      query = query.eq("anonymous_id", anonymousId);
    } else {
      return NextResponse.json({ isReacted: false });
    }

    const { data } = await query.maybeSingle();
    return NextResponse.json({ isReacted: !!data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
