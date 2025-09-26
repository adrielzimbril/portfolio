import type { MetadataRoute } from "next";
import { getBaseUrl, getPathUrl } from "@/utils";

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
    sitemap: getPathUrl("sitemap.xml"),
    host: getBaseUrl(),
  };
}

