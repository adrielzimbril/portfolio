import logger from "@/utils/logger";

import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

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

  return req;
}

export const config = {
  matcher: [
    "/((?!api|image-proxy|api/auth/callback|auth|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
