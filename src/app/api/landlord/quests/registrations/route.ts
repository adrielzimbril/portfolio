import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { sendEmail } from "@/integrations/mail";
import { appConfig } from "@/data/app-config";
import { getQuestBySlug } from "@/integrations/content/lib";
import { getResourcesUrl } from "@/utils/base-url";
import { PageType } from "@/types";
import { addContact, ContactProvider } from "@/integrations/contact";
import { getBrevoConfig } from "@/config";
import logger from "@/utils/logger";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      100,
    );
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("challenge_registrations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (slug) {
      query = query.eq("challenge_slug", slug);
    }

    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      rows: data || [],
      count: count || 0,
      page,
      pageSize,
    });
  } catch (error) {
    return NextResponse.json({ rows: [], count: 0 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      message,
      challenge_slug,
      source = "admin_dashboard",
      sendEmail: shouldSendEmail,
      locale = "fr", // Default to fr for landlord
    } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const db = supabase as any;

    const quest = await getQuestBySlug(challenge_slug);
    if (!quest) {
      return NextResponse.json({ error: "QUEST_NOT_FOUND" }, { status: 404 });
    }

    // Get IP for metadata
    const ipHeader = request.headers.get("x-forwarded-for");
    const ip = ipHeader ? ipHeader.split(",")[0]?.trim() : undefined;

    // 1. User Upsert (Meticulous logic from public API)
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
      logger.error("landlord quest register: missing user_id after upsert_user", { email, challenge_slug });
      return NextResponse.json({ error: "USER_UPSERT_FAILED" }, { status: 500 });
    }

    // 2. Registration Upsert
    const meta = {
      source: source,
      silent_add: !shouldSendEmail,
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
      url: request.url,
    };

    const { data, error: registrationError } = await db
      .from("challenge_registrations")
      .upsert(
        {
          challenge_slug,
          user_id: userId,
          name,
          email,
          message: message || null,
          ip: ip ?? null,
          meta,
        },
        { onConflict: "challenge_slug,email" }
      )
      .select()
      .single();

    if (registrationError) {
      logger.error("landlord quest register: db upsert failed", registrationError);
      return NextResponse.json({ error: registrationError.message }, { status: 500 });
    }

    // 3. Newsletter & Brevo (Meticulous logic from public API)
    try {
      await db.from("newsletter_subscribers").upsert(
        {
          user_id: userId,
          subscribed_from_page: JSON.stringify({
            path: `/landlord/quests/registrations`,
            source: "admin_dashboard",
            origin: request.headers.get("origin"),
            referer: request.headers.get("referer"),
          }),
          updateexisting: Boolean(existingUserData),
        },
        { onConflict: "user_id" }
      );

      const brevoConfig = getBrevoConfig();
      const globalListId = Number(brevoConfig.generalListId);
      const registerListId = Number(brevoConfig.questsRegisterId);
      const listIds = [globalListId, registerListId].filter(
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
    } catch (newsError) {
      logger.error("landlord quest register: newsletter/brevo failed", newsError);
    }

    // 4. Email Notifications
    try {
      const challengeUrl = getResourcesUrl(PageType.QUESTS, challenge_slug);
      const questTitle = quest.title;

      // Always notify admin
      await sendEmail({
        to: [{ email: appConfig.contactForm.to }],
        locale: locale as any,
        templateId: "questRegisterAdminNotification",
        context: {
          name,
          email,
          questTitle,
          questSlug: challenge_slug,
          challengeUrl,
          message: message || undefined,
        },
      });

      // Notify user only if checkbox was checked
      if (shouldSendEmail) {
        await sendEmail({
          to: [{ email, name }],
          locale: locale as any,
          templateId: "questRegisterUserConfirmation",
          context: {
            name,
            questTitle,
            challengeUrl,
          },
        });
      }
    } catch (emailError) {
      logger.error("landlord quest register: emails failed", emailError);
    }

    return NextResponse.json({ registration: data });
  } catch (error) {
    logger.error("landlord quest register: failed", error);
    return NextResponse.json(
      { error: "Failed to add registration" },
      { status: 500 },
    );
  }
}
