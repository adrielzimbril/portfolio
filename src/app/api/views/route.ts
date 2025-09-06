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

  try {
    // Récupérer le compteur total de vues
    const counterQuery = supabase
      .from("page_counters")
      .select("total_views")
      .eq("path", path)
      .eq("type", type);

    if (slug) {
      counterQuery.eq("slug", slug);
    } else {
      counterQuery.is("slug", null);
    }

    const { data: counterData, error: counterError } =
      await counterQuery.maybeSingle();

    if (counterError && counterError.code !== "PGRST116") {
      throw counterError;
    }

    // Compter le nombre d'utilisateurs uniques
    const uniqueQuery = supabase
      .from("unique_views")
      .select("user_ip", { count: "exact", head: true })
      .eq("path", path)
      .eq("type", type);

    if (slug) {
      uniqueQuery.eq("slug", slug);
    } else {
      uniqueQuery.is("slug", null);
    }

    const { count: uniqueUsersCount, error: uniqueError } = await uniqueQuery;

    if (uniqueError) {
      throw uniqueError;
    }

    const totalViews = counterData?.total_views ?? 0;
    const uniqueUsers = uniqueUsersCount ?? 0;

    return new Response(
      JSON.stringify({
        totalViews,
        uniqueUsers,
        path,
        type,
        slug,
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
    const { path = "/", type = "page", slug = null, details = null } = body;

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
      JSON.stringify({
        totalViews: result.total_views,
        uniqueUsers: result.unique_users,
        userViewCount: result.user_view_count,
        isNewUniqueUser: result.is_new_unique_user,
        path,
        type,
        slug,
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
