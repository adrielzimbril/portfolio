import { NextResponse } from "next/server";
import { backupSupabaseToS3 } from "@/integrations/backup";

/**
 * Cron endpoint for daily database backup
 * This endpoint is called by Vercel cron job daily
 * Protected by VERCEL_CRON_SECRET to prevent unauthorized access
 */
export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.VERCEL_CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "VERCEL_CRON_SECRET not configured" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Perform backup
  const result = await backupSupabaseToS3();

  if (result.success) {
    return NextResponse.json({ success: true, message: "Backup completed" });
  } else {
    return NextResponse.json(
      { error: result.error || "Backup failed" },
      { status: 500 },
    );
  }
}
