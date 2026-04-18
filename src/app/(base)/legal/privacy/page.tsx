import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeaderSection } from "@/app/(base)/legal/privacy/sections/HeaderSection";
import { PageContent } from "@/app/(base)/legal/privacy/sections/PageContent";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("privacy.title"),
    description: t("privacy.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("privacy.title"),
      description: t("privacy.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("privacy.title"),
      description: t("privacy.description"),
    },
  };

  return metadata;
}

export default function Privacy() {
  return (
    <>
      <HeaderSection />
      <PageContent />
    </>
  );
}
