import { NextResponse } from "next/server";
import logger from "@/utils/logger";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";
import { supabaseKey } from "@/integrations/supabase/client";

export async function GET() {
  try {
    logger.info("API: Fetching messages from community_wall");

    // Create a simple Supabase client without cookies for API route
    const supabase = createSupabaseClient<Database>(
      supabaseKey.url!,
      supabaseKey.anonKey!,
    );

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
      return NextResponse.json({ messages: [] }, { status: 200 });
    }

    logger.info("API: Returning messages", {
      count: messages?.length,
    });
    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    logger.error("API: Catch error", error);
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
}
