"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Heart } from "@aurthle/icons";
import type { ReactionType } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReactionBreakdownProps {
  reactions: Record<ReactionType, number>;
  delay?: number;
  className?: string;
}

const REACTION_CONFIG: Record<
  ReactionType,
  {
    Icon: string;
    label: string;
    color: string;
  }
> = {
  like: {
    Icon: "👍",
    label: "Likes",
    color: "bg-primary",
  },
  heart: {
    Icon: "❤️",
    label: "Hearts",
    color: "bg-rose-500",
  },
  celebrate: {
    Icon: "🎉",
    label: "Celebrates",
    color: "bg-secondary",
  },
  insightful: {
    Icon: "💡",
    label: "Insightful",
    color: "bg-amber-500",
  },
  sceptic: {
    Icon: "🤔",
    label: "Sceptical",
    color: "bg-slate-500",
  },
};

const reactionDecorations = [
  {
    emoji: REACTION_CONFIG.like.Icon,
    x: "10%",
    y: "20%",
    rotate: -15,
    delay: 0,
  },
  {
    emoji: REACTION_CONFIG.heart.Icon,
    x: "75%",
    y: "15%",
    rotate: 10,
    delay: 0.1,
  },
  {
    emoji: REACTION_CONFIG.celebrate.Icon,
    x: "85%",
    y: "60%",
    rotate: -8,
    delay: 0.2,
  },
  {
    emoji: REACTION_CONFIG.insightful.Icon,
    x: "15%",
    y: "70%",
    rotate: 12,
    delay: 0.3,
  },
  {
    emoji: REACTION_CONFIG.sceptic.Icon,
    x: "45%",
    y: "45%",
    rotate: 0,
    delay: 0.4,
  },
];

export function ReactionBreakdown({
  reactions,
  delay = 0,
  className,
}: ReactionBreakdownProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);
  const maxCount = Math.max(...Object.values(reactions), 1);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden",
        className,
      )}
    >
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-center gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          <motion.div
            animate={{
              rotate: isHovered ? 5 : -5,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-2 -right-2 text-[100px] leading-none opacity-10"
          >
            ❤️
          </motion.div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {reactionDecorations.map((deco, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: deco.rotate - 20 }}
                animate={{
                  opacity: isHovered ? 0.2 : 0.1,
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? deco.rotate + 10 : deco.rotate,
                  y: isHovered ? -8 : 0,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: delay + deco.delay },
                  scale: { type: "spring", stiffness: 200, damping: 15 },
                  rotate: { type: "spring", stiffness: 200, damping: 15 },
                  y: { type: "spring", stiffness: 200, damping: 15 },
                }}
                className="absolute text-2xl"
                style={{ left: deco.x, top: deco.y }}
              >
                {deco.emoji}
              </motion.span>
            ))}
          </div>

          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4 mb-4",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                <Heart size={32} className="text-rose-500" variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Reactions</h6>
                <p className="text-xs text-muted-foreground">
                  {total.toLocaleString()} total
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-3">
              {(Object.keys(REACTION_CONFIG) as ReactionType[]).map(
                (type, index) => {
                  const count = reactions[type] || 0;
                  const config = REACTION_CONFIG[type];
                  const percentage = (count / maxCount) * 100;
                  const isBarHovered = hoveredBar === index;

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: delay + index * 0.08,
                      }}
                      className="group/bar"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{config.Icon}</span>
                          <span className="truncate text-xs font-medium text-muted-foreground">
                            {config.label}
                          </span>
                        </div>
                        <motion.span
                          animate={{
                            scale: isBarHovered ? 1.1 : 1,
                            color: isBarHovered
                              ? "var(--primary)"
                              : "var(--muted-foreground)",
                          }}
                          className="ml-2 shrink-0 text-xs font-semibold tabular-nums"
                        >
                          {count.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="relative h-3 w-full overflow-hidden rounded-full bg-border/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${percentage}%`,
                            scaleY: isBarHovered ? 1.15 : 1,
                          }}
                          transition={{
                            width: {
                              duration: 0.8,
                              delay: delay + index * 0.08 + 0.2,
                              ease: "easeOut",
                            },
                            scaleY: {
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            },
                          }}
                          className={`absolute inset-y-0 left-0 origin-left rounded-full ${config.color}`}
                        />
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
