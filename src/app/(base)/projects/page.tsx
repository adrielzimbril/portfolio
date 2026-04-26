import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "@/app/(base)/projects/sections/HeaderSection";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllProjects } from "@/integrations/content/lib";
import { MyProjectsSection } from "@/app/(base)/projects/sections/MyProjectsSection";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Skeleton name="projects-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      {data.length > 0 && (
        <Skeleton name="projects-listing" loading={false}>
          <MyProjectsSection data={data} />
        </Skeleton>
      )}
      {/* <ResourceWrapper initialData={data} type={PageType.PROJECT} /> */}
      <Skeleton name="projects-cta" loading={false}>
        <CallToAction isPage />
      </Skeleton>
    </>
  );
}
