import { getAbsolutePathUrl, getBaseUrl } from "@/utils/base-url";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import logger from "@/utils/logger";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  try {
    // Get the host from headers

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
          {alt}
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
