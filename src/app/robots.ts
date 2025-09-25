import type { MetadataRoute } from "next";
import { getBaseUrl, getPathUrl } from "@/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["*", "/api/og/*"],
        disallow: ["/private/", "/private/*"],
      },
    ],
    sitemap: getPathUrl("sitemap.xml"),
    host: getBaseUrl(),
  };
}
