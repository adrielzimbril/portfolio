import OpenGraphImage from "@/components/shared/_layouts/opengraph-image";
import { siteConfig } from "@/data/config";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return await OpenGraphImage({
    title: siteConfig.details.nameShared,
    alt: siteConfig.details.nameShared,
  });
}
