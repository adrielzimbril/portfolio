"use client";

import Image from "next/image";
import { SectionLayout } from "@/components/shared/sections/layout";
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
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types/default";
import { pickRandomColorCode } from "@/utils";
import { useMemo } from "react";
import { LinkDiagonalOne } from "@aurthle/icons";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";

type DemoParticipant = {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  profileUrl?: string;
  workUrl: string;
  workCover: string;
  rank: 1 | 2 | 3;
  pixelPerfect?: boolean;
  juryFavorite?: boolean;
  originalIdea: boolean;
  tags: string[];
};

const DEMO_PARTICIPANTS_BY_QUEST: Record<string, DemoParticipant[]> = {
  "saas-landing-breakdown": [
    {
      id: "winner-1",
      name: "Awa D.",
      role: "Product Designer",
      avatar: "",
      profileUrl: "https://dribbble.com",
      workUrl: "https://www.figma.com",
      workCover: "/img/projects/0.png",
      rank: 1,
      pixelPerfect: true,
      juryFavorite: true,
      originalIdea: true,
      tags: ["Idee originale"],
    },
    {
      id: "winner-2",
      name: "Koffi M.",
      role: "UI Designer",
      profileUrl: "https://www.behance.net",
      avatar: "",
      workUrl: "https://www.figma.com",
      workCover: "/img/projects/1.png",
      rank: 2,
      pixelPerfect: false,
      juryFavorite: false,
      originalIdea: true,
      tags: ["Clean UI"],
    },
    {
      id: "winner-3",
      name: "Nina K.",
      role: "UX Designer",
      profileUrl: "https://www.linkedin.com",
      avatar: "",
      workUrl: "https://www.figma.com",
      workCover: "/img/projects/2.png",
      rank: 3,
      pixelPerfect: false,
      juryFavorite: false,
      originalIdea: false,
      tags: ["Storytelling"],
    },
  ],
};

const RANK_BADGE = {
  1: { emoji: "🥇", label: "Premier prix" },
  2: { emoji: "🥈", label: "Deuxième prix" },
  3: { emoji: "🥉", label: "Troisième prix" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

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
        <Badge className="relative rounded-full px-2 py-2">
          <span className="text-2xl">{label}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function WinnerCard({ participant }: { participant: DemoParticipant }) {
  const workUrl = getExternalUrl(participant.workUrl);
  const profileUrl = getExternalUrl(participant.profileUrl);
  const WINNER_NUMBER = 3;

  // ✅ Generate all colors in one time, outside of .map()
  const colorSets: string[][] = useMemo(() => {
    return Array.from({ length: WINNER_NUMBER }).map(() =>
      Array.from({ length: 4 }).map(() => pickRandomColorCode() ?? "#ffffff"),
    );
  }, [WINNER_NUMBER]);

  return (
    <Card className="squircle size-full squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <div className="relative min-h-52 md:min-h-72 squircle squircle-smooth-xl squircle-3xl squircle-sh-white overflow-hidden">
          <Image
            width={1200}
            height={630}
            src={getImageUrl(participant.workCover)}
            alt={participant.name}
            className="size-full object-cover"
          />

          <Link
            href={workUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label={`Voir le travail de ${participant.name}`}
          />
          <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
            {participant.rank && (
              <OverlayTag
                label={RANK_BADGE[participant.rank].emoji}
                tooltip={RANK_BADGE[participant.rank].label}
              />
            )}
            {participant.pixelPerfect && (
              <OverlayTag label="🎖️" tooltip="Pixel Perfect" />
            )}
            {participant.juryFavorite && (
              <OverlayTag label="❤️" tooltip="Coup de cœur du jury" />
            )}
          </div>
        </div>

        {(participant.pixelPerfect ||
          participant.originalIdea ||
          participant.tags?.length > 0) && (
          <Tags
            primaryTag={participant.originalIdea ? "Idée originale" : undefined}
            primaryTagColor={DEFAULT_COLOR_CODE_NAME_LIST.PURPLE}
            tags={participant.tags}
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
                {/* <AvatarFallback>{getInitials(participant.name)}</AvatarFallback> */}
                <AvatarFallback>
                  <BoringAvatar
                    name={
                      participant.name.slice(8)?.replace(".png", "") ??
                      participant.name
                    }
                    colors={colorSets[participant.rank - 1] ?? []}
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
              Voir
              <LinkDiagonalOne size={16} />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuestParticipantsSection({ questSlug }: { questSlug: string }) {
  const participants = DEMO_PARTICIPANTS_BY_QUEST[questSlug] ?? [];

  return (
    <CardPreviewSection title="Vainqueurs 🏆">
      {participants
        .sort((a, b) => a.rank - b.rank)
        .map((participant) => (
          <WinnerCard key={participant.id} participant={participant} />
        ))}
    </CardPreviewSection>
  );
}
