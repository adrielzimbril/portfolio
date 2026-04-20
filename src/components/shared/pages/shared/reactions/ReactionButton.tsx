"use client";
import React, { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { cn } from "@/utils/utils";
import { DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { ReactionType, REACTION_EMOJIS } from "@/lib/stats/types";
import { Badge } from "@/components/ui/badge";
import { getCurrentUserId } from "@/lib/reactions/anonymous-user";
import { apiRoutes } from "@/data/api-routes";
import { pickRandomColor } from "@/utils";
import { useUser } from "@/integrations/auth/provider/supabase";
import { logger } from "@/utils/logger";


interface ReactionButtonProps {
  pageType: PageType;
  entityId: string;
  reactionType: ReactionType;
  count?: number;
  className?: string;
  minimal?: boolean;
  compact?: boolean;
  isReacted?: boolean;
}

export function ReactionButton({
  pageType,
  entityId,
  reactionType,
  count = 0,
  className,
  minimal = false,
  compact = false,
  isReacted: isReactedProp = false,
}: ReactionButtonProps) {
  const { mutate: globalMutate } = useSWRConfig();
  const { user, loading: userLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [localIsReacted, setLocalIsReacted] = useState(isReactedProp);

  const emoji: string = REACTION_EMOJIS[reactionType];

  const currentUserId = getCurrentUserId(user);

  useEffect(() => {
    setLocalIsReacted(isReactedProp);
  }, [isReactedProp]);

  const isReacted = localIsReacted;

  const handleReaction = async () => {
    if (!currentUserId || isLoading) return;

    setIsLoading(true);

    const countsKey = `reactions_${pageType}_${entityId}`;
    const statusKey = `reaction_status_${pageType}_${entityId}`;

    // Optimistic Update
    const nextIsReacted = !isReacted;
    setLocalIsReacted(nextIsReacted);

    globalMutate(
      countsKey,
      (current: any) => {
        if (!current) return current;
        return {
          ...current,
          [reactionType]: Math.max(
            0,
            current[reactionType] + (nextIsReacted ? 1 : -1),
          ),
        };
      },
      false,
    );

    try {
      const res = await fetch(apiRoutes.reactions.main.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageType,
          entityId,
          reactionType,
          anonymousId: currentUserId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to toggle reaction");
      }

      const { action, counts, userStatus } = await res.json();

      // Sync with API response
      setLocalIsReacted(userStatus[reactionType]);
      globalMutate(countsKey, counts);
      globalMutate(statusKey, userStatus);
    } catch (error) {
      logger.error("Reaction error:", error);
      // Rollback
      setLocalIsReacted(isReacted);
      globalMutate(countsKey);
    } finally {
      setIsLoading(false);
    }
  };

  const reactionCount = count; // We use the prop directly as it's now managed by global useReactions SWR hook

  return (
    <>
      <Badge
        onClick={handleReaction}
        title={`${REACTION_EMOJIS[reactionType]} (${reactionCount})`}
        className={cn(
          "group/reaction relative flex items-center justify-center cursor-pointer",
          "capitalize text-xs font-medium",
          "squircle-border-2",
          pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
          "size-max text-primary-foreground!",
          isReacted ? "squircle-border-[#8e8eff]" : "squircle-border-[#b3baf5]",
          compact && "px-1 py-0.5",
          isLoading && "opacity-50 cursor-not-allowed",
          // isReacted ? "grayscale-0" : "grayscale-90",
          className,
        )}
        size={minimal ? "xs" : "sm"}
        variant={isReacted ? "colored" : "white"}
        circle={minimal ? false : true}
        contentClassName="relative size-full flex flex-col items-center justify-center"
      >
        <span
          className={cn(
            "text-lg transition-transform duration-300",
            compact && "text-base",
            !minimal && "group-hover/reaction:scale-125",
            isReacted && "scale-110",
          )}
        >
          {emoji}
        </span>
        {reactionCount > 0 && !minimal && (
          <span
            className={cn(
              "absolute font-bold squircle squircle-xl squircle-border-1",
              isReacted
                ? "squircle-sh-white text-indigo-500 squircle-border-[#8e8eff]"
                : "squircle-[#8e8eff] text-primary-foreground! squircle-border-sh-white",
              compact
                ? "-bottom-1.5 text-[.5rem] px-1 py-0.5"
                : "-bottom-1 text-[.625rem] px-1.5 py-0.5",
            )}
          >
            {reactionCount}
          </span>
        )}
      </Badge>
      <button
        onClick={handleReaction}
        disabled={isLoading}
        title={`${REACTION_EMOJIS[reactionType]} (${reactionCount})`}
        className={cn(
          "hidden! flex items-center justify-center transition-all duration-300 cursor-pointer group/btn disabled:opacity-50",
          "squircle squircle-7xl squircle-smooth-xl",
          minimal
            ? "size-10"
            : compact
              ? "gap-1 px-2 py-1 squircle-sh-white squircle-border squircle-border-b-base-accent"
              : "gap-1.5 px-3 py-1.5 squircle-sh-white squircle-border-2 squircle-border-b-base-accent",
          isReacted &&
            !minimal &&
            "squircle-background-background squircle-border-2 squircle-border-indigo-500",
          isReacted &&
            minimal &&
            "squircle-sh-white squircle-border-2 squircle-border-indigo-500",
          className,
        )}
      >
        <span
          className={cn(
            "text-lg transition-transform duration-300",
            compact && "text-base",
            !minimal && "group-hover/btn:scale-125",
            isReacted && "scale-110",
          )}
        >
          {emoji}
        </span>
        {!minimal && (
          <span
            className={cn(
              "font-bold transition-colors",
              compact ? "text-[10px]" : "text-xs",
              isReacted ? "text-indigo-600" : "text-foreground",
            )}
          >
            {reactionCount}
          </span>
        )}
      </button>
    </>
  );
}
