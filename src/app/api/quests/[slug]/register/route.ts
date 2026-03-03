import { NextRequest } from "next/server";
import { z } from "zod";
import { appConfig } from "@/data/app-config";
import {
  getQuestBySlug,
  isRegistrationClosed,
} from "@/module/content/utils/lib/quests";
import { addContact, ContactProvider } from "@/module/contact";
import { sendEmail } from "@/module/mail";
import { supabase } from "@/module/supabase/client";
import { Locale } from "@/types";
import logger from "@/utils/logger";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().max(1200).optional(),
  locale: z.nativeEnum(Locale).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = supabase as any;
    const { slug } = await params;
    const quest = await getQuestBySlug(slug);

    if (!quest) {
      return new Response(JSON.stringify({ error: "QUEST_NOT_FOUND" }), {
        status: 404,
      });
    }

    if (isRegistrationClosed(quest.registration_deadline)) {
      return new Response(JSON.stringify({ error: "QUEST_REGISTRATION_CLOSED" }), {
        status: 400,
      });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "INVALID_INPUT" }), {
        status: 400,
      });
    }

    const { name, email, message, locale } = parsed.data;
    const ipHeader = req.headers.get("x-forwarded-for");
    const ip = ipHeader ? ipHeader.split(",")[0]?.trim() : undefined;

    let userId: string | undefined;
    const { data: existingUser } = await db
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    const existingUserData = existingUser?.[0];
    if (!existingUserData) {
      const { data: userData } = await db.rpc("upsert_user", {
        p_name: name,
        p_email: email,
        p_phone: "",
      });
      userId = userData?.id;
    } else {
      userId = existingUserData.id;
    }

    if (!userId) {
      logger.error("quest register: missing user_id after upsert_user", {
        email,
        slug,
      });
      return new Response(JSON.stringify({ error: "USER_UPSERT_FAILED" }), {
        status: 500,
      });
    }

    const { error: registrationError } = await db
      .from("challenge_registrations")
      .upsert(
        {
          challenge_slug: slug,
          user_id: userId ?? null,
          name,
          email,
          message: message || null,
          ip: ip ?? null,
          meta: {
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          },
        },
        { onConflict: "challenge_slug,email" },
      );

    if (registrationError) {
      logger.error("quest_registrations upsert failed", registrationError);
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    const { error: newsletterError } = await db
      .from("newsletter_subscribers")
      .upsert(
      {
        user_id: userId,
        subscribed_from_page: JSON.stringify({
          path: `/quests/${slug}/register`,
          origin: req.headers.get("origin"),
          referer: req.headers.get("referer"),
          url: req.url,
        }),
        updateexisting: Boolean(existingUserData),
      },
      { onConflict: "user_id" }
    );

    if (newsletterError) {
      logger.error("quest register newsletter upsert failed", newsletterError);
      return new Response(JSON.stringify({ error: "NEWSLETTER_DB_ERROR" }), {
        status: 500,
      });
    }

    const globalListId = Number(process.env.BREVO_GENERAL_LIST_ID);
    const registerListId = Number(process.env.BREVO_QUESTS_REGISTER_ID);
    const listIds = [globalListId, registerListId].filter(
      (id): id is number => Boolean(id) && !Number.isNaN(id)
    );

    if (listIds.length > 0) {
      await addContact({
        email,
        firstName: name,
        listIds,
        provider: ContactProvider.BREVO,
      });
    }

    const userMailSent = await sendEmail({
      to: [{ email, name }],
      locale,
      templateId: "questRegisterUserConfirmation",
      context: {
        name,
        questTitle: quest.title,
      },
    });

    const adminMailSent = await sendEmail({
      to: [{ email: appConfig.contactForm.to }],
      locale,
      templateId: "questRegisterAdminNotification",
      context: {
        name,
        email,
        questTitle: quest.title,
        questSlug: slug,
        message: message || undefined,
      },
    });

    if (!userMailSent || !adminMailSent) {
      return new Response(JSON.stringify({ error: "MAIL_SEND_FAILED" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("/api/quests/[slug]/register failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
