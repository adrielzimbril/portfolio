import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/integrations/supabase/server";
import { logger } from "@/utils";

const TABLE = "hub_product_requests_with_user";
const SELECT =
  "id,user_id,name,email,phone,product_title,product_type,product_url,subscribed_from_page,created_at";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(Math.max(Number(searchParams.get("pageSize") || 10), 1), 50);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const fromRelation = supabase.from.bind(supabase) as (relation: string) => any;

    const { data, error, count } = await fromRelation(TABLE)
      .select(SELECT, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      logger.error("[landlord/hub-requests] GET:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ rows: data || [], count: count || 0, page, pageSize });
  } catch (error) {
    logger.error("[landlord/hub-requests] GET catch:", error);
    return NextResponse.json({ error: "Failed to load hub requests" }, { status: 500 });
  }
}
