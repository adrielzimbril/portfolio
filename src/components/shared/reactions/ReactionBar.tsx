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
}

export function ReactionBar({
  pageType,
  entityId,
  reactions = {},
  className,
}: ReactionBarProps) {
  const reactionTypes: Array<ReactionType> = [
    ReactionType.LIKE,
    ReactionType.HEART,
    ReactionType.CELEBRATE,
    ReactionType.INSIGHTFUL,
    ReactionType.SCEPTIC,
  ];

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
