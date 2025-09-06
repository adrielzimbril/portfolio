"use client";
import { HeaderSection as ThoughtHeaderSection } from "@/components/shared/pages/thoughts/page/header-section";
import { PreviewContentType } from "@/types";
import { useRouter } from "next/router";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";

export function HeaderSection({
  title,
  cover,
  tags,
  date,
  readingTime,
  viewsNode,
  pageViewsData,
}: {
  date: string;
  tags: { name: string }[];
  cover: string;
  title: string;
  readingTime: string;
  viewsNode?: React.ReactNode;
  pageViewsData: { slug: string; locale: string };
}) {
  const router = useRouter();
  const { count, loading } = usePageViews(
    getResourcesUrl(PageType.THOUGHT, pageViewsData.slug),
    pageViewsData.slug,
    PageType.THOUGHT,
    {
      locale: pageViewsData.locale,
      router: router.route,
    }
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
      articleDetails={{
        date,
        readingTime,
        views: count ?? 0,
      }}
      viewsNode={viewsNode}
    />
  );
}
