"use client";

import { useMemo } from "react";
import BoringAvatar from "boring-avatars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { pickRandomColorCode } from "@/utils";
import { cn } from "@/utils/utils";

type ParticipantsStatsProps = {
  total: number;
  registered: number;
  submitted: number;
  className?: string;
  colorName?: string;
  badgeClassName?: string;
};

export function ParticipantsStats({
  total,
  registered,
  submitted,
  className,
  colorName,
  badgeClassName,
}: ParticipantsStatsProps) {
  const groupCount = Math.max(1, total);
  const visibleCount = Math.max(1, Math.min(total, 5));

  const colorSets = useMemo(
    () =>
      Array.from({ length: visibleCount }).map(() =>
        Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff"),
      ),
    [visibleCount],
  );

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl",
          colorName ?? "squircle-sh-white/99",
        )}
      >
        <div className="inline-flex items-start">
          <AvatarGroup numPeople={groupCount}>
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
        <span
          className={cn(
            "relative flex items-center gap-1 ps-2 font-bold text-sm text-b-white-invert-sec",
            badgeClassName,
          )}
        >
          {total} participants 🪽
        </span>
      </div>

      {/* <p className={cn("text-xs text-b-white-invert-thr ps-2", textClassName)}>
        {registered} inscrits • {submitted} soumis
      </p> */}
    </div>
  );
}
