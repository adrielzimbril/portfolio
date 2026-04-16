"use client";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import {
  ProjectCategories,
  ProjectTags,
} from "@/components/shared/pages/projects/tags";
import { cn } from "@/utils/utils";
import { getResourcesUrl } from "@/utils/base-url";
import { DEFAULT_COLOR_CODE_NAME_TYPE, PageType } from "@/types";
import { useTranslations } from "use-intl";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";

export function CardInfo({
  title,
  description,
  slug,
  tags,
  categories,
  isWide,
  hideReactions = false,
}: {
  title: string;
  description: string;
  slug: string;
  tags: { name: string }[];
  categories: { name: string; color: string }[];
  isWide: boolean;
  hideReactions?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 items-start justify-between gap-4 size-full",
        isWide && "justify-center",
      )}
    >
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <ProjectTags tags={tags.map((tag) => tag.name)} />

        <Header title={title} slug={slug} />

        <ProjectCategories
          categories={categories.map((category) => ({
            name: category.name,
            color: category.color as DEFAULT_COLOR_CODE_NAME_TYPE,
          }))}
        />

        <Description description={description} />
      </div>

      <div className="flex items-center justify-between w-full gap-3">
        {!hideReactions && (
          <ReactionBar
            pageType={PageType.PROJECT}
            entityId={slug}
            variant="dock"
            orientation="vertical"
          />
        )}
        <Action slug={slug} />
      </div>
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
    <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-b-white-invert-sec">
      {description}
    </p>
  );
}

function Action({ slug }: { slug: string }) {
  const t = useTranslations();
  return (
    <Link
      href={getResourcesUrl(PageType.PROJECT, slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        {t("common.button.see")}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
