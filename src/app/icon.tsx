import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import { getAbsolutePathUrl } from "@/utils/base-url";

// Configuration exports
export const runtime = "nodejs";
export const alt = siteConfig.details.nameShared;
export const size = {
  width: 2048,
  height: 2048,
};
export const contentType = "image/png";

// Image metadata
export function generateImageMetadata() {
  return [
    {
      contentType: "image/png",
      size: { width: 32, height: 32 },
      id: "32",
    },
    {
      contentType: "image/svg+xml",
      size: { width: 48, height: 48 },
      id: "ico",
    },
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "48",
    },
    {
      contentType: "image/png",
      size: { width: 72, height: 72 },
      id: "72",
    },
    {
      contentType: "image/png",
      size: { width: 156, height: 156 },
      id: "156",
    },
    {
      contentType: "image/png",
      size: { width: 192, height: 192 },
      id: "192",
    },
    {
      contentType: "image/png",
      size: { width: 256, height: 256 },
      id: "256",
    },
    {
      contentType: "image/png",
      size: { width: 512, height: 512 },
      id: "512",
    },
    {
      contentType: "image/png",
      size: { width: 1024, height: 1024 },
      id: "1024",
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
