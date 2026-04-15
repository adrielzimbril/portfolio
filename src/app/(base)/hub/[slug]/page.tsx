import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ResourceDetailsSection } from "./sections/ResourceDetailsSection";
import { getLocale } from "next-intl/server";
import { PageParams } from "@/types";
import {
  getResourceWithAdjacent,
  getResourceBySlug,
} from "@/integrations/content/lib/resources";
import { localeRedirect } from "@/integrations/i18n/routing";
import { routes } from "@/data/routes";
import { getImageUrl } from "@/utils/base-url";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const locale = await getLocale();
  const resource = await getResourceBySlug(slug, { locale });
  const metadata: Metadata = {
    title: resource?.title,
    description: resource?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: resource?.title,
      description: resource?.excerpt,
      images: [getImageUrl(resource?.cover ?? "opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: resource?.title,
      description: resource?.excerpt,
      images: [getImageUrl(resource?.cover ?? "opengraph-image.png")],
    },
  };

  return metadata;
}

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;

  const locale = await getLocale();

  const resource = await getResourceWithAdjacent(slug, { locale });

  if (!resource) {
    return localeRedirect({ href: routes.hub.link, locale });
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
        pageViewsData={{ slug, locale }}
        slug={slug}
      />
      <ResourceDetailsSection content={body || ""} />
      {resource!.adjacentResources.length > 0 && (
        <MorePreviewSection data={resource!.adjacentResources} />
      )}
      <CallToAction isPage />
    </>
  );
}
