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
      contentType: "image/svg+xml",
      size: { width: 48, height: 48 },
      id: "ico",
    },
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "favicon-48",
    },

    // --- Apple Touch Icons ---
    {
      contentType: "image/png",
      size: { width: 120, height: 120 },
      id: "apple-120",
    },

    // --- Android / PWA ---
    {
      contentType: "image/png",
      size: { width: 256, height: 256 },
      id: "android-256",
    },

    // --- Optional : SVG ---
    {
      contentType: "image/svg+xml",
      size: { width: 48, height: 48 },
      id: "icon-svg",
    },

    // --- Optional : ICO ---
    {
      contentType: "image/ico",
      size: { width: 48, height: 48 },
      id: "icon-ico",
    },
  ];
}

// Image generation
export default async function Icon() {
  // const url = getAbsolutePathUrl({ type: "s3", path: "/icon.svg" });
  const url = getAbsolutePathUrl({ type: "s3", path: "/icon-three.png" });
  try {
    // Get the host from headers
    return new ImageResponse(
      // ImageResponse JSX element
      <div tw="flex flex-col h-full w-full justify-center items-center bg-transparent text-2xl font-bold">
        <img src={url} alt={alt} tw="flex-shrink-0 h-full w-full rounded-2xl" />
      </div>,
      // ImageResponse options
      {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        ...size,
      },
    );
  } catch (error) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
