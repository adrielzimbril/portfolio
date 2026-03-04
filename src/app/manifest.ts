import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { getBaseUrl, getPathUrl } from "@/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.details.nameShared,
    short_name: siteConfig.details.nameShared,
    description: siteConfig.description,
    start_url: getBaseUrl(),
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    shortcuts: [
      {
        name: siteConfig.details.nameShared,
        short_name: siteConfig.details.nameShared,
        description: siteConfig.description,
        url: getBaseUrl(),
        icons: [
          {
            src: getPathUrl("icon.svg"),
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    ],
    icons: [
      {
        src: getPathUrl("icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
