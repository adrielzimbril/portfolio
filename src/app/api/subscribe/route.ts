import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";
import { sendEmail } from "@/module/mail";
import { addContact } from "@/module/contact";
import { ContactProvider } from "@/module/contact/types/types";

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
  let userId: string | undefined;
  // search user by email
  const { data: existingUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  const alreadyExists = Boolean(existingUser?.length > 0);
  logger.info("User find result", {
    email,
    alreadyExists,
    findError,
    existingUser,
  });

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
    "create_newsletter_subscription",
    {
      p_email: email,
      p_name: name,
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

  // 2) Add to Brevo lists (general + product-specific)
  const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);
  const productId = getListIdByProduct(productType);
  const listIds = [generalId, productId].filter(
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
