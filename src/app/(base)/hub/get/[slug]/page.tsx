import React from "react";
import { getActivePathFromUrlParam } from "@/utils/route-utils";
import { getLocale, setRequestLocale } from "next-intl/server";
import { PageParams } from "@/types";
import {
  getResourceWithAdjacent,
  getResourceBySlug,
} from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/route";
import { GetResource } from "@/components/shared/pages/resources/get-resource";
import { Metadata } from "next";
import { PageType } from "@/types";
import { getImageUrl, getResourcesUrl } from "@/utils";

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const params = await props.params;

  const { path } = params;

  const locale = await getLocale();
  const slug = getActivePathFromUrlParam(path);
  const resource = await getResourceBySlug(slug, { locale });

  return {
    title: resource?.title,
    description: resource?.excerpt,
    openGraph: {
      title: resource?.title,
      description: resource?.excerpt,
      images: [
        getImageUrl(resource?.cover ?? ""),
        getResourcesUrl(
          PageType.HUB,
          `${slug}/opengraph-image?${new Date().getTime()}`
        ),
      ],
    },
  };
}

export default async function SubShopGet(props: {
  params: Promise<PageParams>;
}) {
  const { path } = await props.params;

  const locale = await getLocale();

  const slug = getActivePathFromUrlParam(path);
  const resource = await getResourceWithAdjacent(slug, { locale });

  if (!resource) {
    return localeRedirect({ href: routes.projects.link, locale });
  }

  const {
    title,
    cover,
    tags,
    features,
    excerpt,
    type,
    created_at,
    body,
    id,
    content,
    tags_id,
    published,
  } = resource!.currentResource;

  return (
    <>
      <GetResource
        id={id}
        title={title}
        cover={cover}
        tags={tags}
        features={features}
        excerpt={excerpt}
        type={type}
        created_at={created_at}
        path={path}
        locale={locale}
        slug={slug}
      />
    </>
  );
}
