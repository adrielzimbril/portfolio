import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { authRoutes } from "@/integrations/auth/routes";
import { providerList } from "@/integrations/auth/types/types";
import { ConfigValue } from "@/config";
import { Provider } from "@supabase/supabase-js";
import { getPathUrl } from "@/utils/base-url";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") as Provider;
  const next =
    searchParams.get("next") ??
    getPathUrl(ConfigValue.AUTH_CALLBACK_URL_COMMUNITY);

  if (!provider || !providerList.includes(provider as any)) {
    return NextResponse.redirect(
      getPathUrl(`${ConfigValue.AUTH_DEFAULT_REDIRECT}?error=invalid_provider`),
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getPathUrl(
        `${authRoutes.callback}?next=${encodeURIComponent(next)}`,
      ),
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
      getPathUrl(`${ConfigValue.AUTH_DEFAULT_REDIRECT}?error=login_failed`),
    );
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(
    getPathUrl(`${ConfigValue.AUTH_DEFAULT_REDIRECT}?error=unknown_error`),
  );
}
