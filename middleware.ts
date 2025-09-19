import logger from "@/utils/logger";
import { routing } from "@i18n/routing";

import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  const { pathname, origin } = nextUrl;
  const { geoCountry, vercelCountry, forwardedIp, realIp } = {
    geoCountry: req.geo?.country,
    vercelCountry: headers.get("x-vercel-ip-country"),
    forwardedIp: headers.get("x-forwarded-for"),
    realIp: headers.get("x-real-ip"),
  };
  const country = geoCountry || vercelCountry;

  req.headers.set("x-shiro-country", country || "");
  req.headers.set("x-shiro-country-geo", geoCountry || "");
  req.headers.set("x-shiro-country-vercel", vercelCountry || "");
  req.headers.set("x-shiro-forwarded-ip", forwardedIp || "");
  req.headers.set("x-shiro-real-ip", realIp || "");
  logger.info("Middleware", {
    country,
    geoCountry,
    vercelCountry,
    forwardedIp,
    realIp,
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|image-proxy|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
