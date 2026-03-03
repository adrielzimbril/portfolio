import { Metadata } from "next";
import { siteConfig } from "@/data/config";
import {
  getAbsolutePathUrl,
  getBaseUrl,
  getImageUrl,
  getPathUrl,
} from "@/utils";
import { Locale } from "@/types";
import { routes } from "@/data/routes";

export interface InnerPageSeo {
  title: string;
  description: string;
  keywords: string[];
  alternates: {
    canonical: string;
  };
}

const BASE_URL = getBaseUrl();

const rssRoutes = Object.values(Locale).map((locale) => ({
  [`application/rss+xml;lang=${locale}`]: getPathUrl(
    `${routes.rss.link}/?locale=${locale}`,
  ),
  [`application/atom+xml;lang=${locale}`]: getPathUrl(
    `${routes.rssAtom.link}/?locale=${locale}`,
  ),
  [`application/feed+json;lang=${locale}`]: getPathUrl(
    `${routes.rssJson.link}/?locale=${locale}`,
  ),
}));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.details.nameShared,
    template: `%s | ${siteConfig.details.nameShared}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: BASE_URL,
      fr: BASE_URL,
      ch: BASE_URL,
    },
    types: {
      ...rssRoutes.reduce((acc, rssRoute) => ({ ...acc, ...rssRoute }), {}),
    },
  },
  icons: {
    icon: getAbsolutePathUrl({ type: "s3", path: "/icon.svg" }),
    shortcut: getAbsolutePathUrl({ type: "s3", path: "/icon.svg" }),
    apple: getAbsolutePathUrl({ type: "s3", path: "/icon.svg" }),
  },
  authors: [
    {
      name: siteConfig.details.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.details.nameShared,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
    url: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.languagePrimary,
    url: siteConfig.url,
    title: {
      default: siteConfig.details.nameShared,
      template: `%s | ${siteConfig.details.nameShared}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.details.nameShared,
    images: [
      {
        //url: getPathUrl("/opengraph-image"),
        url: getImageUrl("opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.details.nameShared,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: siteConfig.details.nameShared,
      template: `%s | ${siteConfig.details.nameShared}`,
    },
    description: siteConfig.description,
    creator: siteConfig.details.nameShared,
    images: [
      {
        url: getImageUrl("opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.details.nameShared,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
