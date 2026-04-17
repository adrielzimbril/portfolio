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
  if (!context)
    throw new Error("Reaction components must be used within ReactionRoot");
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

export const DOCK_REVEAL_VARIANTS: Variants = {
  hidden: {
    clipPath: "inset(20% 50% 80% 50% round 24px)",
    opacity: 0,
    scale: 0.95,
  },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
      mass: 1,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

export const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 10,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
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

  const handleOpen = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  }, []);

  return (
    <ReactionContext.Provider
      value={{
        isOpen,
        setIsOpen,
        pageType,
        entityId,
        activeOrientation: orientation,
        dockPosition,
        reactions,
      }}
    >
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <div
          className={cn(
            "relative inline-flex flex-col items-center",
            className,
          )}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          onPointerEnter={handleOpen}
          onPointerLeave={handleClose}
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

  return (
    <DropdownMenu.Trigger asChild>
      <Comp
        layout
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "group relative flex items-center justify-center size-10 md:size-11",
          "squircle squircle-xl squircle-smooth-xl",
          "squircle-sh-white dark:squircle-b-base",
          "squircle-border-2 squircle-border-b-base-accent",
          "cursor-pointer z-20 transition-colors",
          className,
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

  const handleOpen = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  }, [setIsOpen]);

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
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onPointerEnter={handleOpen}
            onPointerLeave={handleClose}
          >
            <motion.div
              variants={DOCK_REVEAL_VARIANTS}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={cn(
                "z-50 p-2 relative outline-none",
                isVertical
                  ? "flex flex-col w-[64px] h-auto items-center justify-center py-4"
                  : "flex flex-row h-14 w-max items-center justify-center px-4",
                "gap-2",
                "squircle squircle-4xl squircle-smooth-xl",
                "squircle-sh-white dark:squircle-b-base",
                "squircle-border-2 squircle-border-b-base-accent",
                "whitespace-nowrap shadow-xl bg-white dark:bg-zinc-950",
                className,
              )}
            >
              <div
                className={cn(
                  "absolute pointer-events-auto z-[-1]",
                  dockPosition === "bottom" ? "-top-8 h-8" : "-bottom-8 h-8",
                  "left-[-24px] right-[-24px]",
                )}
              />

              <div
                className={cn(
                  "flex gap-1.5",
                  isVertical
                    ? "flex-col w-full items-center"
                    : "flex-row h-full items-center",
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
  compact = false,
}: {
  type: ReactionType;
  className?: string;
  compact?: boolean;
}) {
  const { pageType, entityId, reactions, setIsOpen } = useReaction();

  return (
    <motion.div
      variants={ITEM_VARIANTS}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center justify-center origin-center cursor-pointer",
        compact ? "size-8" : "size-10",
        className,
      )}
      onClick={() => setIsOpen(false)}
    >
      <ReactionButton
        pageType={pageType}
        entityId={entityId}
        reactionType={type}
        count={reactions[type] || 0}
        minimal
        compact={compact}
        className="size-full"
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
  compact = false,
}: {
  pageType: PageType;
  entityId: string;
  className?: string;
  variant?: "inline" | "dock";
  dockPosition?: "top" | "bottom";
  orientation?: "horizontal" | "vertical";
  compact?: boolean;
}) {
  const activeOrientation =
    orientation || (variant === "dock" ? "vertical" : "horizontal");
  const reactionTypes = Object.values(ReactionType);
  const { reactions } = useReactions(pageType, entityId);
  const totalCount = Object.values(reactions).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const firstReaction = sortedReactions[0];
  const primaryReaction =
    firstReaction && firstReaction.count > 0
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
            <span className="text-xl">{REACTION_EMOJIS[primaryReaction]}</span>
            {totalCount > 0 && (
              <span
                className={cn(
                  "absolute font-bold text-indigo-500 squircle squircle-xl squircle-sh-white squircle-border squircle-border-indigo-500 px-1.5",
                  dockPosition === "bottom" ? "-bottom-2.5" : "-top-2.5",
                  "text-[10px] md:text-[11px]",
                )}
              >
                {totalCount}
              </span>
            )}
          </div>
        </ReactionTrigger>
        <ReactionDock>
          {reactionTypes.map((type) => (
            <ReactionItem key={type} type={type} compact={compact} />
          ))}
        </ReactionDock>
      </ReactionRoot>
    );
  }

  return (
    <div
      className={cn(
        "w-fit flex flex-col items-center",
        compact ? "gap-2" : "gap-4",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          compact ? "gap-1.5" : "gap-3",
        )}
      >
        {reactionTypes.map((type) => (
          <ReactionButton
            key={type}
            pageType={pageType}
            entityId={entityId}
            reactionType={type}
            count={reactions[type] || 0}
            className={compact ? "scale-100" : "scale-110"}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
