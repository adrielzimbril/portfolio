import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/config";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
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

    const { error } = await supabase
      .from("community_wall")
      .update({ language })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update language" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const cookieStore = await cookies();
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient(url!, anonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    });

    const { error } = await supabase
      .from("community_wall")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
