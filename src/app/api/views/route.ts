import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";
import { useGetIpInfo } from "@/hooks/useIpInfo";
import logger from "@/utils/logger";

// API: GET ?path=/some/path -> returns { count }
//      POST { path } -> increments and returns { count }
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const path = searchParams.get("path") || "/";
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("ip", ip)
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
  const rq = req.json();
  const { path, type, slug, details } = await rq.catch(() => ({
    path: "/",
    type: "page",
    slug: null,
    details: null,
  }));
  const now = new Date().toISOString();
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Upsert and increment count atomically using RPC via PostgREST
  // Fallback: get current and update
  const { data: existing, error: readError } = await supabase
    .from("page_views")
    .select("count")
    .eq("ip", ip)
    .eq("path", path)
    .eq("type", type)
    .eq("slug", slug)
    .maybeSingle();

  if (readError && readError.code !== "PGRST116") {
    return new Response(
      JSON.stringify({ from: "readError", error: readError.message }),
      {
        status: 500,
      }
    );
  }

  const nextCount = (existing?.count ?? 0) + 1;

  const blockedIp: string[] = ["::1", "127.0.0.1"];

  const ipInfo = useGetIpInfo(blockedIp.includes(ip) ? "" : ip);

  const { error: upsertError } = await supabase.from("page_views").upsert({
    ip,
    path,
    type,
    slug,
    count: nextCount,
    updated_at: now,
    details: { ...details, userInfo: ipInfo },
  });

  if (upsertError) {
    return new Response(
      JSON.stringify({ from: "upsertError", error: upsertError.message }),
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify({ count: nextCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
