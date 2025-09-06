import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import { getActivePathFromUrlParam } from "@/utils/content";
import { setRequestLocale } from "next-intl/server";
import { PageParams } from "@/types";
import { getResourceWithAdjacent } from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/route";
import { ResourceType } from "@/types/enum";

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

  const slug = getActivePathFromUrlParam(path);
  const resource = await getResourceWithAdjacent(slug, { locale });

  if (!resource) {
    return localeRedirect({ href: routes.projects.link, locale });
  }

  const { title, cover, tags, body, excerpt, type } = resource!.currentResource;

  return (
    <>
      <HeaderSection
        title={title}
        cover={cover ?? ""}
        description={excerpt}
        type={type}
        tags={tags}
      />
      <ProjectDetailsSection content={body || ""} />
      <MorePreviewSection data={resource!.adjacentResources} />
      <CallToAction isPage />
    </>
  );
}
