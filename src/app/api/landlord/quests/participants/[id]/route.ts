import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/config";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { language } = body;

    const cookieStore = await cookies();
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient(url!, anonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    });

    // Try to update in challenge_registrations first
    const { error: regError } = await supabase
      .from("challenge_registrations")
      .update({ language })
      .eq("id", id);

    // If not found in registrations, try submissions
    if (regError) {
      const { error: subError } = await supabase
        .from("challenge_submissions")
        .update({ language })
        .eq("id", id);

      if (subError) {
        return NextResponse.json({ error: subError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update language" }, { status: 500 });
  }
}
