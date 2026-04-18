import { getImageUrl } from "@/utils/base-url";
import { NextRequest } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import logger from "@/utils/logger";
import { sendEmail } from "@/integrations/mail";
import { addContact } from "@/integrations/contact";
import { ContactProvider } from "@/integrations/contact/types/types";
import { getResourcesUrl, validateSimpleClientToken } from "@/utils";
import { getResourceById } from "@/integrations/content/lib";
import { Locale, PageType, ResourceType } from "@/types";
import {
  AllUserResourceSlug,
  getResourceUserUrl,
} from "@/config/resources.config";
import { getBrevoConfig } from "@/config";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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
        { error: e },
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
        { error: e },
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
        e,
      );
    }
  }

  if (productIdToken) {
    const productId = validateSimpleClientToken(productIdToken).payload?.id;
    const productData = await getResourceById(productId);
    if (productData) {
      const { title, features, cover, slug, type } = productData;
      const productUrl = getResourcesUrl(PageType.HUB, slug);
      const productEndUrl = getResourceUserUrl(slug as AllUserResourceSlug);
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
            cover_image: getImageUrl(cover || ""),
            product_url: slug,
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
            (e as Error)?.message || e,
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
              coverImage: getImageUrl(cover || ""),
              productUrl: productEndUrl || productUrl,
              productType: type,
              customText,
            },
            templateId: "productDelivery",
            locale: locale,
          });
        } catch (e: unknown) {
          logger.warn(
            `Product delivery email send failed for user ${userId} - ${email}:`,
            (e as Error)?.message || e,
          );
        }
      }
    }
  }

  // 2) Add to Brevo lists (general + product-specific)
  const brevoConfig = getBrevoConfig();
  const generalId = Number(brevoConfig.generalListId);

  function getListIdByProduct(product?: ResourceType) {
    const map: Record<ResourceType, number | undefined> = {
      course: Number(brevoConfig.courseListId),
      ebook: Number(brevoConfig.ebooksListId),
      video: Number(brevoConfig.videoListId),
      masterclass: Number(brevoConfig.masterclassListId),
      figma_template: Number(brevoConfig.figmaTemplateListId),
      code: Number(brevoConfig.codeListId),
    };
    return product ? map[product] : undefined;
  }

  const productTypeId = getListIdByProduct(productType);

  const listIds = [generalId, productTypeId].filter(
    (n): n is number => !!n && !Number.isNaN(n),
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
      (e as Error)?.message || e,
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
