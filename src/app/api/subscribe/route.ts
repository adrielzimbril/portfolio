import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";
import { brevoAddContact } from '@/lib/brevo'
import { brevoSendEmail } from '@/lib/brevo'
import { renderEmail } from '@/lib/email'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
import logger from "@/utils/logger";

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

  // 1) Check if subscriber already exists
  const { data: existing, error: findError } = await supabase
    .from("newsletter_subscribers")
    .select("id, email")
    .eq("email", email)
    .maybeSingle();

  if (findError) {
    return new Response(JSON.stringify({ error: findError.message }), {
      status: 500,
    });
  }

  let alreadyExists = !!existing;

  if (!existing) {
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          name: name || null,
          phone: phone || null,
          email,
          subscribed_from_page: subscribedFromPage || null,
        },
      ]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
      });
    }
    // Try sending welcome email (best effort)
    try {
      const html = renderEmail(WelcomeEmail({ name: name || undefined }));
      await brevoSendEmail({
        toEmail: email,
        toName: name,
        subject: "Bienvenue 🎁",
        html,
      });
    } catch (e) {
      logger.warn("Welcome email send failed:", e);
    }
  } else {
    // Update name and phone if provided
    if (name || phone) {
      const { error: updateError } = await supabase
        .from("newsletter_subscribers")
        .upsert({ name: name || null, phone: phone || null })
        .eq("email", email);

      if (updateError) {
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 500,
        });
      }
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
      await brevoAddContact({ email, firstName: name, phone, listIds });
    }
  } catch (e: any) {
    // Do not fail the flow if Brevo fails
    logger.warn("Brevo add contact error:", e?.message || e);
  }

  return new Response(JSON.stringify({ success: true, alreadyExists }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
