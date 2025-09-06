"use client";
import React from "react";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { PreviewContentType } from "@/types/enum";
import { useRouter } from "next/navigation";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
  projectLink,
  pageViewsData,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
  projectLink?: string;
  pageViewsData: { path: string; slug: string; locale: string };
}) {
  const router = useRouter();

  usePageViews(pageViewsData.path, pageViewsData.slug, PageType.PROJECT, {
    locale: pageViewsData.locale,
    router: router,
  });

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
      ctaButton={projectLink ?? undefined}
      ctaButtonText="Voir le projet 🦄"
    />
  );
}
