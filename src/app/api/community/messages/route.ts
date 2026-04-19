import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { createPublicClient } from "@/integrations/supabase/public";
import { cookies } from "next/headers";
import logger from "@/utils/logger";

export async function GET() {
  try {
    logger.info("API: Fetching messages from community_wall");
    // Use public client for public access to community messages
    const supabase = createPublicClient();

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    logger.info("API: Supabase response", {
      error,
      messagesCount: messages?.length,
    });

    if (error) {
      logger.error("API: Supabase error", error);
      return NextResponse.json({ messages: [], stats: null }, { status: 200 });
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

    logger.info("API: Returning data", {
      totalMessages,
      uniqueMembers,
      weekMessages,
    });
    return NextResponse.json({ messages: messages || [], stats });
  } catch (error) {
    logger.error("API: Catch error", error);
    return NextResponse.json({ messages: [], stats: null }, { status: 200 });
  }
}
