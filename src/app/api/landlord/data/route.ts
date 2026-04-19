import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/integrations/supabase/server";

const allowedTables = {
  users: {
    label: "Users",
    table: "users",
    select: "id,name,email,phone,created_at,updated_at",
    orderBy: "created_at",
  },
  newsletter: {
    label: "Newsletter",
    table: "newsletter_subscribers_with_user",
    select: "id,user_id,name,email,phone,subscribed_from_page,created_at",
    orderBy: "created_at",
  },
  submissions: {
    label: "Submissions",
    table: "submit_entries",
    select: "id,name,email,url,intention,target,status,created_at",
    orderBy: "created_at",
  },
  hubRequests: {
    label: "Hub requests",
    table: "hub_product_requests_with_user",
    select:
      "id,user_id,name,email,phone,product_title,product_type,product_url,subscribed_from_page,created_at",
    orderBy: "created_at",
  },
  reactions: {
    label: "Reactions",
    table: "reactions",
    select: "id,page_type,entity_id,reaction_type,user_id,anonymous_id,created_at",
    orderBy: "created_at",
  },
} as const;

type TableKey = keyof typeof allowedTables;

function isTableKey(value: string | null): value is TableKey {
  return Boolean(value && value in allowedTables);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedTable = searchParams.get("table");
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      50,
    );

    if (!isTableKey(requestedTable)) {
      return NextResponse.json(
        { error: "Unsupported landlord table" },
        { status: 400 },
      );
    }

    const config = allowedTables[requestedTable];
    const tableName = config.table;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const fromRelation = supabase.from.bind(supabase) as (
      relation: string,
    ) => any;

    const { data, error, count } = await fromRelation(tableName)
      .select(config.select, { count: "exact" })
      .order(config.orderBy, { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      rows: data || [],
      count: count || 0,
      page,
      pageSize,
      table: requestedTable,
      label: config.label,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load landlord table" },
      { status: 500 },
    );
  }
}
