import { NextResponse } from "next/server";
import logger from "@/utils/logger";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";
import { supabaseKey } from "@/integrations/supabase/client";

export async function GET() {
  try {
    logger.info("API: Fetching stats from community_wall");

    // Create a simple Supabase client without cookies for API route
    const supabase = createSupabaseClient<Database>(
      supabaseKey.url!,
      supabaseKey.anonKey!,
    );

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    logger.info("API: Supabase response for stats", {
      error,
      messagesCount: messages?.length,
    });

    if (error) {
      logger.error("API: Supabase error", error);
      return NextResponse.json(
        { totalMessages: 0, uniqueMembers: 0, weekMessages: 0 },
        { status: 200 }
      );
    }

    // Calculate stats
    const totalMessages = messages?.length || 0;
    const uniqueMembers = new Set(messages?.map((m) => m.user_id)).size;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekMessages =
      messages?.filter((m) => new Date(m.created_at) >= weekAgo).length || 0;

    const stats = {
      totalMessages,
      uniqueMembers,
      weekMessages,
    };

    logger.info("API: Returning stats", {
      totalMessages,
      uniqueMembers,
      weekMessages,
    });
    return NextResponse.json(stats);
  } catch (error) {
    logger.error("API: Catch error", error);
    return NextResponse.json(
      { totalMessages: 0, uniqueMembers: 0, weekMessages: 0 },
      { status: 200 }
    );
  }
}
