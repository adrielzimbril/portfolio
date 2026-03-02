"use client";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { getExternalUrl } from "@/utils/base-url";
import { getMachineDate } from "@/utils/format-date";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types/default";

export function CardInfo({
  title,
  excerpt,
  date,
  tags,
  action,
}: {
  title: string;
  excerpt: string;
  date: string;
  tags: { name: string }[];
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  const [currentTime] = useState(() => Date.now());
  const isDatePast = currentTime >= new Date(getMachineDate(date)).getTime();
  const isToday =
    new Date(getMachineDate(date)).getDate() === new Date().getDate();
  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={action?.href ?? ""} />
        {tags && (
          <Tags
            primaryTag={`${
              date ?? tags[0]?.name
            } ${isToday ? " • Aujourd'hui" : ""}`}
            primaryTagColor={
              isDatePast
                ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                : isToday
                  ? DEFAULT_COLOR_CODE_NAME_LIST.YELLOW
                  : DEFAULT_COLOR_CODE_NAME_LIST.BLUE
            }
            className="capitalize"
            tags={[
              // First tag: date status
              isToday ? "Aujourd'hui" : isDatePast ? "Passé" : "À venir",
              // Then the other tags
              ...tags.slice(date ? 0 : 1, date ? 4 : 5).map((tag) => tag.name),
            ]}
          />
        )}
        <Description description={excerpt} />
      </div>

      {action ? <Action label={action.label} href={action.href} /> : null}
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getExternalUrl(slug)}>
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
