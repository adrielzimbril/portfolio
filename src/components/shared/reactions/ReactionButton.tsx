"use client";

import React, { useState, useEffect } from "react";
import { Heart, ThumbUp, Sparkles, Lightbulb } from "@aurthle/icons";
import { cn } from "@/utils/utils";
import { supabase } from "@/integrations/supabase/client";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";

const REACTION_ICONS: Record<string, any> = {
  [ReactionType.LIKE]: ThumbUp,
  [ReactionType.HEART]: Heart,
  [ReactionType.CELEBRATE]: Sparkles,
  [ReactionType.INSIGHTFUL]: Lightbulb,
};

const REACTION_COLORS: Record<string, string> = {
  [ReactionType.LIKE]: "text-blue-500",
  [ReactionType.HEART]: "text-red-500",
  [ReactionType.CELEBRATE]: "text-yellow-500",
  [ReactionType.INSIGHTFUL]: "text-purple-500",
};

interface ReactionButtonProps {
  entityType:
    | PageType.THOUGHT
    | PageType.PROJECT
    | PageType.CONNECTIONS
    | PageType.QUESTS
    | PageType.HUB;
  entityId: string;
  reactionType: ReactionType;
  count?: number;
  className?: string;
}

export function ReactionButton({
  entityType,
  entityId,
  reactionType,
  count = 0,
  className,
}: ReactionButtonProps) {
  const [user, setUser] = useState<any>(null);
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
      setUser(user);

      if (user) {
        const tableName = getTableName();
        const idField = getIdField();
        const { data } = await supabase
          .from(tableName as any)
          .select("*")
          .eq(idField as any, entityId)
          .eq("user_id", user.id)
          .eq("reaction_type", reactionType)
          .single();

        setIsReacted(!!data);
      }
    };

    checkUser();
  }, [entityId, reactionType, entityType]);

  const getTableName = (): string => {
    const type = entityType as PageType;
    switch (type) {
      case PageType.THOUGHT:
        return "thought_reactions";
      case PageType.PROJECT:
        return "project_reactions";
      case PageType.CONNECTIONS:
        return "connection_reactions";
      case PageType.QUESTS:
        return "quest_reactions";
      case PageType.HUB:
        return "hub_reactions";
      case PageType.CHANGELOG:
        return "changelog_reactions";
      default:
        return "thought_reactions";
    }
  };

  const getIdField = (): string => {
    const type = entityType as PageType;
    switch (type) {
      case PageType.THOUGHT:
        return "slug";
      case PageType.PROJECT:
        return "project_id";
      case PageType.CONNECTIONS:
        return "connection_id";
      case PageType.QUESTS:
        return "quest_id";
      case PageType.HUB:
        return "slug";
      case PageType.CHANGELOG:
        return "version";
      default:
        return "slug";
    }
  };

  const handleReaction = async () => {
    if (!user || isLoading) return;

    setIsLoading(true);
    const tableName = getTableName();
    const idField = getIdField();

    try {
      if (isReacted) {
        // Remove reaction
        const { error } = await supabase
          .from(tableName as any)
          .delete()
          .eq(idField as any, entityId)
          .eq("user_id", user.id)
          .eq("reaction_type", reactionType);

        if (error) throw error;
        setIsReacted(false);
        setReactionCount(Math.max(0, reactionCount - 1));
      } else {
        // Add reaction
        const insertData: any = {
          user_id: user.id,
          reaction_type: reactionType,
        };
        insertData[idField] = entityId;

        const { error } = await supabase
          .from(tableName as any)
          .insert(insertData as any);

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
      disabled={!user || isLoading}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200",
        "bg-b-base border border-border hover:border-primary/50",
        isReacted && cn("border-primary/50 bg-primary/10", colorClass),
        !user && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <Icon
        size={16}
        className={cn(isReacted ? colorClass : "text-muted-foreground")}
      />
      <span className="text-xs font-medium text-foreground">
        {reactionCount}
      </span>
    </button>
  );
}
