import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HeaderSection } from "./sections/HeaderSection";
import { PeopleSection } from "./sections/PeopleSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("connections.title"),
    description: t("connections.description"),
    keywords: t("connections.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("connections.title"),
      description: t("connections.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("connections.title"),
      description: t("connections.description"),
    },
  };
}

export default function ConnectionsPage() {
  return (
    <>
      <HeaderSection />
      <PeopleSection />
      <CallToAction isPage />
    </>
  );
}
