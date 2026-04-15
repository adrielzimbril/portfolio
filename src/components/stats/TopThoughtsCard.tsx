"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import type { ThoughtMetric } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface TopThoughtsCardProps {
  title: string;
  articles: ThoughtMetric[];
  metricLabel: string;
  delay?: number;
  className?: string;
}

export function TopThoughtsCard({
  title,
  articles,
  metricLabel,
  delay = 0,
  className,
}: TopThoughtsCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
          <h2 className="mb-4 font-medium text-foreground">{title}</h2>

          {articles.length > 0 ? (
            <ul className="flex flex-1 flex-col justify-center space-y-3">
              {articles.map((article, index) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {article.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                      {article.count.toLocaleString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No data available yet
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
        <h2 className="mb-4 font-medium text-foreground">{title}</h2>

        {articles.length > 0 ? (
          <ul className="flex flex-1 flex-col justify-center space-y-3">
            {articles.map((article, index) => (
              <motion.li
                key={article.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + index * 0.1 }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      animate={{
                        scale: hoveredItem === index ? 1.15 : 1,
                        backgroundColor:
                          hoveredItem === index
                            ? "var(--primary)"
                            : "rgba(var(--primary), 0.1)",
                        color:
                          hoveredItem === index ? "white" : "var(--primary)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                    >
                      {index + 1}
                    </motion.span>
                    <motion.span
                      animate={{
                        color:
                          hoveredItem === index
                            ? "var(--foreground)"
                            : "var(--muted-foreground)",
                      }}
                      className="line-clamp-2 text-sm leading-relaxed"
                    >
                      {article.title}
                    </motion.span>
                  </div>
                  <motion.span
                    animate={{
                      scale: hoveredItem === index ? 1.1 : 1,
                    }}
                    className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground"
                  >
                    {article.count.toLocaleString()}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No data available yet</p>
        )}
      </div>
    </motion.div>
  );
}
