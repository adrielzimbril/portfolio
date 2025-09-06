"use client";

import React from "react";
import { routes } from "@/data/route";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { PreviewContentType } from "@/types";
import { ResourceType } from "@/types/enum";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { useRouter } from "next/router";
import { getResourcesUrl } from "@/utils/base-url";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
  type,
  requestsNode,
  pageViewsData,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
  type?: ResourceType;
  requestsNode?: React.ReactNode;
  pageViewsData: { slug: string; locale: string };
}) {
  const router = useRouter();

  usePageViews(
    getResourcesUrl(PageType.HUB, pageViewsData.slug),
    pageViewsData.slug,
    PageType.HUB,
    {
      locale: pageViewsData.locale,
      router: router,
    }
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
      description={description}
      tags={tags}
      type={type}
      extraNode={requestsNode}
      ctaButton={routes.contact.link}
      ctaButtonText="Obtenir 🦄"
    />
  );
}
