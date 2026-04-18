import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { logger } from "@/utils/logger";
import { patterns } from "@/components/shared/pages/community/pattern";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, pattern_index, rotation, language } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if message is a string (old format) or object (new format)
    let messageJson: Record<string, string>;

    if (typeof message === "string") {
      // Legacy format: convert string to JSON with language key
      const lang = language || "en";
      messageJson = { [lang]: message.trim() };
    } else if (typeof message === "object" && message !== null) {
      // New format: validate it's a proper JSON object
      messageJson = message;
      const messageValue = messageJson[language || "en"];
      if (!messageValue || messageValue.trim().length === 0) {
        return NextResponse.json(
          { error: "Message is required" },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("community_wall").insert({
      user_id: user.id,
      creator_name: user.user_metadata.full_name || user.email,
      creator_avatar_url: user.user_metadata.avatar_url,
      message: messageJson,
      pattern_index:
        pattern_index ?? Math.floor(Math.random() * patterns.length), // Random pattern index 0-7
      rotation: rotation ?? Math.floor(Math.random() * 20) - 10, // Random rotation -10 to 10 degrees
    } as any);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    logger.error("Guestbook API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
