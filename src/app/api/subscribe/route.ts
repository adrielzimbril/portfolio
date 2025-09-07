import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";
import { brevoAddContact } from '@/lib/brevo'
import { brevoSendEmail } from '@/lib/brevo'
import { renderEmail } from '@/lib/email'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
import logger from "@/utils/logger";

function getListIdByProduct(product?: string) {
  const map: Record<string, number | undefined> = {
    course: Number(process.env.BREVO_COURSE_LIST_ID),
    ebook: Number(process.env.BREVO_EBOOKS_LIST_ID),
    video: Number(process.env.BREVO_VIDEO_LIST_ID),
  };
  return product ? map[product] : undefined;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    email,
    name,
    phone,
    productType,
    subscribedFromPage,
  }: {
    email: string;
    name?: string;
    phone?: string;
    productType?: "course" | "ebook" | "video";
    subscribedFromPage?: string;
  } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  // Link or create the user record first (users table)
  let userId: string | null = null;
  try {
    const { data: userData, error: userErr } = await (supabase as any).rpc(
      "upsert_user",
      {
        p_name: name ?? null,
        p_email: email ?? null,
        p_phone: phone ?? null,
      }
    );
    if (userErr) {
      logger.warn("upsert_user RPC failed, continuing without user link", userErr);
    } else {
      // Supabase returns a single row for this RPC
      userId = (userData as any)?.id ?? null;
    }
  } catch (e) {
    logger.warn("upsert_user RPC threw, continuing without user link", e);
  }

  // 1) Check if subscriber already exists
  const { data: existing, error: findError } = await supabase
    .from("newsletter_subscribers")
    .select("id, email")
    .eq("email", email)
    .maybeSingle();

  if (findError) {
    return new Response(JSON.stringify({ error: findError.message }), {
      status: 500,
    });
  }

  const alreadyExists = !!existing;

  // Centralized DB logic: add or update via RPC (handles user linkage and dedupe)
  const { error: addErr } = await (supabase as any).rpc(
    "add_newsletter_subscriber",
    {
      p_user_id: userId,
      // If a user_id is present, we don't need to pass contact info; DB will fill from users
      p_email: userId ? null : email ?? null,
      p_name: userId ? null : name ?? null,
      p_phone: userId ? null : phone ?? null,
      p_subscribed_from_page: subscribedFromPage ?? null,
    }
  );

  if (addErr) {
    return new Response(JSON.stringify({ error: addErr.message }), {
      status: 500,
    });
  }

  // Send welcome email only for first-time subscribers
  if (!alreadyExists) {
    try {
      const html = renderEmail(WelcomeEmail({ name }));
      await brevoSendEmail({
        toEmail: email,
        toName: name,
        subject: "Bienvenue 🎁",
        html,
      });
    } catch (e) {
      logger.warn("Welcome email send failed:", e);
    }
  }

  // 2) Add to Brevo lists (general + product-specific)
  const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);
  const productId = getListIdByProduct(productType);
  const listIds = [generalId, productId].filter(
    (n): n is number => !!n && !Number.isNaN(n)
  );

  try {
    if (listIds.length > 0) {
      await brevoAddContact({ email, firstName: name, phone, listIds });
    }
  } catch (e: any) {
    // Do not fail the flow if Brevo fails
    logger.warn("Brevo add contact error:", e?.message || e);
  }

  return new Response(JSON.stringify({ success: true, alreadyExists }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
