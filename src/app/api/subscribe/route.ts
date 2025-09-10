import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { addContact } from "@/module/contact";
import { ContactProvider } from "@/module/contact/types/types";
import {
  getResourcesUrl,
  validateJwtToken,
  validateSimpleClientToken,
  validateToken,
} from "@/utils";
import { getAllResources, getResourceById } from "@/module/content/utils/lib";
import { PageType, ResourceType } from "@/types";

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
    productId: productIdToken,
    productType,
    subscribedFromPage,
    updateExisting,
  }: {
    email: string;
    name?: string;
    phone?: string;
    productId?: string;
    productType?: "course" | "ebook" | "video";
    subscribedFromPage?: string;
    updateExisting?: boolean;
  } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  // Link or create the user record first (users table)
  let userId: string | undefined;
  // search user by email
  const { data: existingUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  const alreadyExists = Boolean(existingUser?.length > 0);

  if (!alreadyExists) {
    try {
      const { data: userData, error: userErr } = await supabase.rpc(
        "upsert_user",
        {
          p_name: name ?? "",
          p_email: email ?? undefined,
          p_phone: phone ?? "",
        }
      );

      if (userErr) {
        logger.warn(
          "upsert_user RPC failed, continuing without user link",
          userErr
        );
      } else {
        // Supabase returns a single row for this RPC
        userId = (userData as any)?.id;
      }
    } catch (e) {
      userId = undefined;
      logger.warn("upsert_user RPC threw, continuing without user link", e);
    }

    if (!userId) {
      return new Response(
        JSON.stringify({
          error: "User creation failed",
          statusText: "Step before 1 failed",
        }),
        {
          status: 500,
        }
      );
    }
  }
  // Centralized DB logic: add or update via RPC (handles user linkage and dedupe)
  const { data: subscriptionData, error: addErr } = await supabase.rpc(
    "add_newsletter_subscriber",
    {
      p_user_id: userId,
      p_email: email,
      p_name: name,
      p_phone: phone,
      p_subscribed_from_page: JSON.stringify({
        origin: req.headers.get("origin"),
        referer: req.headers.get("referer"),
        url: req.url,
      }),
    }
  );

  if (addErr) {
    return new Response(JSON.stringify({ error: addErr.message }), {
      status: 500,
    });
  }

  // Send welcome email only for first-time subscribers
  if (!alreadyExists) {
    logger.info("Sending welcome email", { email, name });
    try {
      await sendEmail({
        to: [{ email, name }],
        context: { name },
        templateId: "welcome",
        locale: "en",
      });
    } catch (e) {
      logger.warn("Welcome email send failed:", e);
    }
  }

  if (productIdToken) {
    const productId = validateSimpleClientToken(productIdToken);
    const productData = await getResourceById(productId.payload?.id);
    if (productData) {
      const { title, features, cover, slug, type } = productData;
      const productUrl = getResourcesUrl(PageType.HUB, slug);
      const customText = undefined;

      try {
        const { error: rpcErr } = await supabase.rpc(
          "add_hub_product_request",
          {
            p_user_id: userId,
            p_email: email,
            p_name: name,
            p_phone: phone,
            p_product_title: title,
            p_product_type: type,
            p_features: features,
            p_cover_image: cover,
            p_product_url: productUrl,
            p_custom_text: customText,
            p_subscribed_from_page: body.subscribedFromPage,
          }
        );

        rpcErr &&
          logger.error("Failed to store hub_product_request via RPC:", rpcErr);
      } catch (e: any) {
        logger.error("Failed to store hub_product_request via RPC:", e);
      }

      try {
        await sendEmail({
          to: [{ email, name }],
          context: {
            name,
            productTitle: title,
            features,
            coverImage: cover,
            productUrl,
            customText,
          },
          templateId: "productDelivery",
          locale: "en",
        });
      } catch (e) {
        logger.warn("Product delivery email send failed:", e);
      }
    }
  }

  // 2) Add to Brevo lists (general + product-specific)
  const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);
  const productTypeId = Number(process.env.BREVO_PRODUCT_LIST_ID);

  const listIds = [generalId, productTypeId].filter(
    (n): n is number => !!n && !Number.isNaN(n)
  );

  try {
    if (listIds.length > 0) {
      await addContact({
        email,
        firstName: name ?? undefined,
        phone: phone ?? undefined,
        listIds,
        provider: ContactProvider.BREVO,
      });
    }
  } catch (e: any) {
    // Do not fail the flow if Brevo fails
    logger.warn("Brevo add contact error server:", e?.message || e);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
