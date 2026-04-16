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
import { getResourcesUrl, pickRandomColor } from "@/utils";
import { DEFAULT_COLOR_CODE_NAME_LIST, PageType } from "@/types";

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
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const displayThoughts = thoughts.slice(0, 5);

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
            "flex relative flex-col size-full items-center justify-start gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
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

            <div className="flex flex-1 flex-col justify-center space-y-2">
              {displayThoughts.map((thought, index) => {
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
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          "capitalize text-xs font-medium",
                          // pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.VIOLET),
                          // "size-max text-primary-foreground",
                        )}
                        // variant="colored"
                        size="sm"
                        variant="primary"
                        circle
                      >
                        {index + 1}
                      </Badge>
                      <Link
                        href={getResourcesUrl(PageType.THOUGHT, thought.slug)}
                        className="flex flex-row w-full items-center justify-between gap-3"
                      >
                        <motion.span
                          animate={{
                            color: isItemHovered
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                          }}
                          className="flex-1 truncate text-sm leading-relaxed"
                        >
                          {thought.title}
                        </motion.span>
                        <motion.span
                          animate={{
                            scale: isItemHovered ? 1.05 : 1,
                            color: isItemHovered
                              ? "var(--primary)"
                              : "var(--muted-foreground)",
                          }}
                          className="shrink-0 text-xs font-semibold tabular-nums"
                        >
                          {thought.count}
                        </motion.span>
                      </Link>
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
