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
  type: ResourceType;
}) {
  const { count, loading } = useProductTitleRequestsCount(title);
  const productType =
    type === ResourceType.COURSE
      ? "Étudiants 🧑‍🎓"
      : type === ResourceType.EBOOK
        ? "Lecteurs 📖"
        : "Vues 🍿";
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
}: {
  title: string;
  type: ResourceType;
}) {
  const { count, loading } = useProductTitleRequestsCount(title);
  return (
    <AvatarsStats
      userCount={count ?? 0}
      resourceType={type}
      colorName="squircle-zinc-100"
    />
  );
}

