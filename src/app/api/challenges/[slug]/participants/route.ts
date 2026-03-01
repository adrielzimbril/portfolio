import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = supabase as any;
    const { slug } = await params;

    const { data, error } = await db
      .from("challenge_submissions")
      .select(
        "id,name,work_title,work_url,portfolio_url,figma_url,poster_url,winner_rank"
      )
      .eq("challenge_slug", slug)
      .eq("is_public", true)
      .order("winner_rank", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("challenge participants fetch failed", error);
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ participants: data || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    logger.error("/api/challenges/[slug]/participants failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}

