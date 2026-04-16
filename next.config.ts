import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";
import { appConfig } from "@data/app-config";
import bundleAnalyzer from "@next/bundle-analyzer";
import { ConfigValue } from "@/config";

const withNextIntl = nextIntlPlugin({
  requestConfig: "./src/integrations/i18n/request.ts",
  experimental: {
    createMessagesDeclaration: Object.keys(appConfig.i18n.locales).map(
      (locale) => `./src/integrations/i18n/translations/${locale}.json`,
    ),
  },
});

const IsDEV = ConfigValue.NODE_ENV === "development";
const withBundleAnalyzer = bundleAnalyzer({
  enabled: ConfigValue.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    remotePatterns: [
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
    optimizePackageImports: ["@aurthle/icons"],
  },
  serverExternalPackages: ["@vercel/og"],
};

export default withContentCollections(
  withNextIntl(withBundleAnalyzer(nextConfig)),
);
