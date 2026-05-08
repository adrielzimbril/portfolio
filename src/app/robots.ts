import type { MetadataRoute } from "next";
import { getBaseUrl, getPathUrl } from "@/utils/base-url";
import { routes } from "@/data/routes";
import { Locale } from "@/types";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "",
        allow: [],
        disallow: ["*"],
      },
    ],
    sitemap: [getPathUrl("sitemap.xml")],
    host: getBaseUrl(),
  };
}
