import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyHubSection } from "./sections/MyHubSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("hub.title"),
    description: t("hub.description"),
    keywords: t("hub.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("hub.title"),
      description: t("hub.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("hub.title"),
      description: t("hub.description"),
    },
  };

  return metadata;
}

export default function MyHub() {
  return (
    <>
      <HeaderSection />
      <MyHubSection />
      <CallToAction isPage />
    </>
  );
}
