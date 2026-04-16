import { NextRequest } from "next/server";
import { z } from "zod";
import { appConfig } from "@/data/app-config";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/integrations/content/lib/quests";
import { sendEmail } from "@/integrations/mail";
import { supabase } from "@/integrations/supabase/client";
import { addContact, ContactProvider } from "@/integrations/contact";
import { Locale, PageType } from "@/types";
import logger from "@/utils/logger";
import { getResourcesUrl } from "@/utils/base-url";
import { getBrevoConfig } from "@/config";

const submitSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  workUrl: z.url(),
  message: z.string().max(1500).optional(),
  locale: z.nativeEnum(Locale).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const db = supabase as any;
    const { slug } = await params;
    const quest = await getQuestBySlug(slug);
    const challengeUrl = getResourcesUrl(PageType.QUESTS, slug);

    if (!quest) {
      return new Response(JSON.stringify({ error: "QUEST_NOT_FOUND" }), {
        status: 404,
      });
    }

    if (isSubmissionClosed(quest.submission_deadline, quest.quest_end)) {
      return new Response(
        JSON.stringify({ error: "QUEST_SUBMISSION_CLOSED" }),
        {
          status: 400,
        },
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "INVALID_INPUT" }), {
        status: 400,
      });
    }

    const { name, email, workUrl, message, locale } = parsed.data;

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
      logger.error("quest submit: missing user_id after upsert_user", {
        email,
        slug,
      });
      return new Response(JSON.stringify({ error: "USER_UPSERT_FAILED" }), {
        status: 500,
      });
    }

    const { error: submissionError } = await db
      .from("challenge_submissions")
      .upsert(
        {
          challenge_slug: slug,
          user_id: userId,
          name,
          email,
          work_url: workUrl,
          message: message || null,
          ip: ip ?? null,
          status: "received",
          is_public: false,
          meta: {
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          },
        },
        { onConflict: "challenge_slug,email" },
      );

    if (submissionError) {
      logger.error("quest_submissions upsert failed", submissionError);
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
            path: `/quests/${slug}/submit`,
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          }),
          updateexisting: Boolean(existingUserData),
        },
        { onConflict: "user_id" },
      );

    if (newsletterError) {
      logger.error("quest submit newsletter upsert failed", newsletterError);
      return new Response(JSON.stringify({ error: "NEWSLETTER_DB_ERROR" }), {
        status: 500,
      });
    }

    const brevoConfig = getBrevoConfig();
    const globalListId = Number(brevoConfig.generalListId);
    const submissionsListId = Number(brevoConfig.questsSubmissionsId);
    const listIds = [globalListId, submissionsListId].filter(
      (id): id is number => Boolean(id) && !Number.isNaN(id),
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
      templateId: "questSubmitUserConfirmation",
      context: {
        name,
        questTitle: quest.title,
        challengeUrl,
        workUrl,
      },
    });

    const adminMailSent = await sendEmail({
      to: [{ email: appConfig.contactForm.to }],
      locale,
      templateId: "questSubmitAdminNotification",
      context: {
        name,
        email,
        questTitle: quest.title,
        questSlug: slug,
        challengeUrl,
        workUrl,
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
    logger.error("/api/quests/[slug]/submit failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
