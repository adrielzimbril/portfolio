import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeaderSection } from "./sections/HeaderSection";
import { SitemapSection } from "./sections/SitemapSection";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("sitemap.title"),
    description: t("sitemap.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("sitemap.title"),
      description: t("sitemap.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("sitemap.title"),
      description: t("sitemap.description"),
    },
  };

  return metadata;
}

export default function Sitemap() {
  return (
    <>
      <HeaderSection />
      <SitemapSection />
    </>
  );
}
