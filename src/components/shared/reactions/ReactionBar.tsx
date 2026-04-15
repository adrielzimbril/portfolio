"use client";

import React from "react";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

interface ReactionBarProps {
  entityType:
    | PageType.THOUGHT
    | PageType.PROJECT
    | PageType.CONNECTIONS
    | PageType.QUESTS
    | PageType.HUB;
  entityId: string;
  reactions?: {
    like?: number;
    heart?: number;
    celebrate?: number;
    insightful?: number;
  };
  className?: string;
}

export function ReactionBar({
  entityType,
  entityId,
  reactions = {},
  className,
}: ReactionBarProps) {
  const reactionTypes: Array<ReactionType> = [
    ReactionType.LIKE,
    ReactionType.HEART,
    ReactionType.CELEBRATE,
    ReactionType.INSIGHTFUL,
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {reactionTypes.map((type) => (
        <ReactionButton
          key={type}
          entityType={entityType}
          entityId={entityId}
          reactionType={type}
          count={reactions[type] || 0}
        />
      ))}
    </div>
  );
}
