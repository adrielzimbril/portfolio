"use client";

import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/quests/tags";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useQuestParticipantsStats } from "@/hooks/useSubscriberStats";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import BoringAvatar from "boring-avatars";
import { pickRandomColorCode } from "@/utils";
import { useMemo } from "react";

export function CardInfo({
  title,
  slug,
  tags,
  description,
  features,
  action,
}: {
  title: string;
  slug: string;
  tags: { name: string; meta?: Record<string, any> }[];
  description: string;
  features: string[];
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  const { stats } = useQuestParticipantsStats(slug);

  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
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

        {stats.totalParticipants > 0 ? (
          <ParticipantsStats
            total={stats.totalParticipants}
            registered={stats.registered}
            submitted={stats.submitted}
          />
        ) : null}
      </div>

      {action ? <Action label={action.label} href={action.href} /> : null}
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getResourcesUrl(PageType.QUESTS, slug)}>
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

function ParticipantsStats({
  total,
  registered,
  submitted,
}: {
  total: number;
  registered: number;
  submitted: number;
}) {
  const visibleCount = Math.min(total, 5);
  const colorSets = useMemo(
    () =>
      Array.from({ length: visibleCount }).map(() =>
        Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff"),
      ),
    [visibleCount],
  );

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-sh-white/99">
        <div className="inline-flex items-start">
          <AvatarGroup numPeople={total}>
            {Array.from({ length: visibleCount }).map((_, index) => (
              <Avatar key={index} className="w-6 h-6">
                <AvatarFallback className="relative pointer-events-none">
                  <BoringAvatar
                    name={`quest-participant-${index + 1}`}
                    colors={colorSets[index] ?? []}
                    variant="beam"
                  />
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
        <span className="relative flex items-center gap-1 ps-2 font-bold text-sm text-b-white-invert-sec">
          {total} participants
        </span>
      </div>

      {/* <p className="text-xs text-b-white-invert-thr ps-2">
        {registered} inscrits • {submitted} soumis
      </p> */}
    </div>
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

