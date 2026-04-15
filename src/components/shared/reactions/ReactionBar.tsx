"use client";

import React from "react";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

interface ReactionBarProps {
  pageType: PageType;
  entityId: string;
  reactions?: {
    like?: number;
    heart?: number;
    celebrate?: number;
    insightful?: number;
    sceptic?: number;
  };
  className?: string;
  variant?: "default" | "dock";
}

export function ReactionBar({
  pageType,
  entityId,
  reactions = {},
  className,
  variant = "default",
}: ReactionBarProps) {
  const reactionTypes: Array<ReactionType> = [
    ReactionType.LIKE,
    ReactionType.HEART,
    ReactionType.CELEBRATE,
    ReactionType.INSIGHTFUL,
    ReactionType.SCEPTIC,
  ];

  if (variant === "dock") {
    return (
      <div className={cn("relative group", className)}>
        {/* Primary button (always visible) */}
        <ReactionButton
          pageType={pageType}
          entityId={entityId}
          reactionType={ReactionType.LIKE}
          count={reactions.like || 0}
        />

        {/* Dock container (appears on hover) */}
        <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 z-50">
          {reactionTypes.slice(1).map((type) => (
            <ReactionButton
              key={type}
              pageType={pageType}
              entityId={entityId}
              reactionType={type}
              count={reactions[type] || 0}
              className="py-1! px-2! text-sm"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {reactionTypes.map((type) => (
        <ReactionButton
          key={type}
          pageType={pageType}
          entityId={entityId}
          reactionType={type}
          count={reactions[type] || 0}
        />
      ))}
    </div>
  );
}
