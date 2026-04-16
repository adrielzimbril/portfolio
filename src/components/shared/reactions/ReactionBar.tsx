"use client";

import React, { useState, useRef } from "react";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue, type Variants } from "motion/react";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

const getDockVariants = (position: "top" | "bottom"): Variants => ({
  hidden: {
    clipPath: position === "bottom" 
      ? "inset(90% 0% 0% 0% round 40px)" 
      : "inset(0% 0% 90% 0% round 40px)",
    opacity: 0,
    y: position === "bottom" ? 10 : -10,
  },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 40px)",
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
});

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
};

function MagneticItem({ 
  mouseX,
  pageType,
  entityId,
  reactionType,
  count
}: { 
  mouseX: MotionValue,
  pageType: PageType,
  entityId: string,
  reactionType: ReactionType,
  count: number
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate size based on proximity
  const sizeSync = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const size = useSpring(sizeSync, { stiffness: 200, damping: 25, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      variants={itemVariants}
      className="flex items-center justify-center origin-center"
    >
      <ReactionButton
        pageType={pageType}
        entityId={entityId}
        reactionType={reactionType}
        count={count}
        minimal
        className="w-full h-full"
      />
    </motion.div>
  );
}

interface ReactionBarProps {
  pageType: PageType;
  entityId: string;
  className?: string;
  variant?: "inline" | "dock";
  dockPosition?: "top" | "bottom";
  isFloating?: boolean;
}

export function ReactionBar({
  pageType,
  entityId,
  className,
  variant = "inline",
  dockPosition = "bottom",
  isFloating = false,
}: ReactionBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(Infinity);
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
    const dockVariants = getDockVariants(dockPosition);
    
    return (
      <div 
        className={cn(
          "relative flex flex-col items-center group/reaction-area",
          isFloating && "fixed bottom-10 left-1/2 -translate-x-1/2 z-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(Infinity);
        }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={dockVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={cn(
                "absolute left-1/2 -translate-x-1/2 z-50",
                dockPosition === "bottom" ? "bottom-[calc(100%-8px)] mb-3" : "top-[calc(100%-8px)] mt-3",
                "flex items-center gap-1.5 p-1.5 h-16",
                "squircle squircle-7xl squircle-smooth-xl",
                "squircle-sh-white dark:squircle-b-base",
                "squircle-border-2 squircle-border-b-base-accent",
                "whitespace-nowrap"
              )}
            >
              <div className="flex items-center h-full gap-0.5 px-0.5">
                {reactionTypes.map((type) => (
                  <MagneticItem
                    key={type}
                    mouseX={mouseX}
                    pageType={pageType}
                    entityId={entityId}
                    reactionType={type}
                    count={reactions[type] || 0}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          className={cn(
            "group relative flex items-center justify-center size-11 md:size-12",
            "squircle squircle-full squircle-smooth-xl",
            "squircle-sh-white dark:squircle-b-base",
            "squircle-border-2 squircle-border-b-base-accent",
            "cursor-pointer z-[10] transition-colors"
          )}
          style={{ scale: isHovered ? 1.02 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center relative pointer-events-none">
            <span className="text-xl">
              {REACTION_EMOJIS[primaryReaction]}
            </span>
            {totalCount > 0 && (
              <span className={cn(
                "absolute font-bold text-indigo-500 squircle squircle-full squircle-sh-white squircle-border squircle-border-indigo-500 px-1.5",
                dockPosition === "bottom" ? "-bottom-2.5" : "-top-2.5",
                "text-[10px] md:text-[11px]"
              )}>
                {totalCount}
              </span>
            )}
          </div>
        </motion.button>
      </div>
    );
  }

  // Inline "Section" Mode for Blogs
  return (
    <div className={cn(
      "w-full flex flex-col items-center gap-4 py-8 px-4",
      "squircle squircle-7xl squircle-smooth-xl",
      "squircle-sh-white dark:squircle-b-base",
      "squircle-border-2 squircle-border-b-base-accent",
      className
    )}>
      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
        Reactions
      </h4>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {reactionTypes.map((type) => (
          <ReactionButton
            key={type}
            pageType={pageType}
            entityId={entityId}
            reactionType={type}
            count={reactions[type] || 0}
            className="scale-110" // Slightly larger for section mode
          />
        ))}
      </div>
    </div>
  );
}
