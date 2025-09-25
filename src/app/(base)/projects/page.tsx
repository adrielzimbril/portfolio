import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllProjects } from "@/module/content/utils/lib";
import { MyProjectsSection } from "./sections/MyProjectsSection";

export async function generateMetadata(): Promise<Metadata> {
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
  const locale = await getLocale();
  const data = await getAllProjects({ locale }).catch((err) => {
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
