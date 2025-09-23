import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { appConfig } from "@/data/app-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      intention,
      name,
      email,
      url,
      description,
      target,
    }: {
      intention?: string;
      name?: string;
      email?: string;
      url?: string;
      description?: string;
      target?: string;
    } = body || {};

    // Basic validation (server-side)
    if (!intention || !name || !email || !url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Prepare meta from request
    const ipHeader = req.headers.get("x-forwarded-for");
    const ip = ipHeader ? ipHeader.split(",")[0]?.trim() : undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const meta = {
      referer: req.headers.get("referer"),
      origin: req.headers.get("origin"),
      url: req.url,
    } as const;

    // Store to Supabase
    const { error: dbError } = await supabase.from("submit_entries" as any).insert({
      intention,
      name,
      email,
      url,
      description,
      target,
      meta,
      ip,
      user_agent: userAgent,
      status: "received",
      created_at: new Date().toISOString(),
    } as any);

    if (dbError) {
      logger.error("submit_entries insert failed", dbError);
      return new Response(JSON.stringify({ error: "DB_ERROR", details: dbError.message }), {
        status: 500,
      });
    }

    // Send admin notification
    const adminTo = [{ email: appConfig.contactForm.to }];
    await sendEmail({
      to: adminTo,
      templateId: "submitAdminNotification" as any,
      context: {
        name,
        email,
        intention,
        url,
        description,
        target,
      } as any,
      locale: "fr",
    });

    // Send user confirmation
    await sendEmail({
      to: [{ email, name }],
      templateId: "submitUserConfirmation" as any,
      context: {
        name,
        intention,
        url,
      } as any,
      locale: "fr",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    logger.error("/api/submit failed", e);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
