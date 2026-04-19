import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";
import { supabaseKey } from "@/integrations/supabase/client";

export async function GET() {
  try {
    // Create a simple Supabase client without cookies for API route
    const supabase = createSupabaseClient<Database>(
      supabaseKey.url!,
      supabaseKey.anonKey!,
    );

    const { data: messages, error } = await supabase
      .from("community_wall")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
}
