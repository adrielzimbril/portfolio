"use client";

import React, { useState, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { motion, AnimatePresence, type Variants } from "motion/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
    scale: 0.9,
    filter: "blur(4px)",
  },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.15,
      staggerChildren: 0.1,
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
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400); // Increased delay to 400ms for better "bridge" crossing
  };

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
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <div 
          className={cn("relative flex flex-col items-center group/reaction-area", className)}
          onPointerEnter={handleMouseEnter}
          onPointerLeave={handleMouseLeave}
        >
          {children}
        </div>
      </DropdownMenu.Root>
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

  // We use our own handlers to support hover
  const handlePointerEnter = () => setIsOpen(true);

  return (
    <DropdownMenu.Trigger asChild>
      <Comp
        layout
        onPointerEnter={handlePointerEnter}
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
    </DropdownMenu.Trigger>
  );
}

export function ReactionDock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen, dockPosition, activeOrientation } = useReaction();
  const isVertical = activeOrientation === "vertical";
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400); // 400ms delay
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <DropdownMenu.Portal forceMount>
          <DropdownMenu.Content
            forceMount
            asChild
            side={dockPosition === "bottom" ? "bottom" : "top"}
            align="center"
            sideOffset={4}
            collisionPadding={16}
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <motion.div
              variants={DOCK_REVEAL_VARIANTS}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={cn(
                "z-50 p-2",
                "relative",
                isVertical 
                  ? "flex flex-col w-[64px] h-auto items-center justify-center py-4"
                  : "flex flex-row h-14 w-max items-center justify-center px-4",
                "gap-2",
                "squircle squircle-4xl squircle-smooth-xl",
                "squircle-sh-white dark:squircle-b-base",
                "squircle-border-2 squircle-border-b-base-accent",
                "whitespace-nowrap shadow-xl bg-white dark:bg-zinc-950",
                "focus:outline-none",
                className
              )}
            >
              {/* Invisible Bridge to prevent closing when moving mouse from trigger to dock */}
              <div 
                className={cn(
                  "absolute pointer-events-auto z-[-1]",
                  dockPosition === "bottom" ? "-top-8 h-8" : "-bottom-8 h-8",
                  "left-[-20px] right-[-20px]" // Wider bridge
                )}
              />
              
              <div 
                className={cn(
                  "flex gap-1.5",
                  isVertical ? "flex-col w-full items-center" : "flex-row h-full items-center"
                )}
              >
                {children}
              </div>
              <DropdownMenu.Arrow className="fill-white dark:fill-zinc-950" />
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
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
