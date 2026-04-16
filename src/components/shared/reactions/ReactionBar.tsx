"use client";

import React, { useState, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { motion, AnimatePresence, type Variants } from "motion/react";

// --- Context & Types ---

interface ReactionContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageType: PageType;
  entityId: string;
  activeOrientation: "horizontal" | "vertical";
  dockPosition: "top" | "bottom";
  reactions: Record<ReactionType, number>;
}

const ReactionContext = createContext<ReactionContextValue | null>(null);

const useReaction = () => {
  const context = useContext(ReactionContext);
  if (!context) throw new Error("Reaction components must be used within ReactionRoot");
  return context;
};

// --- CONSTANTS ---

const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

const DOCK_REVEAL_VARIANTS: Variants = {
  hidden: {
    clipPath: "inset(10% 50% 90% 50% round 24px)",
    opacity: 0,
    scale: 0.95,
  },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
};

// --- Compound Components ---

export function ReactionRoot({
  children,
  pageType,
  entityId,
  className,
  orientation = "horizontal",
  dockPosition = "bottom",
}: {
  children: React.ReactNode;
  pageType: PageType;
  entityId: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  dockPosition?: "top" | "bottom";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { reactions } = useReactions(pageType, entityId);

  return (
    <ReactionContext.Provider value={{
      isOpen,
      setIsOpen,
      pageType,
      entityId,
      activeOrientation: orientation,
      dockPosition,
      reactions,
    }}>
      <div 
        className={cn("relative flex flex-col items-center group/reaction-area", className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </ReactionContext.Provider>
  );
}

export function ReactionTrigger({
  asChild = false,
  children,
  className,
  ...props
}: {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.button>) {
  const { isOpen, setIsOpen } = useReaction();
  const Comp = asChild ? Slot : motion.button;

  return (
    <Comp
      layout
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      className={cn(
        "group relative flex items-center justify-center size-10 md:size-11",
        "squircle squircle-full squircle-smooth-xl",
        "squircle-sh-white dark:squircle-b-base",
        "squircle-border-2 squircle-border-b-base-accent",
        "cursor-pointer z-[10] transition-colors",
        className
      )}
      style={{ scale: isOpen ? 1.05 : 1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function ReactionDock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, dockPosition, activeOrientation } = useReaction();
  const isVertical = activeOrientation === "vertical";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={DOCK_REVEAL_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
          className={cn(
            "absolute left-1/2 z-50 p-2",
            dockPosition === "bottom" ? "top-[calc(100%+2px)]" : "bottom-[calc(100%+2px)]",
            isVertical 
              ? "flex flex-col w-[56px] h-auto items-center justify-center py-4"
              : "flex flex-row h-14 w-max items-center justify-center px-4",
            "gap-2",
            "squircle squircle-5xl squircle-smooth-xl",
            "squircle-sh-white dark:squircle-b-base",
            "squircle-border-2 squircle-border-b-base-accent",
            "whitespace-nowrap shadow-xl bg-white dark:bg-zinc-950",
            className
          )}
          style={{ x: "-50%" }}
        >
          <div 
            className={cn(
              "flex gap-1.5",
              isVertical ? "flex-col w-full items-center" : "flex-row h-full items-center"
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ReactionItem({
  type,
  className,
}: {
  type: ReactionType;
  className?: string;
}) {
  const { pageType, entityId, reactions, setIsOpen } = useReaction();

  return (
    <motion.div
      variants={ITEM_VARIANTS}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={cn("flex items-center justify-center size-10 origin-center cursor-pointer", className)}
      onClick={() => setIsOpen(false)}
    >
      <ReactionButton
        pageType={pageType}
        entityId={entityId}
        reactionType={type}
        count={reactions[type] || 0}
        minimal
        className="w-full h-full"
      />
    </motion.div>
  );
}

// --- Convenience Wrapper ---

export function ReactionBar({
  pageType,
  entityId,
  className,
  variant = "inline",
  dockPosition = "bottom",
  orientation,
}: {
  pageType: PageType;
  entityId: string;
  className?: string;
  variant?: "inline" | "dock";
  dockPosition?: "top" | "bottom";
  orientation?: "horizontal" | "vertical";
}) {
  const activeOrientation = orientation || (variant === "dock" ? "vertical" : "horizontal");
  const reactionTypes = Object.values(ReactionType);
  const { reactions } = useReactions(pageType, entityId);
  const totalCount = Object.values(reactions).reduce((acc, curr) => acc + curr, 0);
  
  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const firstReaction = sortedReactions[0];
  const primaryReaction = firstReaction && firstReaction.count > 0 
    ? firstReaction.type 
    : ReactionType.LIKE;

  if (variant === "dock") {
    return (
      <ReactionRoot 
        pageType={pageType} 
        entityId={entityId} 
        orientation={activeOrientation}
        dockPosition={dockPosition}
      >
        <ReactionTrigger className={className}>
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
        </ReactionTrigger>
        <ReactionDock>
          {reactionTypes.map((type) => (
            <ReactionItem key={type} type={type} />
          ))}
        </ReactionDock>
      </ReactionRoot>
    );
  }

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
            className="scale-110"
          />
        ))}
      </div>
    </div>
  );
}
