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
          "flex flex-col items-center gap-3",
          isFloating && "fixed bottom-10 left-1/2 -translate-x-1/2 z-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "flex items-center gap-2 p-2 px-3",
                "squircle squircle-7xl squircle-smooth-xl",
                "bg-sh-white/70 dark:bg-zinc-900/70 backdrop-blur-xl",
                "squircle-border-2 squircle-border-b-base-accent",
                "shadow-elevation-02",
                "mb-2"
              )}
            >
              <motion.div 
                className="flex items-center gap-1.5"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {reactionTypes.map((type) => (
                  <motion.div
                    key={type}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.4, 
                      y: -8, 
                      transition: { type: "spring", stiffness: 400, damping: 10 } 
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
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 0.4 }}
          className={cn(
            "group relative flex items-center justify-center size-12 md:size-14",
            "squircle squircle-full squircle-smooth-xl",
            "bg-sh-white dark:bg-zinc-900",
            "squircle-border-2 squircle-border-b-base-accent",
            "shadow-elevation-02 hover:shadow-2xl transition-shadow",
            "cursor-pointer overflow-hidden z-[10]"
          )}
        >
          <div className="flex flex-col items-center justify-center relative pointer-events-none">
            <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
              {REACTION_EMOJIS[primaryReaction]}
            </span>
            {totalCount > 0 && (
              <span className="absolute -bottom-2 text-[10px] md:text-[11px] font-bold text-indigo-500 bg-background/80 backdrop-blur-sm px-1.5 rounded-full border border-indigo-500/20">
                {totalCount}
              </span>
            )}
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-2 p-2 px-3",
      "squircle squircle-4xl squircle-smooth-xl",
      "squircle-background-sh-white/30 dark:squircle-background-zinc-900/30 backdrop-blur-sm",
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
