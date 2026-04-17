import { 
  ReactionRoot, 
  ReactionTrigger, 
  ReactionDock,
  ReactionItem,
  DOCK_REVEAL_VARIANTS,
  ITEM_VARIANTS 
} from "@/components/shared/reactions/ReactionBar";
import { ReactionButton } from "@/components/shared/reactions/ReactionButton";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { useReactions } from "@/lib/reactions/use-reactions";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "motion/react";

// Constants for the reactions
const REACTION_EMOJIS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: "👍",
  [ReactionType.HEART]: "❤️",
  [ReactionType.CELEBRATE]: "🎉",
  [ReactionType.INSIGHTFUL]: "💡",
  [ReactionType.SCEPTIC]: "🤔",
};

interface AbsoluteReactionBarProps {
  pageType: PageType;
  entityId: string;
  reactionsPosition?: "top" | "bottom";
  className?: string;
}

export function AbsoluteReactionBar({
  pageType,
  entityId,
  reactionsPosition,
  className,
}: AbsoluteReactionBarProps) {
  const isMobile = useIsMobile(1024);
  const { reactions } = useReactions(pageType, entityId);
  const totalCount = Object.values(reactions).reduce((acc, curr) => acc + curr, 0);
  
  const reactionTypes = Object.values(ReactionType);
  const sortedReactions = reactionTypes
    .map((type) => ({ type, count: reactions[type] || 0 }))
    .sort((a, b) => b.count - a.count);

  const firstReaction = sortedReactions[0];
  const primaryReaction = firstReaction && firstReaction.count > 0 
    ? firstReaction.type 
    : ReactionType.LIKE;

  if (!reactionsPosition) return null;

  // Mobile "Button Mode": Display reactions directly in a compact horizontal bar
  if (isMobile) {
    return (
      <div className={cn(
        "absolute z-20 pointer-events-auto",
        reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-6",
        className
      )}>
        <motion.div 
          initial="hidden"
          animate="show"
          variants={DOCK_REVEAL_VARIANTS}
          className={cn(
            "flex items-center gap-1.5 p-1.5 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md",
            "squircle squircle-7xl squircle-smooth-xl shadow-xl border-2 border-b-base-accent"
          )}
        >
          {reactionTypes.map((type) => (
            <motion.div key={type} variants={ITEM_VARIANTS}>
              <ReactionButton 
                pageType={pageType}
                entityId={entityId}
                reactionType={type}
                count={reactions[type] || 0}
                minimal
                className="size-8" // Slightly smaller for mobile cards
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Desktop "Dock Mode": Maintain floating popover
  return (
    <ReactionRoot
      pageType={pageType}
      entityId={entityId}
      orientation="vertical"
      dockPosition={reactionsPosition}
      className={cn(
        "absolute z-20 pointer-events-auto",
        reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-6",
        className
      )}
    >
      <ReactionTrigger>
        <div className="flex flex-col items-center justify-center relative pointer-events-none">
          <span className="text-xl">
            {REACTION_EMOJIS[primaryReaction]}
          </span>
          {totalCount > 0 && (
            <span className={cn(
              "absolute font-bold text-indigo-500 squircle squircle-xl squircle-sh-white squircle-border squircle-border-indigo-500 px-1.5",
              reactionsPosition === "bottom" ? "-bottom-2.5" : "-top-2.5",
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
