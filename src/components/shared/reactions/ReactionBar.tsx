"use client";

import React from "react";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

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
  const { reactions } = useReactions(pageType, entityId);

  if (variant === "dock") {
    // Find most popular reaction to show as primary
    const sortedReactions = reactionTypes
      .map((type) => ({ type, count: reactions[type] || 0 }))
      .sort((a, b) => b.count - a.count);

    // Ensure we always have at least one reaction
    const primaryReaction = sortedReactions[0] || {
      type: ReactionType.LIKE,
      count: 0,
    };
    const totalReactions = sortedReactions.reduce((sum, r) => sum + r.count, 0);

    return (
      <div className={cn("relative group", className)}>
        {/* Primary button (always visible) */}
        <div className="relative">
          <ReactionButton
            pageType={pageType}
            entityId={entityId}
            reactionType={primaryReaction.type}
            count={totalReactions}
          />

          {/* Stacking effect for multiple reactions */}
          {totalReactions > 0 &&
            sortedReactions.filter((r) => r.count > 0).length > 1 && (
              <div className="absolute -top-1 -right-1 flex -space-x-2">
                {sortedReactions
                  .filter((r) => r.count > 0 && r.type !== primaryReaction.type)
                  .slice(0, 2)
                  .map((r) => (
                    <div
                      key={r.type}
                      className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-sm shadow-sm border border-border"
                    >
                      {REACTION_EMOJIS[r.type]}
                    </div>
                  ))}
              </div>
            )}
        </div>

        {/* Dock container (appears on hover) */}
        <div className="absolute bottom-full mb-2 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 flex gap-1 z-50">
          {reactionTypes
            .filter((type) => type !== primaryReaction.type)
            .map((type, index) => (
              <div
                key={type}
                className="transform transition-all duration-300 ease-out"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: 0,
                  transform: "translateX(-10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <ReactionButton
                  pageType={pageType}
                  entityId={entityId}
                  reactionType={type}
                  count={reactions[type] || 0}
                  className="py-1! px-2! text-sm"
                />
              </div>
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
