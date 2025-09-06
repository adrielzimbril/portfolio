import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import { useGetIpInfo } from "@/hooks/useIpInfo";
import logger from "@/utils/logger";

// API: GET ?path=/some/path -> returns { totalViews, uniqueUsers }
//      POST { path } -> increments and returns { totalViews, uniqueUsers }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";
  const type = searchParams.get("type") || "page";
  const slug = searchParams.get("slug");
  const wantResponse = searchParams.get("wantResponse") === "true";

  try {
    // Utiliser la fonction RPC pour récupérer les analytics
    const { data: analyticsData, error: rpcError } = await supabase.rpc(
      "get_page_analytics",
      {
        p_path: path,
        p_type: type,
        p_slug: slug,
      }
    );

    if (rpcError) {
      throw rpcError;
    }

    // La fonction RPC retourne un array, prendre le premier élément
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
  } catch (error: any) {
    logger.error("Error fetching analytics:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    const body = await req.json().catch(() => ({}));
    const {
      path = "/",
      type = "page",
      slug = null,
      details = null,
      wantResponse = true,
    } = body;

    const blockedIp: string[] = ["::1", "127.0.0.1"];
    const ipInfo = useGetIpInfo(blockedIp.includes(ip) ? "" : ip);

    // Utiliser la fonction RPC PostgreSQL pour tout gérer atomiquement
    const { data: analyticsData, error: rpcError } = await supabase.rpc(
      "increment_page_analytics",
      {
        p_path: path,
        p_type: type,
        p_slug: slug,
        p_user_ip: ip,
        p_details: { ...details, userInfo: ipInfo },
      }
    );

    if (rpcError) {
      throw rpcError;
    }

    // La fonction RPC retourne un array, prendre le premier élément
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
  } catch (error: any) {
    logger.error("Error incrementing analytics:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
