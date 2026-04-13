"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  delay?: number;
}

export function LighthouseScoreCard({ scores, strategy, delay = 0 }: LighthouseScoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardClassName = "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card";

  const metrics = [
    { label: "Performance", score: scores.performance, color: "#3b82f6" },
    { label: "Accessibility", score: scores.accessibility, color: "#22c55e" },
    { label: "Best Practices", score: scores.bestPractices, color: "#f59e0b" },
    { label: "SEO", score: scores.seo, color: "#8b5cf6" },
  ];

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
          Lighthouse Scores ({strategy})
        </h2>

        <div className="flex-1 space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <motion.span
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  className="font-semibold text-foreground"
                >
                  {metric.score}
                </motion.span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 0.8, delay: delay + index * 0.1 + 0.2 }}
                  className="h-full rounded-full transition-all"
                  style={{ backgroundColor: metric.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
