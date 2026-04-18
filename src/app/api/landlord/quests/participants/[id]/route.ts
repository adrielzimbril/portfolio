import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { language } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Try to update in challenge_registrations first
    const { error: regError } = await supabase
      .from("challenge_registrations")
      .update({})
      .eq("id", id);

    // If not found in registrations, try submissions
    if (regError) {
      const { error: subError } = await supabase
        .from("challenge_submissions")
        .update({})
        .eq("id", id);

      if (subError) {
        return NextResponse.json({ error: subError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update language" },
      { status: 500 },
    );
  }
}
