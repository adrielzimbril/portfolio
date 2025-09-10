import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { routes } from "@/data/route";
import {
  ProjectCategories,
  ProjectTags,
} from "@/components/shared/pages/projects/tags";
import { cn } from "@/utils/utils";
import { ProjectPreviewCardInfoProps } from "@/types/type";
import { getResourcesUrl } from "@/utils/base-url";
import { DEFAULT_CATEGORY_COLOR_NAME } from "@/types";
import { PageType } from "@/types";

export function CardInfo({
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
    <div
      className={cn(
        "flex flex-col flex-1 items-start justify-between gap-4 w-full",
        isWide && "justify-center"
      )}
    >
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <ProjectTags tags={tags.map((tag) => tag.name)} />

        <Header title={title} slug={slug} />

        <ProjectCategories
          categories={categories.map((category) => ({
            name: category.name,
            color: category.color as DEFAULT_CATEGORY_COLOR_NAME,
          }))}
        />

        <Description description={description} />
      </div>

      <Action slug={slug} />
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getResourcesUrl(PageType.PROJECT, slug)}>
      <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
        {title}
      </h3>
    </Link>
  );
}

function Description({ description }: { description: string }) {
  return (
    <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-zinc-600">
      {description}
    </p>
  );
}

function Action({ slug }: { slug: string }) {
  return (
    <Link
      href={getResourcesUrl(PageType.PROJECT, slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        Voir
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
