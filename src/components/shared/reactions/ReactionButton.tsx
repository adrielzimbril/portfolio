"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/utils/utils";
import { supabase } from "@/integrations/supabase/client";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import {
  getAnonymousUserId,
  getCurrentUserId,
  syncAnonymousReactionsOnLogin,
} from "@/lib/reactions/anonymous-user";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

interface ReactionButtonProps {
  pageType: PageType;
  entityId: string;
  reactionType: ReactionType;
  count?: number;
  className?: string;
  minimal?: boolean;
  compact?: boolean;
}

import useSWR, { useSWRConfig } from "swr";

export function ReactionButton({
  pageType,
  entityId,
  reactionType,
  count = 0,
  className,
  minimal = false,
  compact = false,
}: ReactionButtonProps) {
  const { mutate: globalMutate } = useSWRConfig();
  const [user, setUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const emoji: string = REACTION_EMOJIS[reactionType];

  useEffect(() => {
    const initUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const userId = getCurrentUserId(user);
      setCurrentUserId(userId);
      
      const anonymousId = getAnonymousUserId();
      if (user?.id && anonymousId) {
        await syncAnonymousReactionsOnLogin(anonymousId);
      }
    };
    initUser();
  }, []);

  const statusKey = currentUserId 
    ? `reaction_status_${pageType}_${entityId}_${reactionType}_${currentUserId}` 
    : null;

  const { data: isReacted, mutate: mutateStatus } = useSWR(
    statusKey,
    async () => {
      if (!currentUserId) return false;
      let query = supabase
        .from("reactions" as any)
        .select("*")
        .eq("page_type", pageType)
        .eq("entity_id", entityId)
        .eq("reaction_type", reactionType);

      if (user?.id) {
        query = query.eq("user_id", user.id);
      } else {
        query = query.eq("anonymous_id", currentUserId);
      }

      const { data } = await query.maybeSingle();
      return !!data;
    },
    { revalidateOnFocus: true }
  );

  const handleReaction = async () => {
    if (!currentUserId || isLoading) return;

    setIsLoading(true);

    const countsKey = `reactions_${pageType}_${entityId}`;
    
    // Optimistic Update
    const nextIsReacted = !isReacted;
    
    // Update both status and global counts optimistically
    mutateStatus(nextIsReacted, false);
    globalMutate(countsKey, (current: any) => {
      if (!current) return current;
      return {
        ...current,
        [reactionType]: Math.max(0, current[reactionType] + (nextIsReacted ? 1 : -1))
      };
    }, false);

    try {
      if (isReacted) {
        // Remove reaction
        let deleteQuery = supabase
          .from("reactions" as any)
          .delete()
          .eq("page_type", pageType)
          .eq("entity_id", entityId)
          .eq("reaction_type", reactionType);

        if (user?.id) {
          deleteQuery = deleteQuery.eq("user_id", user.id);
        } else {
          deleteQuery = deleteQuery.eq("anonymous_id", currentUserId);
        }

        const { error } = await deleteQuery;
        if (error) throw error;
      } else {
        // Add reaction
        const reactionData: any = {
          page_type: pageType,
          entity_id: entityId,
          reaction_type: reactionType,
        };

        if (user?.id) {
          reactionData.user_id = user.id;
        } else {
          reactionData.anonymous_id = currentUserId;
        }

        const { error } = await supabase
          .from("reactions" as any)
          .insert(reactionData);

        if (error && error.code !== "23505") throw error;
      }
    } catch (error) {
      console.error("Reaction error:", error);
      // Rollback
      mutateStatus(isReacted, true);
      globalMutate(countsKey); 
    } finally {
      setIsLoading(false);
      // Final revalidation to ensure sync
      mutateStatus();
      globalMutate(countsKey);
    }
  };

  const reactionCount = count; // We use the prop directly as it's now managed by global useReactions SWR hook

  return (
    <button
      onClick={handleReaction}
      disabled={isLoading}
      title={`${REACTION_EMOJIS[reactionType]} (${reactionCount})`}
      className={cn(
        "flex items-center justify-center transition-all duration-300 cursor-pointer group/btn disabled:opacity-50",
        "squircle squircle-7xl squircle-smooth-xl",
        minimal 
          ? "size-10" 
          : compact 
            ? "gap-1 px-2 py-1 squircle-sh-white squircle-border squircle-border-b-base-accent"
            : "gap-1.5 px-3 py-1.5 squircle-sh-white squircle-border-2 squircle-border-b-base-accent",
        isReacted && !minimal && "squircle-background-background squircle-border-2 squircle-border-indigo-500",
        isReacted && minimal && "squircle-sh-white squircle-border-2 squircle-border-indigo-500",
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
        <span className={cn(
          "font-bold transition-colors",
          compact ? "text-[10px]" : "text-xs",
          isReacted ? "text-indigo-600" : "text-foreground"
        )}>
          {reactionCount}
        </span>
      )}
    </button>
  );
}
