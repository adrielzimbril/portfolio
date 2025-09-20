"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  useNewsletterSubscribersCount,
  useProductTypeSubscribersCount,
  useProductTitleRequestsCount,
} from "@/hooks/useSubscriberStats";
import { Box, GiftBoxOne, UsersGroup } from "@aurthle/icons";
import { ResourceType } from "@/types";
import { AvatarsStats } from "@/components/shared/pages/resources/avatar-stats";
import { cn } from "@/utils";
import { useTranslations } from "use-intl";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K`;
  return `${n}`;
}

export function NewsletterSubscribersBadge() {
  const { count, loading } = useNewsletterSubscribersCount();
  return (
    <Badge className="squircle squircle-violet-100" variant="colored">
      <span className="flex items-center gap-2">
        <UsersGroup size={16} className="text-indigo-400" variant="bulk" />
        {loading ? "..." : `${formatCount(count ?? 0)} abonnés`}
      </span>
    </Badge>
  );
}

export function ProductTypeSubscribersBadge({ type }: { type: ResourceType }) {
  const { count, loading } = useProductTypeSubscribersCount(type);
  return (
    <Badge className="squircle squircle-emerald-100" variant="colored">
      <span className="flex items-center gap-2">
        <Box size={16} className="text-emerald-500" variant="bulk" />
        {loading ? "..." : `${formatCount(count ?? 0)} demandes ${type}`}
      </span>
    </Badge>
  );
}

export function ProductTitleRequestsBadge({
  title,
  type,
}: {
  title: string;
  type?: ResourceType;
}): JSX.Element | null {
  if (!type) return null;
  const t = useTranslations();
  const { count, loading } = useProductTitleRequestsCount(title);

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

  const productType = productTypeMap[type] ?? "";

  return (
    <Badge className="squircle squircle-amber-100" variant="colored">
      <span className="flex items-center gap-1">
        <GiftBoxOne size={16} className="text-amber-600" variant="bulk" />
        {loading ? (
          <span className="animate-pulse transition-all ease-in-out duration-200">
            🤯
          </span>
        ) : (
          `${formatCount(count ?? 0)} ${productType}`
        )}
      </span>
    </Badge>
  );
}

export function ProductAvatarsStats({
  title,
  type,
  colorName,
}: {
  title: string;
  type: ResourceType;
  colorName?: string;
}) {
  const { count, loading } = useProductTitleRequestsCount(title);
  return (
    <AvatarsStats
      userCount={count ?? 0}
      avatars={
        count < 1
          ? ["image1"]
          : [
              "image1",
              "image2",
              "image3",
              "image4",
              "image5",
              "image6",
              "image7",
              "image8",
            ]
      }
      resourceType={type}
      colorName={cn(colorName ?? "squircle-b-base")}
    />
  );
}

