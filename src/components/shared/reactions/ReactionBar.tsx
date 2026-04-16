"use client";

import React, { useState } from "react";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ThumbsUp, PartyPopper, Lightbulb, HelpCircle } from "lucide-react";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

const REACTION_ICONS: Record<ReactionType, React.ReactNode> = {
  [ReactionType.LIKE]: <ThumbsUp size={16} />,
  [ReactionType.HEART]: <Heart size={16} />,
  [ReactionType.CELEBRATE]: <PartyPopper size={16} />,
  [ReactionType.INSIGHTFUL]: <Lightbulb size={16} />,
  [ReactionType.SCEPTIC]: <HelpCircle size={16} />,
};

interface ReactionBarProps {
  pageType: PageType;
  entityId: string;
  className?: string;
  variant?: "inline" | "dock";
  isFloating?: boolean;
}

export function ReactionBar({
  pageType,
  entityId,
  className,
  variant = "inline",
  isFloating = false,
}: ReactionBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const reactionTypes: Array<ReactionType> = [
    ReactionType.LIKE,
    ReactionType.HEART,
    ReactionType.CELEBRATE,
    ReactionType.INSIGHTFUL,
    ReactionType.SCEPTIC,
  ];
  const { reactions } = useReactions(pageType, entityId);

  // Find most popular reaction to show as primary
  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const primaryReaction = sortedReactions[0]?.count > 0 
    ? sortedReactions[0].type 
    : ReactionType.LIKE;
    
  const totalCount = Object.values(reactions).reduce((acc, curr) => acc + curr, 0);

  if (variant === "dock") {
    return (
      <div 
        className={cn(
          "flex flex-col items-center gap-2",
          isFloating && "fixed bottom-8 left-1/2 -translate-x-1/2 z-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="flex items-center gap-1.5 p-1.5 px-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-2xl mb-1"
            >
              {reactionTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.3, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <ReactionButton
                    pageType={pageType}
                    entityId={entityId}
                    reactionType={type}
                    count={reactions[type] || 0}
                    minimal
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          className="group relative flex items-center justify-center size-10 md:size-12 rounded-full bg-background border border-border shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg md:text-xl">
              {REACTION_EMOJIS[primaryReaction]}
            </span>
            {totalCount > 0 && (
              <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground -mt-1">
                {totalCount}
              </span>
            )}
          </div>
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
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
