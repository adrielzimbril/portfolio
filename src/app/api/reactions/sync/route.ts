import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { anonymousId } = await request.json();

    if (!anonymousId) {
      return NextResponse.json({ error: "Missing anonymousId" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.rpc("sync_anonymous_reactions_rpc", {
      p_anonymous_id: anonymousId,
    });

    if (error) throw error;

    return NextResponse.json({ syncedCount: data || 0 });
  } catch (error: any) {
    console.error("API Sync Reaction error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
