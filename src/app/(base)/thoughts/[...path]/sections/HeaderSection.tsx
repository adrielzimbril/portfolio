import { HeaderSection as ThoughtHeaderSection } from "@/components/shared/pages/thoughts/page/header-section";
import { PreviewContentType } from "@/types";

export function HeaderSection({
  title,
  cover,
  tags,
  date,
  readingTime,
  views,
  viewsNode,
}: {
  date: string;
  tags: { name: string }[];
  cover: string;
  title: string;
  readingTime: string;
  views: number;
  viewsNode?: React.ReactNode;
}) {
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
        views,
      }}
      viewsNode={viewsNode}
    />
  );
}
