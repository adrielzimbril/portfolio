import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllProjects } from "@/module/content/utils/lib";
import { ResourceWrapper } from "@/components/shared/pages/shared/resource-wrapper";
import { PageType } from "@/types";
import { MyProjectsSection } from "./sections/MyProjectsSection";

export async function generateMetadata() {
  const t = await getTranslations();

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

export default async function MyProject() {
  const data = await getAllProjects().catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <HeaderSection />
      <MyProjectsSection data={data} />
      {/* <ResourceWrapper initialData={data} type={PageType.PROJECT} /> */}
      <CallToAction isPage />
    </>
  );
}
