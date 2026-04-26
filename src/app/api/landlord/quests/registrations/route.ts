import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { sendEmail } from "@/integrations/mail";
import { appConfig } from "@/data/app-config";
import { getQuestBySlug } from "@/integrations/content/lib";
import { getResourcesUrl } from "@/utils/base-url";
import { PageType } from "@/types";

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
      source,
      sendEmail: shouldSendEmail,
    } = body;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const meta = {
      source: source || "admin",
      silent_add: !shouldSendEmail,
    };

    const { data, error } = await supabase
      .from("challenge_registrations")
      .insert({
        name,
        email,
        message,
        challenge_slug,
        meta,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Email Notifications Logic
    try {
      const quest = await getQuestBySlug(challenge_slug);
      const challengeUrl = getResourcesUrl(PageType.QUESTS, challenge_slug);
      const questTitle = quest?.title || challenge_slug;

      // Always notify admin
      await sendEmail({
        to: [{ email: appConfig.contactForm.to }],
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
          templateId: "questRegisterUserConfirmation",
          context: {
            name,
            questTitle,
            challengeUrl,
          },
        });
      }
    } catch (emailError) {
      console.error("Failed to send notification emails:", emailError);
      // We don't fail the request if emails fail, as the registration was already saved
    }

    return NextResponse.json({ registration: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add registration" },
      { status: 500 },
    );
  }
}
