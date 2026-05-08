import type { NextConfig } from "next";
import { ConfigValue } from "@/config/config";

const IsDEV = ConfigValue.NODE_ENV === "development";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      // production
      {
        protocol: "https",
        hostname: "adrielzimbril.com",
      },
      {
        protocol: "https",
        hostname: "www.adrielzimbril.com",
      },
      {
        protocol: "https",
        hostname: "shop.adrielzimbril.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "cdn.aurthle.one",
      },
      // local development
      {
        protocol: "http",
        hostname: "localhost",
      },
      // google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // github profile images
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      // dicebear avatars
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["@aurthle/icons", "lucide-react"],
  },
  compiler: {
    removeConsole: !IsDEV,
  },
  compress: true,
  serverExternalPackages: ["@vercel/og"],
};

export default nextConfig;
