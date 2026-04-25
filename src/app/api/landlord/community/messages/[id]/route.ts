import { NextResponse } from "next/server";
import {
  createClient,
  createAdminClient,
} from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import logger from "@/utils/logger";
import { ConfigValue } from "@/config";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { message, creator_name, creator_avatar_url } = body;

    logger.info("PATCH message request:", { id, body });

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    logger.info("Auth check:", { user: user?.id, authError });

    // Check if user is admin
    const adminEmails =
      ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",").map((e) => e.trim()) ||
      [];
    const isAdmin = user?.email && adminEmails.includes(user.email);
    logger.info("Admin check:", {
      userEmail: user?.email,
      adminEmails,
      isAdmin,
    });

    // Use admin client if user is admin, otherwise use regular client
    const client = isAdmin ? createAdminClient() : supabase;

    // Fetch existing message to check user_id
    const { data: existingMessage, error: fetchError } = await client
      .from("community_wall")
      .select("id, user_id, creator_name")
      .eq("id", id)
      .single();

    logger.info("Existing message:", { existingMessage, fetchError });

    const updateData: any = {};
    if (message !== undefined) updateData.message = message;
    if (creator_name !== undefined) updateData.creator_name = creator_name;
    if (creator_avatar_url !== undefined)
      updateData.creator_avatar_url = creator_avatar_url;

    logger.info("Update data:", updateData);

    const { data, error } = await client
      .from("community_wall")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      logger.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      logger.warn("No rows updated for id:", id, data);
      return NextResponse.json(
        { error: "Message not found or no changes made" },
        { status: 404 },
      );
    }

    logger.info("Update successful:", data);
    return NextResponse.json({ success: true, message: data[0] });
  } catch (error) {
    logger.error("PATCH request error:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
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
