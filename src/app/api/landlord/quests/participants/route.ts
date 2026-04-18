import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("challenge_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (slug) {
      query = query.eq("challenge_slug", slug);
    }

    const { data: registrations, error: regError } = await query;

    let submissionsQuery = supabase
      .from("challenge_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (slug) {
      submissionsQuery = submissionsQuery.eq("challenge_slug", slug);
    }

    const { data: submissions, error: subError } = await submissionsQuery;

    const participants = [
      ...(registrations?.map((r: any) => ({
        ...r,
        type: "register" as const,
      })) || []),
      ...(submissions?.map((s: any) => ({
        ...s,
        type: "submission" as const,
      })) || []),
    ];

    return NextResponse.json({ participants });
  } catch (error) {
    return NextResponse.json({ participants: [] }, { status: 500 });
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
        language: language || "en",
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
