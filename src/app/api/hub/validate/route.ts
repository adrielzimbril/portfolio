import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { ResourceType } from "@/types";
import { validateJwtToken, validateToken } from "@/utils";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    email,
    name,
    phone,
    productId: encryptedProductId,
    productTitle,
    productType,
    features,
    coverImage,
    productUrl,
    customText,
  }: {
    email: string;
    name?: string;
    phone?: string;
    productId?: string;
    productTitle: string;
    productType?: ResourceType;
    features?: string[];
    coverImage?: string;
    productUrl?: string;
    customText?: string;
    subscribedFromPage?: string;
  } = body;

  if (!email || !productTitle || !encryptedProductId) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields: email, productTitle, productId",
      }),
      { status: 400 }
    );
  }

  // Best-effort: ensure we have a user and capture its id
  let userId: string | null = null;
  const productId = validateJwtToken(encryptedProductId);
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

  try {
    // Centralized DB logic: add request via RPC (handles user linkage and field filling)
    const { error: rpcErr } = await (supabase as any).rpc(
      "add_hub_product_request",
      {
        p_user_id: userId,
        // Only pass contact when no user_id (optional; server will fill from user when provided)
        p_email: userId ? null : (email ?? null),
        p_name: userId ? null : (name ?? null),
        p_phone: userId ? null : (phone ?? null),
        p_product_title: productTitle,
        p_product_type: productType ?? null,
        p_features: (features as any) ?? null,
        p_cover_image: coverImage ?? null,
        p_product_url: productUrl ?? null,
        p_custom_text: customText ?? null,
        p_subscribed_from_page: body.subscribedFromPage ?? null,
      }
    );

    if (rpcErr) {
      logger.error("Failed to store hub_product_request via RPC:", rpcErr);
      return new Response(JSON.stringify({ error: rpcErr.message }), {
        status: 500,
      });
    }

    const sendMailResult = await sendEmail({
      to: [{ email, name }],
      context: {
        name,
        productTitle,
        features,
        coverImage,
        productUrl,
        customText,
      },
      templateId: "productDelivery",
      locale: "fr",
    });

    logger.info("Email sent successfully", sendMailResult);
    console.log("Email sent successfully", sendMailResult);

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
