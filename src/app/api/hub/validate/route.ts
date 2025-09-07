import { NextRequest } from 'next/server'
import { brevoSendEmail } from '@/lib/brevo'
import { supabase } from "@/module/supabase/client";
import { renderEmail } from '@/lib/email'
import { ProductDeliveryEmail } from '@/emails/ProductDeliveryEmail'
import logger from "@/utils/logger";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    email,
    name,
    phone,
    productTitle,
    productType, // 'course' | 'ebook' | 'video'
    features,
    coverImage,
    productUrl,
    customText,
  }: {
    email: string;
    name?: string;
    phone?: string;
    productTitle: string;
    productType?: "course" | "ebook" | "video";
    features?: string[];
    coverImage?: string;
    productUrl?: string;
    customText?: string;
    subscribedFromPage?: string;
  } = body;

  if (!email || !productTitle) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: email, productTitle" }),
      { status: 400 }
    );
  }

  // Best-effort: ensure we have a user and capture its id
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
      logger.warn("upsert_user RPC failed in hub/validate", userErr);
    } else {
      userId = (userData as any)?.id ?? null;
    }
  } catch (e) {
    logger.warn("upsert_user RPC threw in hub/validate", e);
  }

  const html = renderEmail(
    ProductDeliveryEmail({
      name,
      productTitle,
      features,
      coverImage,
      productUrl,
      customText,
    })
  );

  try {
    // Store request in Supabase
    const { error: insertError } = await supabase
      .from("hub_product_requests")
      .insert([
        {
          email,
          name: name ?? null,
          phone: phone ?? null,
          product_title: productTitle,
          product_type: productType ?? null,
          features: features ?? null,
          cover_image: coverImage ?? null,
          product_url: productUrl ?? null,
          custom_text: customText ?? null,
          subscribed_from_page: body.subscribedFromPage ?? null,
          user_id: userId,
        },
      ] as any);

    if (insertError) {
      logger.error("Failed to store hub_product_request:", insertError);
    }

    await brevoSendEmail({
      toEmail: email,
      toName: name,
      subject: `Votre accès: ${productTitle}`,
      html,
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message || "Failed to send email" }),
      { status: 500 }
    );
  }
}
