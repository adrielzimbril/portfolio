"use client";
import React from "react";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { PreviewContentType } from "@/types";
import { ResourceType } from "@/types/enum";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useTranslations } from "use-intl";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
  type,
  pageViewsData,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
  type?: ResourceType;
  pageViewsData: { slug: string; locale: string };
}) {
  const t = useTranslations();

  usePageViews(
    pageViewsData.slug,
    PageType.HUB,
    {
      locale: pageViewsData.locale,
      path: getResourcesUrl(PageType.HUB, pageViewsData.slug),
    },
    false
  );

  return (
    <ResourceHeaderSection
      sectionClassName="md:w-[90%] mx-auto"
      previewContent={
        cover
          ? {
              type: PreviewContentType.IMAGE,
              src: cover,
              alt: title,
            }
          : undefined
      }
      mainTitle={title}
      slug={pageViewsData.slug}
      description={description}
      tags={tags}
      type={type}
      ctaButton={pageViewsData.slug}
      ctaButtonText={`${t("common.button.obtain")} 🦄`}
    />
  );
}
