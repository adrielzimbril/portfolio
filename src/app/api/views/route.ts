import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import { useGetIpInfo } from "@/hooks/useIpInfo";
import logger from "@/utils/logger";

// Structure des tables:
// 1. page_counters: { id, path, type, slug, total_views, created_at, updated_at }
// 2. unique_views: { id, user_ip, path, type, slug, first_view_at, last_view_at, view_count, details }

// API: GET ?path=/some/path -> returns { totalViews, uniqueUsers }
//      POST { path } -> increments and returns { totalViews, uniqueUsers }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";
  const type = searchParams.get("type") || "page";
  const slug = searchParams.get("slug");

  try {
    // Récupérer le compteur total de vues
    const { data: counterData, error: counterError } = await supabase
      .from("page_counters")
      .select("total_views")
      .eq("path", path)
      .eq("type", type)
      .eq("slug", slug)
      .maybeSingle();

    if (counterError && counterError.code !== "PGRST116") {
      throw counterError;
    }

    // Compter le nombre d'utilisateurs uniques
    const { count: uniqueUsersCount, error: uniqueError } = await supabase
      .from("unique_views")
      .select("user_ip", { count: "exact", head: true })
      .eq("path", path)
      .eq("type", type)
      .eq("slug", slug);

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
  const now = new Date().toISOString();
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    const body = await req.json().catch(() => ({}));
    const { path = "/", type = "page", slug = null, details = null } = body;

    const blockedIp: string[] = ["::1", "127.0.0.1"];
    const ipInfo = useGetIpInfo(blockedIp.includes(ip) ? "" : ip);

    let isNewUniqueUser = false;

    // 1. Incrémenter le compteur total de vues
    const { data: existingCounter } = await supabase
      .from("page_counters")
      .select("total_views")
      .eq("path", path)
      .eq("type", type)
      .eq("slug", slug)
      .maybeSingle();

    const newTotalViews = (existingCounter?.total_views ?? 0) + 1;

    const { error: counterError } = await supabase
      .from("page_counters")
      .upsert({
        path,
        type,
        slug,
        total_views: newTotalViews,
        updated_at: now,
      });

    if (counterError) {
      throw counterError;
    }

    // 2. Gérer la vue unique par utilisateur
    const { data: existingUserView } = await supabase
      .from("unique_views")
      .select("view_count")
      .eq("user_ip", ip)
      .eq("path", path)
      .eq("type", type)
      .eq("slug", slug)
      .maybeSingle();

    if (existingUserView) {
      // Utilisateur existant - mettre à jour sa dernière vue
      const { error: updateError } = await supabase
        .from("unique_views")
        .update({
          last_view_at: now,
          view_count: existingUserView.view_count + 1,
          details: { ...details, userInfo: ipInfo },
        })
        .eq("user_ip", ip)
        .eq("path", path)
        .eq("type", type)
        .eq("slug", slug);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Nouvel utilisateur unique
      isNewUniqueUser = true;
      const { error: insertError } = await supabase
        .from("unique_views")
        .insert({
          user_ip: ip,
          path,
          type,
          slug,
          first_view_at: now,
          last_view_at: now,
          view_count: 1,
          details: { ...details, userInfo: ipInfo },
        });

      if (insertError) {
        throw insertError;
      }
    }

    // 3. Récupérer le nombre total d'utilisateurs uniques
    const { count: uniqueUsersCount } = await supabase
      .from("unique_views")
      .select("user_ip", { count: "exact", head: true })
      .eq("path", path)
      .eq("type", type)
      .eq("slug", slug);

    return new Response(
      JSON.stringify({
        totalViews: newTotalViews,
        uniqueUsers: uniqueUsersCount ?? 1,
        path,
        type,
        slug,
        isNewUniqueUser,
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
