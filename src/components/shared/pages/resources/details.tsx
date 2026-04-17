"use client";

import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { AvatarsStats } from "@/components/shared/pages/resources/avatar-stats";
import { Tags } from "@/components/shared/pages/resources/tags";
import { PageType, ResourceType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useProductSlugRequestsCount } from "@/hooks/useSubscriberStats";
import { useTranslations } from "use-intl";
import { ReactionBar } from "@/components/shared/pages/shared/reactions/ReactionBar";

export function CardInfo({
  title,
  slug,
  resourceType,
  tags,
  description,
  features,
  avatars,
  userCount,
  hideReactions = false,
}: {
  title: string;
  slug: string;
  resourceType: ResourceType;
  tags: { name: string }[];
  description: string;
  features: string[];
  avatars: string[];
  userCount?: number;
  hideReactions?: boolean;
}) {
  const t = useTranslations();
  const { count: avatarCount } = useProductSlugRequestsCount(slug);

  const productTypeMap: Record<ResourceType, string> = {
    [ResourceType.COURSE]: t(
      "common.page-sections.hub.base.resources-type.course.title",
    ),
    [ResourceType.EBOOK]: t(
      "common.page-sections.hub.base.resources-type.ebook.title",
    ),
    [ResourceType.VIDEO]: t(
      "common.page-sections.hub.base.resources-type.video.title",
    ),
    [ResourceType.MASTERCLASS]: t(
      "common.page-sections.hub.base.resources-type.masterclass.title",
    ),
    [ResourceType.FIGMA_TEMPLATE]: t(
      "common.page-sections.hub.base.resources-type.figma-template.title",
    ),
    [ResourceType.CODE]: t(
      "common.page-sections.hub.base.resources-type.code.title",
    ),
  };

  const productType = productTypeMap[resourceType] ?? "";

  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={slug} />

        <Tags primaryTag={productType} tags={tags.map((tag) => tag.name)} />

        <Description description={description} features={features} />

        <AvatarsStats
          avatars={avatarCount < 1 ? [""] : ["", "", "", "", "", "", "", ""]}
          userCount={avatarCount ?? userCount}
          resourceType={resourceType}
        />
      </div>

      <div className="flex items-center justify-between w-full gap-3 mt-auto">
        {!hideReactions && (
          <div className="flex-1">
            <ReactionBar pageType={PageType.HUB} entityId={slug} compact />
          </div>
        )}
        <Action slug={slug} resourceType={resourceType} />
      </div>
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getResourcesUrl(PageType.HUB, slug)}>
      <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
        {title}
      </h3>
    </Link>
  );
}

function Description({
  description,
  features,
}: {
  description: string;
  features: string[];
}) {
  return (
    <>
      <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-b-white-invert-sec">
        {description}
      </p>

      <p className="w-full relative text-base text-b-white-invert-thr leading-6 whitespace-pre-line">
        {features.slice(0, 4).map((feature) => (
          <span key={feature} className="ml-2 md:ml-4 block">
            - {feature}
          </span>
        ))}
      </p>
    </>
  );
}

function Action({
  slug,
  resourceType,
}: {
  slug: string;
  resourceType: ResourceType;
}) {
  const t = useTranslations();

  const productTypeMap: Record<ResourceType, string> = {
    [ResourceType.COURSE]: t(
      "common.page-sections.hub.base.resources-type.course.button",
    ),
    [ResourceType.EBOOK]: t(
      "common.page-sections.hub.base.resources-type.ebook.button",
    ),
    [ResourceType.VIDEO]: t(
      "common.page-sections.hub.base.resources-type.video.button",
    ),
    [ResourceType.MASTERCLASS]: t(
      "common.page-sections.hub.base.resources-type.masterclass.button",
    ),
    [ResourceType.FIGMA_TEMPLATE]: t(
      "common.page-sections.hub.base.resources-type.figma-template.button",
    ),
    [ResourceType.CODE]: t(
      "common.page-sections.hub.base.resources-type.code.button",
    ),
  };

  const productType = productTypeMap[resourceType] ?? "";
  return (
    <Link
      href={getResourcesUrl(PageType.HUB, slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        {productType}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
