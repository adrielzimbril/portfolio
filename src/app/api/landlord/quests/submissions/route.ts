import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      100,
    );
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("challenge_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (slug) {
      query = query.eq("challenge_slug", slug);
    }

    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      rows: data || [],
      count: count || 0,
      page,
      pageSize,
    });
  } catch (error) {
    return NextResponse.json({ rows: [], count: 0 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      work_url,
      challenge_slug,
      source,
    } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const meta = {
      source: source || "admin",
    };

    const { data, error } = await supabase
      .from("challenge_submissions")
      .insert({
        name,
        email,
        work_url,
        challenge_slug,
        meta,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submission: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add submission" },
      { status: 500 },
    );
  }
}
