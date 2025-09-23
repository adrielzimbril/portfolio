import React from "react";
import { MyProjectsSection } from "./sections/MyProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  //const t = await getTranslations();
  const t = (key: string) => key;

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("projects.title"),
    description: t("projects.description"),
    keywords: t("projects.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("projects.title"),
      description: t("projects.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("projects.title"),
      description: t("projects.description"),
    },
  };
  return metadata;
}

export default function MyProject() {
  return (
    <>
      <HeaderSection />
      {/* <MyProjectsSection /> */}
      <CallToAction isPage />
    </>
  );
}
