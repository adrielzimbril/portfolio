import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";

const withNextIntl = nextIntlPlugin("./modules/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // google profile images
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // github profile images
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@vercel/og"],
  },
};

export default withContentCollections(withNextIntl(nextConfig));
