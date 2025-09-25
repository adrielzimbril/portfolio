import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import { getAbsolutePathUrl } from "@/utils/base-url";
import logger from "@/utils/logger";
import { PageParams } from "@/types";
import { getPostBySlug } from "@/module/content/utils/lib/posts";
import { getLocale } from "next-intl/server";
import { routes } from "@/data/routes";
import { localeRedirect } from "@i18n/routing";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";


export async function generateImageMetadata(props: {
  params: Promise<PageParams>;
}) {
  const { slug } = await props.params;
  const images = [{ text: slug }];

  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 630 },
    alt: image.text,
    contentType: "image/png",
  }));
}

export default async function Image(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;

  const locale = await getLocale();

  const post = await getPostBySlug(slug, { locale });

  if (!post) {
    return localeRedirect({ href: routes.thoughts.link, locale });
  }

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "black",
          }}
        >
          <img
            src={getAbsolutePathUrl({
              type: "s3",
              path: "/agent-template-og.png",
            })}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    logger.error("Error generating OpenGraph image:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
