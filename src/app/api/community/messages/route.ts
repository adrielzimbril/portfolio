import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("API: Fetching messages from community_wall");
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("API: Supabase response", {
      error,
      messagesCount: messages?.length,
    });

    if (error) {
      console.error("API: Supabase error", error);
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

    console.log("API: Returning data", {
      totalMessages,
      uniqueMembers,
      weekMessages,
    });
    return NextResponse.json({ messages: messages || [], stats });
  } catch (error) {
    console.error("API: Catch error", error);
    return NextResponse.json({ messages: [], stats: null }, { status: 200 });
  }
}
