import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, pattern_index, rotation } = body;

    const supabase = createClient(cookies());
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const { error } = await supabase.from("community_wall").insert({
      user_id: user.id,
      creator_name: user.user_metadata.full_name || user.email,
      creator_avatar_url: user.user_metadata.avatar_url,
      message: message.trim(),
      pattern_index: pattern_index ?? Math.floor(Math.random() * 10),
      rotation: rotation ?? Math.floor(Math.random() * 360),
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Guestbook API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
