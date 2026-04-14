import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HeaderSection } from "./sections/HeaderSection";
import { SetupSection } from "./sections/SetupSection";
import { ToolsSection } from "./sections/ToolsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("tools.title"),
    description: t("tools.description"),
    keywords: t("tools.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("tools.title"),
      description: t("tools.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("tools.title"),
      description: t("tools.description"),
    },
  };
}

export default async function ToolsPage() {
  return (
    <>
      <HeaderSection />
      <SetupSection />
      <ToolsSection />
      <CallToAction isPage />
    </>
  );
}
