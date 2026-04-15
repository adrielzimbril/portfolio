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
}

export function ReactionButton({
  pageType,
  entityId,
  reactionType,
  count = 0,
  className,
}: ReactionButtonProps) {
  const [user, setUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();
  const [isReacted, setIsReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(count);
  const [isLoading, setIsLoading] = useState(false);

  const emoji: string = REACTION_EMOJIS[reactionType];

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const previousUser = user;
      setUser(user);

      // Get current user ID (authenticated or anonymous)
      const userId = getCurrentUserId(user);
      const anonymousId = getAnonymousUserId();
      setCurrentUserId(userId);

      // Sync anonymous reactions when user authenticates
      if (user?.id && !previousUser?.id && anonymousId) {
        await syncAnonymousReactionsOnLogin(anonymousId);
      }

      if (userId || anonymousId) {
        // Check if user has already reacted (check both user_id and anonymous_id)
        // This allows reactions to persist across auth states on the same device
        let checkQuery = supabase
          .from("reactions" as any)
          .select("*")
          .eq("page_type", pageType)
          .eq("entity_id", entityId)
          .eq("reaction_type", reactionType);

        if (user?.id) {
          checkQuery = checkQuery.eq("user_id", user.id);
        } else {
          checkQuery = checkQuery.eq("anonymous_id", anonymousId);
        }

        const { data } = await checkQuery.maybeSingle();

        setIsReacted(!!data);
      }
    };

    checkUser();
  }, [entityId, reactionType, pageType]);

  const handleReaction = async () => {
    if (!currentUserId || isLoading) return;

    setIsLoading(true);

    try {
      if (isReacted) {
        // Remove reaction - handle both authenticated and anonymous users
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
        setIsReacted(false);
        setReactionCount(Math.max(0, reactionCount - 1));
      } else {
        // Add reaction
        const reactionData: any = {
          page_type: pageType,
          entity_id: entityId,
          reaction_type: reactionType,
        };

        // Add user_id or anonymous_id based on user type
        if (user?.id) {
          reactionData.user_id = user.id;
        } else {
          reactionData.anonymous_id = currentUserId;
        }

        const { error } = await supabase
          .from("reactions" as any)
          .insert(reactionData);

        if (error) throw error;
        setIsReacted(true);
        setReactionCount(reactionCount + 1);
      }
    } catch (error) {
      console.error("Reaction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleReaction}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer",
        "bg-sh-white",
        isReacted && "bg-white",
        className,
      )}
    >
      <span
        className={cn(
          "text-lg transition-all duration-200",
          "hover:scale-125",
          isReacted && "scale-110",
        )}
      >
        {emoji}
      </span>
      <span className="text-xs font-medium text-foreground">
        {reactionCount}
      </span>
    </button>
  );
}
