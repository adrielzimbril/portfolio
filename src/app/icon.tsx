import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import { getAbsolutePathUrl } from "@/utils/base-url";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image metadata
export function generateImageMetadata() {
  return [
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "small",
    },
    {
      contentType: "image/png",
      size: { width: 72, height: 72 },
      id: "medium",
    },
    {
      contentType: "image/png",
      size: { width: 156, height: 156 },
      id: "large",
    },
  ];
}

// Image generation
export default async function Icon() {
  const url = getAbsolutePathUrl({ type: "s3", path: "/icon.svg" });
  try {
    // Get the host from headers
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div tw="flex flex-col h-full w-full justify-center items-center bg-transparent color-white text-2xl font-bold">
          <img
            src={url}
            alt={alt}
            tw="flex-shrink-0 h-full w-full object-contain"
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
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
