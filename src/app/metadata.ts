import { Metadata } from "next";
import { siteConfig } from "@/data/config";

export interface InnerPageSeo {
  title: string;
  description: string;
  keywords: string[];
  alternates: {
    canonical: string;
  };
}

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
      en: "/",
      fr: "/",
      ch: "/",
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
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: siteConfig.details.nameShared,
      template: `%s | ${siteConfig.details.nameShared}`,
    },
    description: siteConfig.description,
    creator: siteConfig.details.nameShared,
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
