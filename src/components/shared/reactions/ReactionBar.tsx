"use client";

import React, { useState, useRef, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue, type Variants } from "motion/react";

// --- Context & Types ---

interface ReactionContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageType: PageType;
  entityId: string;
  activeOrientation: "horizontal" | "vertical";
  dockPosition: "top" | "bottom";
  mouseX: MotionValue;
  mouseY: MotionValue;
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
    clipPath: "inset(10% 50% 90% 50% round 40px)",
    opacity: 0,
    scale: 0.95,
  },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 40px)",
    opacity: 1,
    scale: 1,
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
    scale: 0.3,
    filter: "blur(20px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
};

// --- Compound Components ---

export function ReactionRoot({
  children,
  pageType,
  entityId,
  orientation = "horizontal",
  dockPosition = "bottom",
}: {
  children: React.ReactNode;
  pageType: PageType;
  entityId: string;
  orientation?: "horizontal" | "vertical";
  dockPosition?: "top" | "bottom";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const { reactions } = useReactions(pageType, entityId);

  return (
    <ReactionContext.Provider value={{
      isOpen,
      setIsOpen,
      pageType,
      entityId,
      activeOrientation: orientation,
      dockPosition,
      mouseX,
      mouseY,
      reactions,
    }}>
      <div 
        className="relative flex flex-col items-center group/reaction-area"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            setIsOpen(false);
            mouseX.set(Infinity);
            mouseY.set(Infinity);
          }, 100);
        }}
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      className={cn(
        "group relative flex items-center justify-center size-11 md:size-12",
        "squircle squircle-full squircle-smooth-xl",
        "squircle-sh-white dark:squircle-b-base",
        "squircle-border-2 squircle-border-b-base-accent",
        "cursor-pointer z-[10] transition-colors",
        className
      )}
      style={{ scale: isOpen ? 1.02 : 1 }}
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
            "absolute left-1/2 z-50 p-3",
            dockPosition === "bottom" ? "top-[calc(100%+8px)] mt-3" : "bottom-[calc(100%+8px)] mb-3",
            isVertical 
              ? "flex flex-col w-[72px] h-auto items-center justify-center py-5"
              : "flex flex-row h-16 w-max items-center justify-center px-5",
            "gap-3",
            "squircle squircle-7xl squircle-smooth-xl",
            "squircle-sh-white dark:squircle-b-base",
            "squircle-border-2 squircle-border-b-base-accent",
            "whitespace-nowrap shadow-2xl",
            className
          )}
          style={{ x: "-50%" }}
        >
          <div 
            className={cn(
              "flex gap-2",
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
  const { mouseX, mouseY, activeOrientation, pageType, entityId, reactions, setIsOpen } = useReaction();
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(activeOrientation === "horizontal" ? mouseX : mouseY, (val) => {
    if (val === Infinity) return 1000;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const center = activeOrientation === "horizontal" 
      ? bounds.x + bounds.width / 2 
      : bounds.y + bounds.height / 2;
    return val - center;
  });

  const sizeSync = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const size = useSpring(sizeSync, { stiffness: 200, damping: 25, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      variants={ITEM_VARIANTS}
      className={cn("flex items-center justify-center origin-center", className)}
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
