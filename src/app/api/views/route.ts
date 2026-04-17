import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
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

  const type = searchParams.get("type") || "page";
  const slug = searchParams.get("slug") || "/";
  const wantResponse = searchParams.get("wantResponse") === "true";

  if (!slug) {
    return NextResponse.json({ error: "Page not found" }, { status: 400 });
  }

  const supabase = createClient(cookies());

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

    return NextResponse.json(
      { ...(wantResponse ? { count: result.total_views } : {}) },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error(
      "Error fetching analytics:",
      (error as Error)?.message || error
    );
    return NextResponse.json(
      { error: (error as Error)?.message || "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const ipInfo = blockedIp.includes(ip) ? null : await getIpInfo(ip);
  const supabase = createClient(cookies());

  try {
    const body = await req.json().catch(() => ({}));
    const {
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
        p_details: { ...details, userInfo: ipInfo },
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

    return NextResponse.json(
      { ...(wantResponse ? { count: result.total_views } : {}) },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error(
      "Error incrementing analytics:",
      (error as Error)?.message || error
    );
    return NextResponse.json(
      { error: (error as Error)?.message || "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
