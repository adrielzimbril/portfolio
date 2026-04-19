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
    const { messages, creator_name, creator_avatar_url } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const updateData: any = {};
    if (messages !== undefined) updateData.message = messages;
    if (creator_name !== undefined) updateData.creator_name = creator_name;
    if (creator_avatar_url !== undefined)
      updateData.creator_avatar_url = creator_avatar_url;

    const { error } = await supabase
      .from("community_wall")
      .update(updateData)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de mettre à jour le message" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

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
