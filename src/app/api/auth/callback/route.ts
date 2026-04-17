import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { authRoutes } from "@/integrations/auth/routes";
import { sendEmail } from "@/integrations/mail";
import { Locale } from "@/types";
import logger from "@/utils/logger";
import { isDevelopment } from "@/config";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? authRoutes.defaultRedirect;

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if it's a new user to send a welcome email
      const createdAt = new Date(data.user.created_at).getTime();
      const lastSignIn = data.user.last_sign_in_at
        ? new Date(data.user.last_sign_in_at).getTime()
        : createdAt;

      // 10 seconds threshold to consider it a "new signup"
      const isNewSignup = lastSignIn - createdAt < 10000;

      if (isNewSignup && data.user.email) {
        logger.info("New user connected, sending welcome email", {
          email: data.user.email,
          provider: data.user.app_metadata.provider
        });

        try {
          await sendEmail({
            to: [{
              email: data.user.email,
              name: data.user.user_metadata.full_name || data.user.email,
            }],
            templateId: "welcome",
            locale: Locale.EN,
            context: {
              name: data.user.user_metadata.full_name || data.user.email,
            },
          });
        } catch (emailError) {
          logger.error("Failed to send welcome email:", emailError);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = isDevelopment();
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Handle errors
  return NextResponse.redirect(`${origin}${authRoutes.error}`);
}
