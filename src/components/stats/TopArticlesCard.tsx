"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface ArticleMetric {
  slug: string;
  title: string;
  count: number;
}

interface TopArticlesCardProps {
  title: string;
  articles: ArticleMetric[];
  metricLabel: string;
  delay?: number;
}

export function TopArticlesCard({
  title,
  articles,
  metricLabel,
  delay = 0,
}: TopArticlesCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
                            ? "rgb(99, 102, 241)"
                            : "rgba(99, 102, 241, 0.1)",
                        color:
                          hoveredItem === index ? "white" : "rgb(99, 102, 241)",
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
                            ? "rgb(30, 41, 59)"
                            : "rgb(148, 163, 184)",
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
