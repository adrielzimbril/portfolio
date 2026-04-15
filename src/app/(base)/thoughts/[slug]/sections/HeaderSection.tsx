"use client";
import { HeaderSection as ThoughtHeaderSection } from "@/components/shared/pages/thoughts/page/header-section";
import { PreviewContentType } from "@/types";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";

export function HeaderSection({
  title,
  cover,
  tags,
  date,
  readingTime,
  pageViewsData,
}: {
  date: string;
  tags: { name: string }[];
  cover: string;
  title: string;
  readingTime: string;
  pageViewsData: { slug: string; locale: string };
  pageType: PageType;
}) {
  const { count } = usePageViews(
    pageViewsData.slug,
    pageType,
    {
      locale: pageViewsData.locale,
      path: getResourcesUrl(pageType, pageViewsData.slug),
    },
    true,
  );

  return (
    <ThoughtHeaderSection
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
      tags={tags}
      thoughtDetails={{
        date,
        readingTime,
        views: count ?? 0,
      }}
      slug={slug}
    />
  );
}
