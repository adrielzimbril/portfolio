import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";
import { appConfig } from "@data/app-config";

const withNextIntl = nextIntlPlugin({
  requestConfig: "./src/module/i18n/request.ts",
  experimental: {
    createMessagesDeclaration: Object.keys(appConfig.i18n.locales).map(
      (locale) => `./src/module/i18n/translations/${locale}.json`
    ),
  },
});

const nextConfig: NextConfig = {
  /* config options here */
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
      {
        protocol: "https",
        hostname: "cdn.aurthle.one",
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  serverExternalPackages: ["@vercel/og"],
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withContentCollections(withNextIntl(nextConfig));