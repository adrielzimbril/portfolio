"use client";

import React, { useState, useEffect } from "react";
import { Heart, ThumbsUp, Sparkles, Lightbulb, Frown } from "lucide-react";
import { cn } from "@/utils/utils";
import { supabase } from "@/integrations/supabase/client";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import {
  getAnonymousUserId,
  getCurrentUserId,
  isAnonymousUser,
  syncAnonymousReactionsOnLogin,
} from "@/lib/reactions/anonymous-user";
import { getEmojiHub } from "@aurthle/emoji-hub";

const REACTION_ICONS: Record<string, any> = {
  [ReactionType.LIKE]: ThumbsUp,
  [ReactionType.HEART]: Heart,
  [ReactionType.CELEBRATE]: Sparkles,
  [ReactionType.INSIGHTFUL]: Lightbulb,
  [ReactionType.SCEPTIC]: Frown,
};

const REACTION_COLORS: Record<string, string> = {
  [ReactionType.LIKE]: "text-blue-500",
  [ReactionType.HEART]: "text-red-500",
  [ReactionType.CELEBRATE]: "text-yellow-500",
  [ReactionType.INSIGHTFUL]: "text-purple-500",
  [ReactionType.SCEPTIC]: "text-gray-500",
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

  const Icon = REACTION_ICONS[reactionType];
  const colorClass = REACTION_COLORS[reactionType];

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
        const { data } = await supabase
          .from("reactions" as any)
          .select("*")
          .eq("page_type", pageType)
          .eq("entity_id", entityId)
          .eq("reaction_type", reactionType)
          .or(
            `user_id.eq.${userId},anonymous_id.eq.${userId},anonymous_id.eq.${anonymousId}`,
          )
          .single();

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
        "bg-b-base border border-border hover:border-primary/50",
        isReacted && cn("border-primary/50 bg-primary/10", colorClass),
        className,
      )}
    >
      <Icon
        size={16}
        className={cn(isReacted ? colorClass : "text-muted-foreground")}
      />
      {getEmojiHub("❣️", "fluent", "anim")}
      <span className="text-xs font-medium text-foreground">
        {reactionCount}
      </span>
    </button>
  );
}
