"use client";

import React from "react";
import { ReactionRoot, ReactionTrigger, ReactionDock, ReactionItem } from "@/components/shared/reactions/ReactionBar";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";

// Constants from ReactionBar for the trigger display
const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

interface AbsoluteReactionBarProps {
  pageType: PageType;
  entityId: string;
  reactionsPosition?: "top" | "bottom";
  className?: string;
}

export function AbsoluteReactionBar({
  pageType,
  entityId,
  reactionsPosition,
  className,
}: AbsoluteReactionBarProps) {
  const { reactions } = useReactions(pageType, entityId);
  const totalCount = Object.values(reactions).reduce((acc, curr) => acc + curr, 0);
  
  const reactionTypes = Object.values(ReactionType);
  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const firstReaction = sortedReactions[0];
  const primaryReaction = firstReaction && firstReaction.count > 0 
    ? firstReaction.type 
    : ReactionType.LIKE;

  if (!reactionsPosition) return null;

  return (
    <ReactionRoot
      pageType={pageType}
      entityId={entityId}
      orientation="vertical"
      dockPosition={reactionsPosition}
    >
      <ReactionTrigger
        className={cn(
          "absolute z-20 pointer-events-auto",
          reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-6",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center relative pointer-events-none">
          <span className="text-xl">
            {REACTION_EMOJIS[primaryReaction]}
          </span>
          {totalCount > 0 && (
            <span className={cn(
              "absolute font-bold text-indigo-500 squircle squircle-full squircle-sh-white squircle-border squircle-border-indigo-500 px-1.5",
              reactionsPosition === "bottom" ? "-bottom-2.5" : "-top-2.5",
              "text-[10px] md:text-[11px]"
            )}>
              {totalCount}
            </span>
          )}
        </div>
      </ReactionTrigger>
      
      <ReactionDock>
        {reactionTypes.map((type) => (
          <ReactionItem key={type} type={type} />
        ))}
      </ReactionDock>
    </ReactionRoot>
  );
}
