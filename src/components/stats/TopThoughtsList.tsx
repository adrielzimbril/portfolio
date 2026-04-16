"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { TrendingUp, Heart } from "@aurthle/icons";
import type { ThoughtMetric } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopThoughtsListProps {
  title: string;
  description: string;
  thoughts: ThoughtMetric[];
  metricLabel: string;
  icon: React.ReactNode;
  decoration: string;
  delay?: number;
  className?: string;
}

export function TopThoughtsList({
  title,
  description,
  thoughts,
  metricLabel,
  icon,
  decoration,
  delay = 0,
  className,
}: TopThoughtsListProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const displayThoughts = thoughts.slice(0, 5);
  const maxCount = Math.max(...displayThoughts.map((t) => t.count), 1);

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
            {decoration}
          </motion.div>

          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4 mb-4",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                {icon}
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{title}</h6>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-3">
              {displayThoughts.map((thought, index) => {
                const percentage = (thought.count / maxCount) * 100;
                const isItemHovered = hoveredItem === index;

                return (
                  <motion.div
                    key={thought.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: delay + index * 0.08 }}
                    className="group/item"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <Link
                        href={`/blog/${thought.slug}`}
                        className="truncate text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {thought.title}
                      </Link>
                      <motion.span
                        animate={{
                          scale: isItemHovered ? 1.1 : 1,
                          color: isItemHovered
                            ? "var(--primary)"
                            : "var(--muted-foreground)",
                        }}
                        className="ml-2 shrink-0 text-xs font-semibold tabular-nums"
                      >
                        {thought.count}
                      </motion.span>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-border/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${percentage}%`,
                          scaleY: isItemHovered ? 1.15 : 1,
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
                        className="absolute inset-y-0 left-0 origin-left rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {thoughts.length > 5 && (
              <motion.p
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                className="mt-4 text-xs text-muted-foreground"
              >
                +{thoughts.length - 5} more {metricLabel}
              </motion.p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
