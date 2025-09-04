import { HeaderSection as ThoughtHeaderSection } from "@/components/shared/pages/thoughts/page/header-section";
import { PreviewContentType } from "@/types";

const metadataItems = { readTime: "08", views: "90k" };

export function HeaderSection({
  date,
  tags,
  cover,
  title,
}: {
  date: string;
  tags: { name: string }[];
  cover: string;
  title: string;
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
        minRead: metadataItems.readTime,
        views: metadataItems.views,
      }}
    />
  );
}
