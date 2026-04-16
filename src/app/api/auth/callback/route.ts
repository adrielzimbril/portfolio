import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendEmail } from "@/integrations/mail";
import { Locale } from "@/types";
import logger from "@/utils/logger";
import { getSupabaseConfig, isDevelopment } from "@/config";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get("next") ?? "/community";

  if (code) {
    const cookieStore = await cookies();
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient(url!, anonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if it's the first login
      // standard Supabase user object has created_at and last_sign_in_at
      // If they are almost the same (within a few seconds), it's a new user
      const createdAt = new Date(data.user.created_at).getTime();
      const lastSignIn = data.user.last_sign_in_at
        ? new Date(data.user.last_sign_in_at).getTime()
        : createdAt;

      const isNewUser = lastSignIn - createdAt < 10000; // 10 seconds threshold

      if (isNewUser) {
        logger.info("New user connected via GitHub, sending welcome email", {
          email: data.user.email,
        });

        if (data.user.email) {
          await sendEmail({
            to: [
              {
                email: data.user.email,
                name: data.user.user_metadata.full_name,
              },
            ],
            templateId: "welcome",
            locale: Locale.EN, // Default to EN for now, or detect from user metadata
            context: {
              name: data.user.user_metadata.full_name || data.user.email,
            },
          });
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = isDevelopment();
      if (isLocalEnv) {
        // we can be sure that there is no proxy
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
