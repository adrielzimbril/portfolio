import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import logger from "@/utils/logger";
import { getAbsolutePathUrl } from "@/utils/base-url";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon() {
  const url = getAbsolutePathUrl({ type: "s3", path: "/icon-dark.svg" });
  logger.info("Icon url:", url);
  try {
    // Get the host from headers
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 24,
            background: "transparent",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <img
            src={url}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        ...size,
      }
    );
  } catch (error) {
    logger.error("Error generating OpenGraph image:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
