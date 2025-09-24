import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import { getIpInfo } from "@/hooks/useIpInfo";
import logger from "@/utils/logger";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const isBot = searchParams.get("isBot") === "true";

  if (isBot) {
    logger.info("Supabase Views | Bot access detected", { url: req.url });
  } else {
    logger.info("Supabase Views | Human access detected", { url: req.url });
  }

  const path = searchParams.get("path") || "/";
  const type = searchParams.get("type") || "page";
  const slug = searchParams.get("slug");
  const wantResponse = searchParams.get("wantResponse") === "true";

  if (!slug) {
    return new Response(JSON.stringify({ error: "Page not found" }), {
      status: 400,
    });
  }

  try {
    const { data: analyticsData, error: rpcError } = await supabase.rpc(
      "get_page_analytics",
      {
        p_type: type,
        p_slug: slug,
      }
    );

    if (rpcError) {
      throw rpcError;
    }

    const result = analyticsData?.[0] || {
      total_views: 0,
      unique_users: 0,
    };

    return new Response(
      // JSON.stringify({
      //   totalViews: result.total_views,
      //   uniqueUsers: result.unique_users,
      //   path,
      //   type,
      //   slug,
      // }),
      JSON.stringify({
        ...(wantResponse ? { count: result.total_views } : {}),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    logger.error(
      "Error fetching analytics:",
      (error as Error)?.message || error
    );
    return new Response(
      JSON.stringify({ error: (error as Error)?.message || "UNKNOWN_ERROR" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const blockedIp: string[] = ["::1", "127.0.0.1"];
  const ipInfo = blockedIp.includes(ip) ? null : await getIpInfo(ip);

  try {
    const body = await req.json().catch(() => ({}));
    const {
      path,
      type = "page",
      slug = null,
      details = null,
      wantResponse = true,
    } = body;

    // Use the PostgreSQL RPC function to handle everything atomically
    const { data: analyticsData, error: rpcError } = await supabase.rpc(
      "increment_page_analytics",
      {
        p_type: type,
        p_slug: slug,
        p_user_ip: ip,
        p_details: { ...details, userInfo: ipInfo, legacy_path: path },
      }
    );

    if (rpcError) {
      throw rpcError;
    }

    // The RPC function returns an array, take the first element
    const result = analyticsData?.[0] || {
      total_views: 1,
      unique_users: 1,
      user_view_count: 1,
      is_new_unique_user: true,
    };

    return new Response(
      // JSON.stringify({
      //   totalViews: result.total_views,
      //   uniqueUsers: result.unique_users,
      //   userViewCount: result.user_view_count,
      //   isNewUniqueUser: result.is_new_unique_user,
      //   path,
      //   type,
      //   slug,
      // }),
      JSON.stringify({
        ...(wantResponse ? { count: result.total_views } : {}),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    logger.error(
      "Error incrementing analytics:",
      (error as Error)?.message || error
    );
    return new Response(
      JSON.stringify({ error: (error as Error)?.message || "UNKNOWN_ERROR" }),
      {
        status: 500,
      }
    );
  }
}
