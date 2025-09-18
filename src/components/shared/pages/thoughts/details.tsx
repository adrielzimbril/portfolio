"use client";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { getResourcesUrl } from "@/utils/base-url";
import { PageType } from "@/types";
import { useTranslations } from "use-intl";

export function CardInfo({
  title,
  excerpt,
  primaryTag,
  tags,
  slug,
  created_at,
}: {
  title: string;
  excerpt: string;
  primaryTag?: string;
  tags: { name: string }[];
  slug: string;
  created_at: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={slug} />

        {tags && (
          <Tags
            primaryTag={primaryTag ?? tags[0]?.name}
            tags={tags
              .slice(primaryTag ? 0 : 1, primaryTag ? 4 : 5)
              .map((tag) => tag.name)}
          />
        )}

        <Description description={excerpt} />
      </div>

      <Action slug={slug} />
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getResourcesUrl(PageType.THOUGHT, slug)}>
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
      href={getResourcesUrl(PageType.THOUGHT, slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        {t("common.button.read")}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
