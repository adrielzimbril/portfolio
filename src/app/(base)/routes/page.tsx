import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeaderSection } from "./sections/HeaderSection";
import { RoutesSection } from "./sections/RoutesSection";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("routes.title"),
    description: t("routes.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("routes.title"),
      description: t("routes.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("routes.title"),
      description: t("routes.description"),
    },
  };

  return metadata;
}

export default function Routes() {
  return (
    <>
      <HeaderSection />
      <RoutesSection />
    </>
  );
}
