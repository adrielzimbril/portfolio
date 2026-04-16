"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BoringAvatar from "boring-avatars";
import { getExternalUrl, getImageUrl } from "@/utils/base-url";
import { Tags } from "@/components/shared/pages/quests/tags";
import { DEFAULT_COLOR_CODE_NAME } from "@/types/default";
import { cn, pickRandomColorCode } from "@/utils";
import { useMemo } from "react";
import { LinkDiagonalOne } from "@aurthle/icons";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import type { Quest } from "@/integrations/content/lib/quests";
import { useTranslations } from "use-intl";

type Winner = NonNullable<Quest["winners"]>[number];

function OverlayTag({ label, tooltip }: { label: string; tooltip?: string }) {
  if (!tooltip) {
    return (
      <Badge className="relative">
        <span className="text-xl">{label}</span>
      </Badge>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge className="relative rounded-full cursor-pointer px-2 py-2">
          <span className="text-2xl">{label}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function WinnerCard({ participant }: { participant: Winner }) {
  const t = useTranslations();
  const workUrl = getExternalUrl(participant.work_url);
  const profileUrl = getExternalUrl(participant.profile_url);
  const WINNER_NUMBER = 3;

  const colorSets: string[][] = useMemo(() => {
    return Array.from({ length: WINNER_NUMBER }).map(() =>
      Array.from({ length: 4 }).map(() => pickRandomColorCode() ?? "#ffffff"),
    );
  }, [WINNER_NUMBER]);

  const rankBadge =
    participant.rank === 1
      ? { emoji: "🥇", label: t("quests.participants.rank.first") }
      : participant.rank === 2
        ? { emoji: "🥈", label: t("quests.participants.rank.second") }
        : participant.rank === 3
          ? { emoji: "🥉", label: t("quests.participants.rank.third") }
          : {
              emoji: "🏆",
              label: t("quests.participants.rank.other", {
                rank: participant.rank,
              }),
            };

  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <div className="relative min-h-52 md:min-h-72 squircle squircle-smooth-xl squircle-3xl squircle-sh-white overflow-hidden">
          <div
            className={cn(
              "flex relative flex-col flex-1 min-h-32 md:min-h-60 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden",
              "p-2 h-48 md:h-80",
            )}
          >
            <Link href={workUrl} className="flex size-full">
              <div className="flex flex-col items-start gap-3 w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl">
                <Image
                  width={1200}
                  height={630}
                  className="size-full h-48 md:h-72 object-cover transition-all duration-800 ease hover:scale-105"
                  alt={participant.name}
                  src={getImageUrl(participant.work_cover)}
                />
              </div>
            </Link>
            <div className="absolute top-2 right-2 flex flex-wrap gap-2 justify-end">
              <OverlayTag label={rankBadge.emoji} tooltip={rankBadge.label} />
              {participant.pixel_perfect && (
                <OverlayTag
                  label="🎖️"
                  tooltip={t("quests.participants.badges.pixelPerfect")}
                />
              )}
              {participant.jury_favorite && (
                <OverlayTag
                  label="❤️"
                  tooltip={t("quests.participants.badges.juryFavorite")}
                />
              )}
            </div>
          </div>
        </div>

        {(participant.pixel_perfect ||
          participant.original_idea ||
          (participant.tags?.length ?? 0) > 0) && (
          <Tags
            primaryTag={
              participant.original_idea
                ? t("quests.participants.badges.originalIdea")
                : undefined
            }
            primaryTagColor={DEFAULT_COLOR_CODE_NAME.PURPLE}
            tags={participant.tags ?? []}
          />
        )}

        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={profileUrl || workUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <Avatar className="size-11">
                <AvatarImage src={getImageUrl(participant.avatar || "")} />
                <AvatarFallback>
                  <BoringAvatar
                    name={participant.name}
                    colors={
                      colorSets[(participant.rank - 1) % WINNER_NUMBER] ?? []
                    }
                    variant="beam"
                  />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="space-y-1">
              <Link
                href={profileUrl || workUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 font-semibold leading-[100%]"
              >
                {participant.name}
                {participant.role && (
                  <span className="inline-block text-sm font-normal text-b-white-invert-sec">
                    {participant.role}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Link
            href={workUrl}
            likeButton
            whileTap
            size="xs"
            asIcon
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-1">
              {t("quests.participants.actions.view")}
              <LinkDiagonalOne size={16} />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuestParticipantsSection({
  winners,
}: {
  winners: Quest["winners"];
}) {
  const t = useTranslations();
  const participants = winners ?? [];

  if (participants.length === 0) {
    return null;
  }

  return (
    <CardPreviewSection title={t("quests.participants.title")}>
      {participants
        .slice()
        .sort((a, b) => a.rank - b.rank)
        .map((participant) => (
          <WinnerCard
            key={participant.id ?? `${participant.rank}-${participant.name}`}
            participant={participant}
          />
        ))}
    </CardPreviewSection>
  );
}
