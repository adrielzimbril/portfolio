import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { Locale } from "@/types";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creator_name, creator_avatar_url, message, language } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("community_wall")
      .insert({
        creator_name,
        creator_avatar_url: creator_avatar_url || null,
        message: {
          [language || Locale.EN]: message,
        },
        user_id: null, // Admin messages don't have a user_id
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 },
    );
  }
}
