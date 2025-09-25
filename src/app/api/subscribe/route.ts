import { getImageUrl } from "@/utils/base-url";
import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { addContact } from "@/module/contact";
import { ContactProvider } from "@/module/contact/types/types";
import { getResourcesUrl, validateSimpleClientToken } from "@/utils";
import { getResourceById } from "@/module/content/utils/lib";
import { Locale, PageType, ResourceType } from "@/types";

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
    locale,
  }: {
    email: string;
    name?: string;
    phone?: string;
    productId?: string;
    productType?: ResourceType;
    subscribedFromPage?: string;
    updateExisting?: boolean;
    locale?: Locale;
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
    .eq("email", email)
    .limit(1);
  const existingUserData = existingUser?.[0];
  const alreadyExists = Boolean(existingUserData);

  if (!alreadyExists) {
    try {
      const { data: userData } = await supabase.rpc("upsert_user", {
        p_name: name ?? "",
        p_email: email ?? undefined,
        p_phone: phone ?? "",
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
          path: subscribedFromPage,
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

  // Send welcome email only for first-time subscribers
  if (!alreadyExists && !updateExisting) {
    try {
      await sendEmail({
        to: [{ email, name }],
        context: { name },
        templateId: "welcome",
        locale: locale,
      });
    } catch (e) {
      logger.warn(
        `Welcome email send failed for user ${userId} - ${email}:`,
        e
      );
    }
  } else {
    await sendEmail({
      to: [{ email, name }],
      context: { name },
      templateId: "newsletterSignup",
      locale: locale,
    });
  }

  if (productIdToken) {
    const productId = validateSimpleClientToken(productIdToken).payload?.id;
    const productData = await getResourceById(productId);
    if (productData) {
      const { title, features, cover, slug, type } = productData;
      const productUrl = getResourcesUrl(PageType.HUB, slug);
      const productEndUrl = getResourcesUrl(PageType.HUB, slug);
      const customText = undefined;

      if (userId) {
        try {
          await supabase.from("hub_product_requests").insert({
            user_id: userId,
            product_id: productId,
            product_title: title,
            product_type: type,
            requested_at: new Date().toISOString(),
            features: features,
            cover: getImageUrl(cover || ""),
            product_url: productUrl,
            custom_text: customText,
            subscribed_from_page: JSON.stringify({
              path: subscribedFromPage,
              origin: req.headers.get("origin"),
              referer: req.headers.get("referer"),
              url: req.url,
            }),
          });
        } catch (e: unknown) {
          logger.error(
            `Failed: error caught to store hub_product_request for user ${userId} - ${email} via RPC:`,
            (e as Error)?.message || e
          );
        }
      }

      if (updateExisting) {
        try {
          await sendEmail({
            to: [{ email, name }],
            context: {
              name,
              productTitle: title,
              features,
              coverImage: cover,
              productUrl,
              productType: type,
              customText,
            },
            templateId: "productDelivery",
            locale: locale,
          });
        } catch (e: unknown) {
          logger.warn(
            `Product delivery email send failed for user ${userId} - ${email}:`,
            (e as Error)?.message || e
          );
        }
      }
    }
  }

  // 2) Add to Brevo lists (general + product-specific)
  const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);

  function getListIdByProduct(product?: ResourceType) {
    const map: Record<ResourceType, number | undefined> = {
      course: Number(process.env.BREVO_COURSE_LIST_ID),
      ebook: Number(process.env.BREVO_EBOOKS_LIST_ID),
      video: Number(process.env.BREVO_VIDEO_LIST_ID),
      masterclass: Number(process.env.BREVO_MASTERCLASS_LIST_ID),
      figma_template: Number(process.env.BREVO_FIGMA_TEMPLATE_LIST_ID),
      code: Number(process.env.BREVO_CODE_LIST_ID),
    };
    return product ? map[product] : undefined;
  }

  const productTypeId = getListIdByProduct(productType);

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
  } catch (e: unknown) {
    // Do not fail the flow if Brevo fails
    logger.warn(
      `Brevo add contact error for user ${userId} - ${email}:`,
      (e as Error)?.message || e
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
