import { NextRequest } from "next/server";
import { appConfig } from "@/data/app-config";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { sendEmail } from "@/module/mail";
import { supabase } from "@/module/supabase/client";
import { Locale } from "@/types";
import logger from "@/utils/logger";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = supabase as any;
    const { slug } = await params;
    const challenge = await getQuestBySlug(slug);

    if (!challenge) {
      return new Response(JSON.stringify({ error: "CHALLENGE_NOT_FOUND" }), {
        status: 404,
      });
    }

    if (isSubmissionClosed(challenge)) {
      return new Response(
        JSON.stringify({ error: "CHALLENGE_SUBMISSION_CLOSED" }),
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
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
    }: {
      name?: string;
      email?: string;
      workTitle?: string;
      workUrl?: string;
      portfolioUrl?: string;
      figmaUrl?: string;
      posterUrl?: string;
      message?: string;
      locale?: Locale;
    } = body;

    if (!name || !email || !workTitle || !workUrl) {
      return new Response(JSON.stringify({ error: "MISSING_REQUIRED_FIELDS" }), {
        status: 400,
      });
    }

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
          portfolio_url: portfolioUrl ?? null,
          figma_url: figmaUrl ?? null,
          poster_url: posterUrl ?? null,
          message: message ?? null,
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
      logger.error("challenge_submissions upsert failed", submissionError);
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    await sendEmail({
      to: [{ email, name }],
      locale,
      subject: `Soumission reçue: ${challenge.title}`,
      text: `Bonjour ${name},\n\nTa soumission pour "${challenge.title}" a bien été reçue.\nNous revenons vers toi après la fin du challenge.\n\nLien soumis: ${workUrl}\n\nMerci,\nAdriel`,
    });

    await sendEmail({
      to: [{ email: appConfig.contactForm.to }],
      locale,
      subject: `Nouvelle soumission challenge: ${challenge.title}`,
      text: `Nom: ${name}\nEmail: ${email}\nChallenge: ${challenge.title}\nTitre: ${workTitle}\nLien: ${workUrl}\nMessage: ${message || "-"}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("/api/quests/[slug]/submit failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
