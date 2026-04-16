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
          "relative flex items-center justify-center", // Relative container for the absolute dock
          isFloating && "fixed bottom-10 left-1/2 -translate-x-1/2 z-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, mass: 1 }}
              className={cn(
                "absolute bottom-full mb-3 left-1/2 -translate-x-1/2",
                "flex items-center gap-2 p-1.5 px-2.5",
                "squircle squircle-7xl squircle-smooth-xl",
                "bg-sh-white dark:bg-zinc-950",
                "squircle-border-2 squircle-border-b-base-accent",
                "z-50 whitespace-nowrap"
              )}
            >
              <motion.div 
                className="flex items-center gap-1.5"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.04
                    }
                  }
                }}
              >
                {reactionTypes.map((type) => (
                  <motion.div
                    key={type}
                    variants={{
                      hidden: { opacity: 0, y: 5 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ 
                      scale: 1.4, 
                      y: -6, 
                      transition: { type: "spring", stiffness: 400, damping: 15 } 
                    }}
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          initial={false}
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn(
            "group relative flex items-center justify-center size-12 md:size-14",
            "squircle squircle-full squircle-smooth-xl",
            "bg-sh-white dark:bg-zinc-950",
            "squircle-border-2 squircle-border-b-base-accent hover:squircle-border-border",
            "cursor-pointer overflow-hidden z-[10] transition-colors"
          )}
        >
          <div className="flex flex-col items-center justify-center relative pointer-events-none">
            <span className="text-xl md:text-2xl">
              {REACTION_EMOJIS[primaryReaction]}
            </span>
            {totalCount > 0 && (
              <span className="absolute -bottom-2 text-[10px] md:text-[11px] font-bold text-indigo-500 bg-background px-1.5 rounded-full border border-indigo-500/30">
                {totalCount}
              </span>
            )}
          </div>
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-2 p-1.5 px-2.5",
      "squircle squircle-4xl squircle-smooth-xl",
      "bg-sh-white dark:bg-zinc-950",
      "squircle-border-2 squircle-border-b-base-accent",
      className
    )}>
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
