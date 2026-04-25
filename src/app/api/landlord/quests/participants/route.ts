import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const type = searchParams.get("type"); // 'register' or 'submission'
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      100,
    );
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let allParticipants: any[] = [];
    let totalCount = 0;

    if (type === "register" || !type) {
      let query = supabase
        .from("challenge_registrations")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (slug) {
        query = query.eq("challenge_slug", slug);
      }

      if (type === "register") {
        query = query.range(from, to);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      
      allParticipants.push(...(data?.map(r => ({ ...r, type: "register" })) || []));
      totalCount += count || 0;
    }

    if (type === "submission" || !type) {
      let query = supabase
        .from("challenge_submissions")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (slug) {
        query = query.eq("challenge_slug", slug);
      }

      if (type === "submission") {
        query = query.range(from, to);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      allParticipants.push(...(data?.map(s => ({ ...s, type: "submission" })) || []));
      totalCount += count || 0;
    }

    // If no type specified, we can't easily paginate server-side across two tables 
    // without more complex logic. For now, we slice if no type.
    let rows = allParticipants;
    if (!type) {
      rows = allParticipants.slice((page - 1) * pageSize, page * pageSize);
    }

    return NextResponse.json({
      rows,
      participants: rows, // Keep for backward compatibility
      count: totalCount,
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
      message,
      challenge_slug,
      source,
      sendEmail,
      language,
    } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const meta = {
      source: source || "admin",
      silent_add: !sendEmail,
    };

    const { data, error } = await supabase
      .from("challenge_registrations")
      .insert({
        name,
        email,
        message,
        challenge_slug,
        meta,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ participant: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add participant" },
      { status: 500 },
    );
  }
}
