import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import { getActivePathFromUrlParam } from "@/utils/content";
import { setRequestLocale } from "next-intl/server";
import { PageParams, PageType } from "@/types";
import { getResourceWithAdjacent } from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/route";
import {
  ProductTypeSubscribersBadge,
  ProductTitleRequestsBadge,
} from "@/components/SubscriberBadges";

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
        requestsNode={
          <div className="flex gap-2 flex-wrap">
            {type ? <ProductTypeSubscribersBadge type={type as any} /> : null}
            {title ? <ProductTitleRequestsBadge title={title} /> : null}
          </div>
        }
        pageViewsData={{ path, slug, locale }}
      />
      <ProjectDetailsSection content={body || ""} />
      <MorePreviewSection data={resource!.adjacentResources} />
      <CallToAction isPage />
    </>
  );
}
