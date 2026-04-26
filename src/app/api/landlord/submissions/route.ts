import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/integrations/supabase/server";
import { logger } from "@/utils";

const TABLE = "submit_entries";
const SELECT = "id,name,email,url,intention,target,status,created_at";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(Math.max(Number(searchParams.get("pageSize") || 10), 1), 50);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error, count } = await supabase
      .from(TABLE)
      .select(SELECT, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      logger.error("[landlord/submissions] GET:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ rows: data || [], count: count || 0, page, pageSize });
  } catch (error) {
    logger.error("[landlord/submissions] GET catch:", error);
    return NextResponse.json({ error: "Failed to load submissions" }, { status: 500 });
  }
}
