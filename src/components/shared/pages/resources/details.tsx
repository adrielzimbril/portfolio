"use client";

import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { AvatarsStats } from "@/components/shared/pages/resources/avatar-stats";
import { Tags } from "@/components/shared/pages/resources/tags";
import { PageType, ResourceType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useProductTitleRequestsCount } from "@/hooks/useSubscriberStats";
import { useTranslations } from "use-intl";

export function CardInfo({
  title,
  slug,
  resourceType,
  tags,
  description,
  features,
  avatars,
  userCount,
}: {
  title: string;
  slug: string;
  resourceType: ResourceType;
  tags: { name: string }[];
  description: string;
  features: string[];
  avatars: string[];
  userCount: number;
}) {
  const t = useTranslations();
  const { count: avatarCount, loading: avatarCountLoading } =
    useProductTitleRequestsCount(title);

      const productTypeMap: Record<ResourceType, string> = {
        [ResourceType.COURSE]: t(
          "common.page-sections.hub.base.resources-type.course.badge"
        ),
        [ResourceType.EBOOK]: t(
          "common.page-sections.hub.base.resources-type.ebook.badge"
        ),
        [ResourceType.VIDEO]: t(
          "common.page-sections.hub.base.resources-type.video.badge"
        ),
        [ResourceType.MASTERCLASS]: t(
          "common.page-sections.hub.base.resources-type.masterclass.badge"
        ),
        [ResourceType.FIGMA_TEMPLATE]: t(
          "common.page-sections.hub.base.resources-type.figma-template.badge"
        ),
        [ResourceType.CODE]: t(
          "common.page-sections.hub.base.resources-type.code.badge"
        ),
      };

      const productType = productTypeMap[resourceType] ?? "";

      return (
        <div className="flex flex-col items-start justify-between gap-4 w-full">
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <Header title={title} slug={slug} />

            <Tags primaryTag={productType} tags={tags.map((tag) => tag.name)} />

            <Description description={description} features={features} />

            <AvatarsStats
              avatars={
                avatarCount < 1
                  ? ["image1"]
                  : (avatars ?? [
                      "image1",
                      "image2",
                      "image3",
                      "image4",
                      "image5",
                      "image6",
                      "image7",
                      "image8",
                    ])
              }
              userCount={avatarCount ?? userCount}
              resourceType={resourceType}
            />
          </div>

          <Action slug={slug} resourceType={resourceType} />
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
  return (
    <Link
      href={getResourcesUrl(PageType.HUB, slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        {resourceType === ResourceType.COURSE
          ? t("common.page-sections.hub.base.resources-type.course.button")
          : resourceType === ResourceType.EBOOK
            ? t("common.page-sections.hub.base.resources-type.ebook.button")
            : t(
                "common.page-sections.hub.base.resources-type.masterclass.button"
              )}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
