import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";

// API: GET ?path=/some/path -> returns { count }
//      POST { path } -> increments and returns { count }
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");
  const details = searchParams.get("details")
    ? JSON.parse(searchParams.get("details") || "")
    : null;

  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("path", path)
    .eq("type", type)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const count = data?.count ?? 0;
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const { path, type, slug, details } = await req
    .json()
    .catch(() => ({ path: "/", type: "page", slug: null, details: null }));
  const now = new Date().toISOString();

  // Upsert and increment count atomically using RPC via PostgREST
  // Fallback: get current and update
  const { data: existing, error: readError } = await supabase
    .from("page_views")
    .select("count")
    .eq("path", path)
    .eq("type", type)
    .eq("slug", slug)
    .maybeSingle();

  if (readError && readError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: readError.message }), {
      status: 500,
    });
  }

  const nextCount = (existing?.count ?? 0) + 1;

  const { error: upsertError } = await supabase
    .from("page_views")
    .upsert({ path, type, slug, count: nextCount, updated_at: now, details });

  if (upsertError) {
    return new Response(JSON.stringify({ error: upsertError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ count: nextCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
