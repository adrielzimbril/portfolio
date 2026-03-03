import { NextRequest } from "next/server";
import { z } from "zod";
import { appConfig } from "@/data/app-config";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { sendEmail } from "@/module/mail";
import { supabase } from "@/module/supabase/client";
import { addContact, ContactProvider } from "@/module/contact";
import { Locale } from "@/types";
import logger from "@/utils/logger";

const submitSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  workTitle: z.string().min(3),
  workUrl: z.url(),
  portfolioUrl: z.url().optional().or(z.literal("")),
  figmaUrl: z.url().optional().or(z.literal("")),
  posterUrl: z.url().optional().or(z.literal("")),
  message: z.string().max(1500).optional(),
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

    if (isSubmissionClosed(quest.submission_deadline, quest.quest_end)) {
      return new Response(JSON.stringify({ error: "QUEST_SUBMISSION_CLOSED" }), {
        status: 400,
      });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "INVALID_INPUT" }), {
        status: 400,
      });
    }

    const {
      name,
      email,
      workTitle,
      workUrl,
      portfolioUrl,
      figmaUrl,
      posterUrl,
      message,
      locale,
    } = parsed.data;

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

    const { error: submissionError } = await db
      .from("challenge_submissions")
      .upsert(
        {
          challenge_slug: slug,
          user_id: userId ?? null,
          name,
          email,
          work_title: workTitle,
          work_url: workUrl,
          portfolio_url: portfolioUrl || null,
          figma_url: figmaUrl || null,
          poster_url: posterUrl || null,
          message: message || null,
          ip: ip ?? null,
          status: "received",
          is_public: false,
          winner_rank: null,
          meta: {
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          },
        },
        { onConflict: "challenge_slug,email" }
      );

    if (submissionError) {
      logger.error("quest_submissions upsert failed", submissionError);
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    if (userId) {
      await db.from("newsletter_subscribers").upsert(
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
        { onConflict: "user_id" }
      );
    }

    const generalId = Number(process.env.BREVO_GENERAL_LIST_ID);
    if (generalId) {
      await addContact({
        email,
        firstName: name,
        listIds: [generalId],
        provider: ContactProvider.BREVO,
      });
    }

    await sendEmail({
      to: [{ email, name }],
      locale,
      subject: `Message recu - soumission au quest ${quest.title}`,
      text: `Bonjour ${name},

Ta soumission pour "${quest.title}" a bien ete recue.
Tu recevras un retour apres la fin du quest.

Lien soumis: ${workUrl}

Merci,
Adriel`,
    });

    await sendEmail({
      to: [{ email: appConfig.contactForm.to }],
      locale,
      subject: `[BRIEF ADMIN] Nouvelle soumission quest - ${quest.title}`,
      text: `Brief admin:
- Quest: ${quest.title}
- Slug: ${slug}
- Nom: ${name}
- Email: ${email}
- Titre du travail: ${workTitle}
- Lien du travail: ${workUrl}
- Portfolio: ${portfolioUrl || "-"}
- Figma: ${figmaUrl || "-"}
- Affiche: ${posterUrl || "-"}
- Message: ${message || "-"}
- Date fin soumission: ${quest.submission_deadline}
- Date fin quest: ${quest.quest_end}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("/api/quests/[slug]/submit failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
