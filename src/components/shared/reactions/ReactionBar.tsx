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

const contentVariants: Variants = {
  hidden: {
    clipPath: "inset(90% 0% 0% 0% round 40px)", // Grow from bottom
    opacity: 0,
    y: 10,
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
};

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

  // Calculate size based on proximity (40px base, 64px max for subtlety)
  const sizeSync = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const size = useSpring(sizeSync, { stiffness: 200, damping: 25, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      variants={itemVariants}
      className="flex items-center justify-center origin-bottom"
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

export function ReactionBar({
  pageType,
  entityId,
  className,
  variant = "inline",
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
    return (
      <div 
        className={cn(
          "relative flex flex-col items-center", // Combined flex container for better hover area
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
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={cn(
                "absolute bottom-[calc(100%-8px)] mb-3 left-1/2 -translate-x-1/2", // Closer to trigger
                "flex items-end gap-1.5 p-1.5 h-16", // More compact
                "squircle squircle-7xl squircle-smooth-xl",
                "squircle-sh-white dark:squircle-b-base",
                "squircle-border-2 squircle-border-b-base-accent",
                "z-50"
              )}
            >
              <div className="flex items-end h-full gap-0.5 px-0.5">
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
            "group relative flex items-center justify-center size-11 md:size-12", // Slightly smaller/subtle
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
              <span className="absolute -bottom-2.5 text-[10px] md:text-[11px] font-bold text-indigo-500 squircle squircle-full squircle-sh-white squircle-border squircle-border-indigo-500 px-1.5">
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
      "squircle-sh-white dark:squircle-b-base",
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
