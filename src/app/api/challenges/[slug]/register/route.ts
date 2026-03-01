import { NextRequest } from "next/server";
import { appConfig } from "@/data/app-config";
import { getChallengeBySlug, isSubmissionClosed } from "@/data/challenges-masterclasses";
import { addContact, ContactProvider } from "@/module/contact";
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
    const challenge = getChallengeBySlug(slug);

    if (!challenge) {
      return new Response(JSON.stringify({ error: "CHALLENGE_NOT_FOUND" }), {
        status: 404,
      });
    }

    if (isSubmissionClosed(challenge)) {
      return new Response(
        JSON.stringify({ error: "CHALLENGE_REGISTRATION_CLOSED" }),
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      portfolioUrl,
      motivation,
      locale,
    }: {
      name?: string;
      email?: string;
      portfolioUrl?: string;
      motivation?: string;
      locale?: Locale;
    } = body;

    if (!name || !email) {
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

    const { error: registrationError } = await db
      .from("challenge_registrations")
      .upsert(
        {
          challenge_slug: slug,
          user_id: userId ?? null,
          name,
          email,
          portfolio_url: portfolioUrl ?? null,
          motivation: motivation ?? null,
          ip: ip ?? null,
          meta: {
            origin: req.headers.get("origin"),
            referer: req.headers.get("referer"),
            url: req.url,
          },
        },
        { onConflict: "challenge_slug,email" }
      );

    if (registrationError) {
      logger.error("challenge_registrations upsert failed", registrationError);
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    if (userId) {
      await db.from("newsletter_subscribers").upsert(
        {
          user_id: userId,
          subscribed_from_page: JSON.stringify({
            path: `/challenges/${slug}`,
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
      subject: `Inscription confirmée: ${challenge.title}`,
      text: `Bonjour ${name},\n\nTon inscription au challenge "${challenge.title}" est bien enregistrée.\nTu recevras les prochaines infos par email.\n\nÀ bientôt,\nAdriel`,
    });

    await sendEmail({
      to: [{ email: appConfig.contactForm.to }],
      locale,
      subject: `Nouvelle inscription challenge: ${challenge.title}`,
      text: `Nom: ${name}\nEmail: ${email}\nChallenge: ${challenge.title}\nPortfolio: ${portfolioUrl || "-"}\nMessage: ${motivation || "-"}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("/api/challenges/[slug]/register failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
