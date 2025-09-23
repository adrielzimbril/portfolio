import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { appConfig } from "@/data/app-config";
import { Locale } from "@/types";
import { addContact, ContactProvider } from "@/module/contact";

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
      locale,
    }: {
      intention?: string;
      name?: string;
      email?: string;
      url?: string;
      description?: string;
      target?: string;
      locale?: Locale;
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

    // Link or create the user record first (users table)
    let userId: string | undefined;
    // search user by email
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);
    const existingUserData = existingUser?.[0];
    const alreadyExists = Boolean(existingUserData);

    if (!alreadyExists) {
      try {
        const { data: userData } = await supabase.rpc("upsert_user", {
          p_name: name ?? "",
          p_email: email ?? undefined,
          p_phone: "",
        });
        // Supabase returns a single row for this RPC
        userId = userData!.id;
      } catch (e) {
        logger.warn("upsert_user RPC threw, continuing without user link", e);
      }
    } else if (existingUserData) {
      userId = existingUserData.id;
    }
    // Centralized DB logic: add or update via RPC (handles user linkage and dedupe)
    // logger.info("Adding newsletter subscriber", { email, name, phone });

    if (!alreadyExists && userId) {
      try {
        await supabase.from("newsletter_subscribers").insert({
          created_at: new Date().toISOString(),
          user_id: userId,
          subscribed_from_page: JSON.stringify({
            path: meta.url,
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          }),
          updateexisting: alreadyExists,
        });
      } catch (e) {
        logger.error(
          `Failed to add newsletter subscriber for user ${userId} - ${email}`,
          { error: e }
        );
      }
    } else {
      try {
        await supabase.from("newsletter_subscribers").update({
          updateexisting: alreadyExists,
        });
      } catch (e) {
        logger.error(
          `Failed to add newsletter subscriber for user ${userId} - ${email}`,
          { error: e }
        );
      }
    }

    const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);

    try {
      if (generalId) {
        await addContact({
          email,
          firstName: name ?? undefined,
          phone: "",
          listIds: [generalId],
          provider: ContactProvider.BREVO,
        });
      }
    } catch (e: unknown) {
      // Do not fail the flow if Brevo fails
      logger.warn(
        `Brevo add contact error for user ${userId} - ${email}:`,
        (e as Error)?.message || e
      );
    }

    // Store to Supabase
    const { error: dbError } = await supabase.from("submit_entries").insert({
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
    });

    if (dbError) {
      logger.error("submit_entries insert failed", dbError);
      return new Response(
        JSON.stringify({ error: "DB_ERROR", details: dbError.message }),
        {
          status: 500,
        }
      );
    }

    // Send admin notification
    const adminTo = [{ email: appConfig.contactForm.to }];
    await sendEmail({
      to: adminTo,
      templateId: "submitAdminNotification",
      context: {
        name,
        email,
        intention,
        url,
        description,
        target,
      },
    });

    // Send user confirmation
    await sendEmail({
      to: [{ email, name }],
      locale,
      templateId: "submitUserConfirmation",
      context: {
        name,
        intention,
        url,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    logger.error("/api/submit failed", (e as Error)?.message || e);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
