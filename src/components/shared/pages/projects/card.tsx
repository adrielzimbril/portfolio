import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/projects/details";
import { cn } from "@/utils/utils";
import { ProjectPreviewCardInfoProps } from "@/types/type";

export function ProjectCard({
  title,
  cover,
  description,
  slug,
  tags,
  categories,
  isWide,
}: {
  title: string;
  cover?: string;
  description: string;
  slug: string;
  tags: { name: string }[];
  categories: { name: string; color: string }[];
  isWide: boolean;
}) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden size-full",
        isWide && "md:flex-row md:col-span-2"
      )}
    >
      <CardContent
        className={cn(
          `flex flex-col px-6 md:px-8 py-8 md:py-10 gap-4 h-full w-full`,
          isWide && "md:flex-row"
        )}
      >
        <CardPreview title={title} cover={cover} isWide={isWide} />
        <CardInfo
          title={title}
          cover={cover}
          description={description}
          slug={slug}
          tags={tags}
          categories={categories}
          isWide={isWide}
        />
      </CardContent>
    </Card>
  );
}
