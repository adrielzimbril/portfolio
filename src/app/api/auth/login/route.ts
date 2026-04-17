import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { authRoutes } from "@/integrations/auth/routes";
import { providerList } from "@/integrations/auth/types/types";
import { ConfigValue } from "@/config";
import { Provider } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const provider = searchParams.get("provider") as Provider;
  const next =
    searchParams.get("next") ?? ConfigValue.AUTH_CALLBACK_URL_COMMUNITY;

  if (!provider || !providerList.includes(provider as any)) {
    return NextResponse.redirect(
      `${origin}${ConfigValue.AUTH_CALLBACK_URL_DEFAULT}?error=invalid_provider`,
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}${authRoutes.callback}?next=${encodeURIComponent(next)}`,
      ...(provider === "google"
        ? {
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          }
        : {}),
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${origin}${ConfigValue.AUTH_CALLBACK_URL_DEFAULT}?error=login_failed`,
    );
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(
    `${origin}${ConfigValue.AUTH_CALLBACK_URL_DEFAULT}?error=unknown_error`,
  );
}
