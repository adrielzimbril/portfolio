import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeaderSection } from "@/app/(base)/legal/terms/sections/HeaderSection";
import { PageContent } from "@/app/(base)/legal/terms/sections/PageContent";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("terms.title"),
    description: t("terms.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("terms.title"),
      description: t("terms.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("terms.title"),
      description: t("terms.description"),
    },
  };

  return metadata;
}

export default function Terms() {
  return (
    <>
      <HeaderSection />
      <PageContent />
    </>
  );
}
