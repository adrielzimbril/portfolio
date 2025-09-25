import { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { getBaseUrl, getPathUrl } from "@/utils";

export interface InnerPageSeo {
  title: string;
  description: string;
  keywords: string[];
  alternates: {
    canonical: string;
  };
}

const BASE_URL = getBaseUrl();

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
        url: getPathUrl("/opengraph-image"),
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
        url: getPathUrl("/opengraph-image"),
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
