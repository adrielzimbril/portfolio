"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface Category {
  name: string;
  count: number;
}

interface CategoryBarChartProps {
  categories: Category[];
  delay?: number;
}

const categoryColors = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export function CategoryBarChart({
  categories,
  delay = 0,
}: CategoryBarChartProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const maxCount = Math.max(...categories.map((c) => c.count));

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
        <h2 className="mb-6 font-medium text-foreground">
          Content by Category
        </h2>

        <div className="flex flex-1 flex-col justify-center space-y-4">
          {categories.map((category, index) => {
            const percentage = (category.count / maxCount) * 100;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + index * 0.1 }}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{category.name}</span>
                  <motion.span
                    animate={{
                      scale: hoveredBar === index ? 1.1 : 1,
                    }}
                    className="font-semibold text-foreground"
                  >
                    {category.count}
                  </motion.span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                      duration: 0.8,
                      delay: delay + index * 0.1 + 0.2,
                    }}
                    whileHover={{ width: `${Math.min(percentage + 5, 100)}%` }}
                    className="h-full rounded-full transition-all"
                    style={{
                      backgroundColor:
                        categoryColors[index % categoryColors.length],
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
