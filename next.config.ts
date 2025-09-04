import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";

const withNextIntl = nextIntlPlugin("./src/module/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  domains: ["localhost", "adrielzimbril.com", "www.adrielzimbril.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "designmodo.com",
      },
      {
        protocol: "https",
        hostname: "www.adrielzimbril.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
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
    mdxRs: true,
    serverComponentsExternalPackages: ["@vercel/og"],
  },
};

export default withContentCollections(withNextIntl(nextConfig));
