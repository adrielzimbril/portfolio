import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import logger from "@/utils/logger";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("challenge_submissions")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      logger.error(`Failed to update submission ${id}`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    logger.error(`PATCH submission ${id} failed`, error);
    return NextResponse.json(
      { error: "Failed to update submission" },
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
      .from("challenge_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      logger.error(`Failed to delete submission ${id}`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(`DELETE submission ${id} failed`, error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 },
    );
  }
}
