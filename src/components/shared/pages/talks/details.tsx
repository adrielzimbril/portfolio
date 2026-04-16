"use client";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { getExternalUrl } from "@/utils/base-url";
import { getMachineDate } from "@/utils/format-date";
import { DEFAULT_COLOR_CODE_NAME } from "@/types/default";
import { pickRandomColorCode } from "@/utils";
import BoringAvatar from "boring-avatars";
import { useTranslations } from "use-intl";

export function CardInfo({
  title,
  excerpt,
  date,
  tags,
  participantsCount,
  action,
}: {
  title: string;
  excerpt: string;
  date: string;
  tags: { name: string }[];
  participantsCount: number;
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  const [currentTime] = useState(() => Date.now());
  const t = useTranslations();
  const isDatePast = currentTime >= new Date(getMachineDate(date)).getTime();
  const isToday =
    new Date(getMachineDate(date)).getDate() === new Date().getDate();
  const shouldShow = isDatePast || isToday || participantsCount > 0;

  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={action?.href ?? ""} />
        {tags && (
          <Tags
            primaryTag={date ?? tags[0]?.name}
            primaryTagColor={
              isDatePast
                ? DEFAULT_COLOR_CODE_NAME.RED
                : isToday
                  ? DEFAULT_COLOR_CODE_NAME.YELLOW
                  : DEFAULT_COLOR_CODE_NAME.BLUE
            }
            secondaryTag={
              isToday
                ? t("talks.card.status.today")
                : isDatePast
                  ? t("talks.card.status.completed")
                  : t("talks.card.status.upcoming")
            }
            secondaryTagColor={
              isDatePast
                ? DEFAULT_COLOR_CODE_NAME.ORANGE
                : isToday
                  ? DEFAULT_COLOR_CODE_NAME.PURPLE
                  : DEFAULT_COLOR_CODE_NAME.GREEN
            }
            className="capitalize"
            tags={tags.map((tag) => tag.name)}
          />
        )}
        <Description description={excerpt} />
        {shouldShow ? <ParticipantsStats count={participantsCount} /> : null}
      </div>

      {action ? <Action label={action.label} href={action.href} /> : null}
    </div>
  );
}

function ParticipantsStats({ count }: { count: number }) {
  const t = useTranslations();
  const visibleCount = Math.min(count, 5);
  const colorSets = Array.from({ length: visibleCount }).map(() =>
    Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff"),
  );

  return (
    <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-sh-white/99">
      <div className="inline-flex items-start">
        <AvatarGroup numPeople={count}>
          {Array.from({ length: visibleCount }).map((_, index) => (
            <Avatar key={index} className="w-6 h-6">
              <AvatarFallback className="relative pointer-events-none">
                <BoringAvatar
                  name={`participant-${index + 1}`}
                  colors={colorSets[index] ?? []}
                  variant="beam"
                />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <span className="relative flex items-center gap-1 ps-2 font-bold text-sm text-b-white-invert-sec">
        {t("talks.card.participants", { count })}
      </span>
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
