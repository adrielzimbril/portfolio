import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { ElementHomeWorkContactSubsection } from "./sections/ElementHomeWorkContactSubsection";
import { HeaderSection } from "./sections/HeaderSection";
import { MoreInfoSection } from "./sections/MoreInfoSection";
import { ProjectListSection } from "./sections/ProjectListSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { getProjectWithAdjacent } from "@/module/content/utils/lib";
import { getActivePathFromUrlParam } from "@/utils/content";
import logger from "@/utils/logger";
import { setRequestLocale } from "next-intl/server";
import { PageParams } from "@/types";
import { getResourceWithAdjacent } from "@/module/content/utils/lib/resources";

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

  const slug = getActivePathFromUrlParam(path);
  const resource = await getResourceWithAdjacent(slug, { locale });

  if (!resource) {
    //return localeRedirect({ href: routes.projects.link, locale });
    logger.error(`Resource not found for slug: ${slug}`);
  }

  const { title, cover, created_at, tags, body, excerpt } =
    resource!.currentResource;

  return (
    <>
      <HeaderSection
        title={title}
        cover={cover ?? ""}
        description={excerpt}
        tags={tags}
      />
      {/* Projects Section */}
      <ProjectsSection />
      <ElementHomeWorkContactSubsection />
      <ProjectListSection />
      <MoreInfoSection />
      <CallToAction isPage />
    </>
  );
}
