import logger from "@/utils/logger";
import { routing } from "@/integrations/i18n/routing";
import { createClient } from "@/integrations/supabase/middleware";
import { ConfigValue } from "@/config";
import { NextResponse } from "next/server";
import { apiRoutes } from "@/data/api-routes";

import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const { nextUrl, headers } = req;
  const { pathname, origin } = nextUrl;
  const { country, forwardedIp, realIp } = {
    country: headers.get("x-vercel-ip-country"),
    forwardedIp: headers.get("x-forwarded-for"),
    realIp: headers.get("x-real-ip"),
  };

  req.headers.set("x-shiro-country", country || "");
  req.headers.set("x-shiro-forwarded-ip", forwardedIp || "");
  req.headers.set("x-shiro-real-ip", realIp || "");
  logger.info("Middleware", {
    country,
    forwardedIp,
    realIp,
  });

  // Check session timeout
  const supabase = createClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && user) {
    const timeoutHours = parseInt(
      ConfigValue.NEXT_PRIVATE_SESSION_TIMEOUT_HOURS || "1",
      10,
    );
    const sessionAge =
      Date.now() -
      new Date(
        session.user.last_sign_in_at || session.user.created_at,
      ).getTime();
    const timeoutMs = timeoutHours * 60 * 60 * 1000;

    if (sessionAge > timeoutMs) {
      // Session expired, redirect to logout
      const logoutUrl = new URL(apiRoutes.auth.logout.link, req.url);
      return NextResponse.redirect(logoutUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|image-proxy|api/auth/callback|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
