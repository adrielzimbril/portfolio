"use client";

import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { AvatarsStats } from "@/components/shared/pages/quests/avatar-stats";
import { Tags } from "@/components/shared/pages/quests/tags";
import { PageType, ResourceType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useProductSlugRequestsCount } from "@/hooks/useSubscriberStats";
import { useTranslations } from "use-intl";

export function CardInfo({
  title,
  slug,
  //resourceType,
  tags,
  description,
  features,
  //avatars,
  userCount,
  action,
}: {
  title: string;
  slug: string;
  //resourceType: ResourceType;
  tags: { name: string; meta?: Record<string, any> }[];
  description: string;
  features: string[];
  //avatars: string[];
  userCount?: number;
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  const t = useTranslations();
  const { count: avatarCount } = useProductSlugRequestsCount(slug);

  return (
    <div className="flex flex-col items-start justify-between gap-4 w-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={slug} />

        <Tags
          primaryTag={tags[0]?.name}
          primaryTagColor={tags[0]?.meta?.color}
          secondaryTag={tags[1]?.name}
          secondaryTagColor={tags[1]?.meta?.color}
          className="capitalize"
          tags={tags.slice(2, 4).map((tag) => tag.name)}
        />

        <Description description={description} features={features} />

        {/* <AvatarsStats
          avatars={avatarCount < 1 ? [""] : ["", "", "", "", "", "", "", ""]}
          userCount={avatarCount ?? userCount}
          resourceType={resourceType}
        /> */}
      </div>

      {action ? <Action label={action.label} href={action.href} /> : null}
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

function Action({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} likeButton whileTap size="xs" asIcon>
      <span className="flex items-center gap-1">
        {label}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}

