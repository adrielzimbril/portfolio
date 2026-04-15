"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { CategoryCount } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

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

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 flex h-full flex-col">
          <h2 className="mb-2 font-medium text-foreground">Categories</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Articles by topic
          </p>

          <div className="flex flex-1 flex-col justify-center space-y-3">
            {displayCategories.map((category, index) => {
              const percentage = (category.count / maxCount) * 100;
              const color = BAR_COLORS[index % BAR_COLORS.length];

              return (
                <div key={category.name} className="group/bar">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="truncate text-xs font-medium text-muted-foreground">
                      {category.name}
                    </span>
                    <span className="ml-2 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                      {category.count}
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-border/30">
                    <div
                      style={{ width: `${percentage}%` }}
                      className={`absolute inset-y-0 left-0 origin-left rounded-full ${color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {categories.length > 6 && (
            <p className="mt-4 text-xs text-muted-foreground opacity-60">
              +{categories.length - 6} more categories
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 flex h-full flex-col">
        <h2 className="mb-2 font-medium text-foreground">Categories</h2>
        <p className="mb-4 text-sm text-muted-foreground">Articles by topic</p>

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
    </motion.div>
  );
}
