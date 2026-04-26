import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { logger } from "@/utils/logger";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  logger.debug("[/api/auth/user] Attempting to get user from Supabase");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    logger.error("[/api/auth/user] Supabase auth error", {
      error: error.message,
      status: error.status,
      name: error.name,
    });
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  logger.debug("[/api/auth/user] Successfully retrieved user", {
    userId: user?.id,
    email: user?.email,
  });

  return NextResponse.json({ user });
}
