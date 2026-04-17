"use client";

import React from "react";
import { patterns } from "@/lib/communityWall/types";
import { cn } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card
      className={cn(
        "squircle squircle-sh-white squircle-3xl squircle-smooth-lg squircle-border-2 squircle-border-b-base-accent",
        "transition-all duration-300 group cursor-pointer",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <CardContent className="flex flex-col items-start justify-between gap-3 p-4 h-full">
        <div
          className={cn(
            "w-full rounded-md bg-linear-to-b relative flex items-center justify-center text-balance p-4 text-center min-h-[220px]",
            pattern.gradient,
          )}
        >
          {pattern.svg}
          <p className="z-10 line-clamp-6 text-center text-xl font-bold text-b-white-invert">
            {message}
          </p>
        </div>
        <div className="flex w-full items-center gap-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={getImageUrl(profilePicture ?? "")} />
            <AvatarFallback className="relative pointer-events-none">
              <BoringAvatar
                name={
                  author ||
                  (profilePicture?.slice(8)?.replace(".png", "") ?? "")
                }
                colors={avatarColors}
                variant="beam"
              />
            </AvatarFallback>
          </Avatar>
          <p className="truncate text-b-white-invert-sec text-sm">{author}</p>
        </div>
      </CardContent>
    </Card>
  );
}
