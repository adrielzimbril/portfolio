"use client";
import React, { useState, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ReactionButton } from "@/components/shared/pages/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";

// --- Convenience Wrapper ---
export function ReactionBar({
  pageType,
  entityId,
  compact = false,
}: {
  pageType: PageType;
  entityId: string;
  compact?: boolean;
}) {
  const reactionTypes = Object.values(ReactionType);
  const { reactions } = useReactions(pageType, entityId);
  const totalCount = Object.values(reactions).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const firstReaction = sortedReactions[0];
  const primaryReaction =
    firstReaction && firstReaction.count > 0
      ? firstReaction.type
      : ReactionType.LIKE;

  return (
    <div
      className={cn(
        "w-full md:w-fit flex flex-col items-center",
        compact ? "gap-2" : "gap-4",
        "max-w-4xl mx-auto my-6 md:my-12",
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          compact ? "gap-1.5" : "gap-3",
        )}
      >
        {reactionTypes.map((type) => (
          <ReactionButton
            key={type}
            pageType={pageType}
            entityId={entityId}
            reactionType={type}
            count={reactions[type] || 0}
            className={compact ? "scale-100" : "scale-110"}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
