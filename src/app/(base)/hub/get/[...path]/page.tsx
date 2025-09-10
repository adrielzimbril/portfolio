import React from "react";
import { getActivePathFromUrlParam } from "@/utils/format-content";
import { setRequestLocale } from "next-intl/server";
import { PageParams } from "@/types";
import { getResourceWithAdjacent } from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/route";
import { GetResource } from "@/components/shared/pages/resources/get-resource";

export default async function SubShopGet(props: {
  params: Promise<PageParams>;
}) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

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
        content={content}
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
