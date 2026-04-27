import { NextResponse } from "next/server";
import logger from "@/utils/logger";

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.VERCEL_CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    logger.info("Starting Supabase health check via Vercel Cron...");

    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/views`;

    logger.info("Fetching health check API", { url });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBot: true }),
    });

    const result = await response.json();

    logger.info("Health check API response", { result });

    logger.info("Health check successful:", {
      status: "success",
      dataCount: result.dataCount,
      timestamp: result.timestamp,
    });

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    logger.error("Supabase health check failed", { error });

    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
