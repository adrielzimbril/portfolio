import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ messages: [], stats: null }, { status: 200 });
    }

    // Calculate stats
    const totalMessages = messages?.length || 0;
    const uniqueMembers = new Set(messages?.map((m) => m.user_id)).size;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMessages =
      messages?.filter((m) => new Date(m.created_at) >= today).length || 0;

    const stats = {
      totalMessages,
      uniqueMembers,
      todayMessages,
    };

    return NextResponse.json({ messages: messages || [], stats });
  } catch (error) {
    return NextResponse.json({ messages: [], stats: null }, { status: 200 });
  }
}
