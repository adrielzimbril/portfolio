import type { MetadataRoute } from "next";
import { getBaseUrl, getPathUrl } from "@/utils";
import { routes } from "@/data/routes";
import { Locale } from "@/types";

const rssRoutes = Object.values(Locale).map((locale) => {
  return [
    getPathUrl(`${routes.rss.link}/?locale=${locale}`),
    getPathUrl(`${routes.rssAtom.link}/?locale=${locale}`),
    getPathUrl(`${routes.rssJson.link}/?locale=${locale}`),
  ];
});

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["*", "/api/og/*", "/api/preview", "/api/rss/*", "/rss/*"],
        disallow: [
          "/private/",
          "/private/*",
          "/admin/",
          "/api/",
          "/*?*draft=true",
          "/*/drafts/*",
          "/admin/",
        ],
      },
    ],
    sitemap: [getPathUrl("sitemap.xml"), ...rssRoutes.flat()],
    host: getBaseUrl(),
  };
}

