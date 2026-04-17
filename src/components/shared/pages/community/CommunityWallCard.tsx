"use client";

import React from "react";
import { patterns } from "@/lib/communityWall/types";
import { cn } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BoringAvatar from "boring-avatars";
import { getImageUrl, pickRandomColorCode } from "@/utils";
import { useMemo } from "react";

type CommunityWallCardProps = {
  patternIndex: number;
  message?: string;
  rotation?: number;
  author?: string;
  profilePicture?: string;
  className?: string;
};

export function CommunityWallCard({
  patternIndex,
  message = "",
  rotation = 0,
  author = "",
  profilePicture = "",
  className = "",
}: CommunityWallCardProps) {
  const pattern = patterns[patternIndex % patterns.length];

  // Generate random colors for BoringAvatar
  const avatarColors = useMemo(() => {
    return Array.from({ length: 8 }).map(
      () => pickRandomColorCode() ?? "#ffffff",
    );
  }, []);

  return (
    <div
      className={`flex flex-col items-start justify-between gap-2 rounded-xl border-2 border-[#A5AEB8/12] bg-[#F7F7F8] p-2.5 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`h-full w-full rounded-md bg-linear-to-b ${pattern.gradient} relative flex items-center justify-center text-balance p-4 text-center`}
      >
        {pattern.svg}
        <p className="z-10 line-clamp-6 text-center text-xl font-bold">
          {message}
        </p>
      </div>
      <div className="flex w-full items-center space-x-2">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={getImageUrl(profilePicture ?? "")} />
          <AvatarFallback className="relative pointer-events-none">
            <BoringAvatar
              name={
                author || (profilePicture?.slice(8)?.replace(".png", "") ?? "")
              }
              colors={avatarColors}
              variant="beam"
            />
          </AvatarFallback>
        </Avatar>
        <p className="truncate text-text-secondary">{author}</p>
      </div>
    </div>
  );
}
