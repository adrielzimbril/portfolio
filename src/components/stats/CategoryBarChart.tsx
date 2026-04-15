"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChartBar } from "@aurthle/icons";
import type { CategoryCount } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryBarChartProps {
  categories: CategoryCount[];
  delay?: number;
  className?: string;
}

const BAR_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-muted",
  "bg-destructive",
  "bg-blue-500",
];

export function CategoryBarChart({
  categories,
  delay = 0,
  className,
}: CategoryBarChartProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxCount = Math.max(...categories.map((c) => c.count), 1);
  const displayCategories = categories.slice(0, 6);

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
            📊
          </motion.div>

          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4 mb-4",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                <ChartBar size={32} className="text-primary" variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Categories</h6>
                <p className="text-xs text-muted-foreground">
                  Thoughts by topic
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-3">
              {displayCategories.map((category, index) => {
                const percentage = (category.count / maxCount) * 100;
                const color = BAR_COLORS[index % BAR_COLORS.length];
                const isBarHovered = hoveredBar === index;

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: delay + index * 0.08 }}
                    className="group/bar"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="truncate text-xs font-medium text-muted-foreground">
                        {category.name}
                      </span>
                      <motion.span
                        animate={{
                          scale: isBarHovered ? 1.1 : 1,
                          color: isBarHovered
                            ? "var(--primary)"
                            : "var(--muted-foreground)",
                        }}
                        className="ml-2 shrink-0 text-xs font-semibold tabular-nums"
                      >
                        {category.count}
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
                        className={`absolute inset-y-0 left-0 origin-left rounded-full ${color}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {categories.length > 6 && (
              <motion.p
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                className="mt-4 text-xs text-muted-foreground"
              >
                +{categories.length - 6} more categories
              </motion.p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
