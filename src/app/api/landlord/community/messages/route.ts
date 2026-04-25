import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { Locale } from "@/types";
import { logger } from "@/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      50,
    );
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: messages,
      error,
      count,
    } = await supabase
      .from("community_wall")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json({ messages: [], count: 0 }, { status: 200 });
    }

    return NextResponse.json({
      rows: messages || [],
      messages: messages || [], // Keep for backward compatibility if needed
      count: count || 0,
      page,
      pageSize,
    });
  } catch (error) {
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creator_name, creator_avatar_url, message } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("community_wall")
      .insert({
        creator_name,
        creator_avatar_url: creator_avatar_url || null,
        message: message || {},
        user_id: null,
      })
      .select()
      .single();

    if (error) {
      logger.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: data });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 },
    );
  }
}
