import React from "react";
import { getLocale } from "next-intl/server";
import { PageParams } from "@/types";
import {
  getResourceWithAdjacent,
  getResourceBySlug,
} from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/routes";
import { GetResource } from "@/components/shared/pages/resources/get-resource";
import { Metadata } from "next";
import { PageType } from "@/types";
import { getImageUrl, getResourcesUrl } from "@/utils";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const locale = await getLocale();
  const resource = await getResourceBySlug(slug, { locale });

  const metadata: Metadata = {
    title: resource?.title,
    description: resource?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: resource?.title,
      description: resource?.excerpt,
      images: [
        getImageUrl(resource?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: resource?.title,
      description: resource?.excerpt,
      images: [
        getImageUrl(resource?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
  };

  return metadata;
}

export default async function SubShopGet(props: {
  params: Promise<PageParams>;
}) {
  const { slug } = await props.params;

  const locale = await getLocale();

  const resource = await getResourceWithAdjacent(slug, { locale });

  if (!resource) {
    return localeRedirect({ href: routes.projects.link, locale });
  }

  const { title, tags, excerpt, type, created_at, id } =
    resource!.currentResource;

  return (
    <>
      <GetResource
        id={id}
        title={title}
        slug={slug}
        tags={tags}
        excerpt={excerpt}
        type={type}
        created_at={created_at}
      />
    </>
  );
}
