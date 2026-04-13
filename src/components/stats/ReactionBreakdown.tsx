"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { ReactionType } from "@/lib/stats/types";

interface ReactionBreakdownProps {
  reactions: Record<ReactionType, number>;
  delay?: number;
}

const reactionConfig: Record<ReactionType, { emoji: string; label: string }> = {
  like: { emoji: "👍", label: "Likes" },
  heart: { emoji: "❤️", label: "Hearts" },
  celebrate: { emoji: "🎉", label: "Celebrations" },
  insightful: { emoji: "💡", label: "Insightful" },
};

export function ReactionBreakdown({
  reactions,
  delay = 0,
}: ReactionBreakdownProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  const reactionEntries = Object.entries(reactions) as [ReactionType, number][];
  const totalCount = reactionEntries.reduce((sum, [, count]) => sum + count, 0);

  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 flex h-full flex-col">
        <h2 className="mb-6 font-medium text-foreground">Reaction Breakdown</h2>

        <div className="flex flex-1 flex-col justify-center space-y-3">
          {reactionEntries.map(([type, count], index) => {
            const config = reactionConfig[type];
            const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + index * 0.1 }}
                onMouseEnter={() => setHoveredReaction(type)}
                onMouseLeave={() => setHoveredReaction(null)}
                className="flex items-center gap-3"
              >
                <motion.span
                  animate={{
                    scale: hoveredReaction === type ? 1.3 : 1,
                    rotate: hoveredReaction === type ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    rotate: { duration: 0.5 },
                  }}
                  className="text-2xl"
                >
                  {config.emoji}
                </motion.span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {config.label}
                    </span>
                    <motion.span
                      animate={{
                        scale: hoveredReaction === type ? 1.1 : 1,
                      }}
                      className="text-sm font-semibold text-foreground"
                    >
                      {count.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{
                        duration: 0.8,
                        delay: delay + index * 0.1 + 0.2,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
