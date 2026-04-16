import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/projects/details";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";

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
        "flex flex-col items-center justify-center squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden size-full",
        isWide && "md:flex-row md:col-span-2",
      )}
    >
      <CardContent
        className={cn(
          `flex flex-col px-6 md:px-8 py-8 md:py-10 gap-4 size-full`,
          isWide ? "md:flex-row" : "grid-rows-[auto_1fr]",
        )}
      >
        <CardPreview
          title={title}
          slug={slug}
          cover={cover}
          isWide={isWide}
          type={PageType.PROJECT}
          coverText={{
            emoji: "🧑🏻‍🚀",
            title: title,
            description: description,
          }}
        />
        <CardInfo
          title={title}
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

export function ProjectCardSkeleton({ isWide = false }: { isWide?: boolean }) {
  return (
    <Skeleton
      name={isWide ? "project-card-wide" : "project-card"}
      className={isWide ? "w-full h-64 md:col-span-2" : "w-full h-96"}
    />
  );
}

export function InnerStatementCardSkeleton() {
  return <Skeleton name="inner-statement-card" className="w-full h-32" />;
}
