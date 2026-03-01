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
    // --- Icons ---
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
    // --- Favicons ---
    {
      contentType: "image/png",
      size: { width: 16, height: 16 },
      id: "favicon-16",
    },
    {
      contentType: "image/png",
      size: { width: 32, height: 32 },
      id: "favicon-32",
    },
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "favicon-48",
    },

    // --- Apple Touch Icons ---
    {
      contentType: "image/png",
      size: { width: 57, height: 57 },
      id: "apple-57",
    },
    {
      contentType: "image/png",
      size: { width: 60, height: 60 },
      id: "apple-60",
    },
    {
      contentType: "image/png",
      size: { width: 72, height: 72 },
      id: "apple-72",
    },
    {
      contentType: "image/png",
      size: { width: 76, height: 76 },
      id: "apple-76",
    },
    {
      contentType: "image/png",
      size: { width: 114, height: 114 },
      id: "apple-114",
    },
    {
      contentType: "image/png",
      size: { width: 120, height: 120 },
      id: "apple-120",
    },
    {
      contentType: "image/png",
      size: { width: 144, height: 144 },
      id: "apple-144",
    },
    {
      contentType: "image/png",
      size: { width: 152, height: 152 },
      id: "apple-152",
    },
    {
      contentType: "image/png",
      size: { width: 167, height: 167 },
      id: "apple-167",
    },
    {
      contentType: "image/png",
      size: { width: 180, height: 180 },
      id: "apple-180",
    },
    {
      contentType: "image/png",
      size: { width: 1024, height: 1024 },
      id: "apple-1024",
    },

    // --- Android / PWA ---
    {
      contentType: "image/png",
      size: { width: 192, height: 192 },
      id: "android-192",
    },
    {
      contentType: "image/png",
      size: { width: 256, height: 256 },
      id: "android-256",
    },
    {
      contentType: "image/png",
      size: { width: 512, height: 512 },
      id: "android-512",
    },
    {
      contentType: "image/png",
      size: { width: 1024, height: 1024 },
      id: "android-1024",
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
  const url = getAbsolutePathUrl({ type: "s3", path: "/icon.svg" });
  try {
    // Get the host from headers
    return new ImageResponse(
      // ImageResponse JSX element
      <div tw="flex flex-col h-full w-full justify-center items-center bg-transparent text-2xl font-bold">
        <img src={url} alt={alt} tw="flex-shrink-0 h-full w-full" />
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
