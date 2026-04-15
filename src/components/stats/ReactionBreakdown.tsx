"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { HeartOne, LikeHandOne, Sparkles, Lightbulb } from "@aurthle/icons";
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
    color: "text-primary",
  },
  heart: {
    Icon: "❤️",
    label: "Hearts",
    color: "text-destructive",
  },
  celebrate: {
    Icon: "🎉",
    label: "Celebrates",
    color: "text-secondary",
  },
  insightful: {
    Icon: "💡",
    label: "Insightful",
    color: "text-accent",
  },
  sceptic: {
    Icon: "🤔",
    label: "Sceptical",
    color: "text-secondary",
  },
};

const reactionDecorations = [
  { emoji: REACTION_CONFIG.like.Icon, x: "10%", y: "20%", rotate: -15, delay: 0 },
  { emoji: REACTION_CONFIG.heart.Icon, x: "75%", y: "15%", rotate: 10, delay: 0.1 },
  { emoji: REACTION_CONFIG.celebrate.Icon, x: "85%", y: "60%", rotate: -8, delay: 0.2 },
  { emoji: REACTION_CONFIG.insightful.Icon, x: "15%", y: "70%", rotate: 12, delay: 0.3 },
  { emoji: REACTION_CONFIG.sceptic.Icon, x: "45%", y: "45%", rotate: 0, delay: 0.4 },
];

export function ReactionBreakdown({
  reactions,
  delay = 0,
  className,
}: ReactionBreakdownProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden",
        className,
      )}
    >
      <CardContent className="grid grid-cols-1 size-full p-2 gap-2">
        <div
          className={cn(
            "squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {reactionDecorations.map((deco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: deco.rotate - 20 }}
                animate={{
                  opacity: isHovered ? 0.3 : 0.15,
                  scale: isHovered ? 1.3 : 1,
                  rotate: isHovered ? deco.rotate + 15 : deco.rotate,
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
              </motion.div>
            ))}
          </div>
          <div className="relative z-20 flex h-full flex-col px-2 py-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="capitalize" size="lg" circle>
                <HeartOne size={32} className="text-destructive" variant="bulk" />
              </Badge>
              <div className="flex flex-col">
                <h6 className="tracking-wide">Reactions</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {total.toLocaleString()} total
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {(Object.keys(REACTION_CONFIG) as ReactionType[]).map(
                (type, index) => {
                  const count = reactions[type] || 0;
                  const config = REACTION_CONFIG[type];
                  const Icon = config.Icon;

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: delay + index * 0.1,
                      }}
                      className="flex items-center gap-2 p-2 squircle-border-border/50 rounded-xl"
                    >
                      <span className="text-2xl">{config.Icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold tabular-nums text-foreground">
                          {count.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {config.label}
                        </span>
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
