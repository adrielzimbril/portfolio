"use client";

import { motion } from "motion/react";
import type { ContributionData } from "@/lib/stats/types";

interface ContributionGraphCardProps {
  contributions: ContributionData | null;
  delay?: number;
}

export function ContributionGraphCard({
  contributions,
  delay = 0,
}: ContributionGraphCardProps) {
  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card";

  const getLevel = (level: string) => {
    switch (level) {
      case "NONE":
        return "bg-muted";
      case "FIRST_QUARTILE":
        return "bg-primary/20";
      case "SECOND_QUARTILE":
        return "bg-primary/40";
      case "THIRD_QUARTILE":
        return "bg-primary/60";
      case "FOURTH_QUARTILE":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  if (!contributions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cardClassName}
      >
        <div className="relative z-20 flex h-full items-center justify-center">
          <p className="text-muted-foreground">
            No contribution data available
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 flex h-full flex-col">
        <h2 className="mb-6 font-medium text-foreground">
          GitHub Contributions
        </h2>

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {contributions.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: delay + (weekIndex * 7 + dayIndex) * 0.01,
                    }}
                    className="w-3 h-3 rounded-sm transition-all hover:scale-125"
                    style={{ backgroundColor: getLevel(day.contributionLevel) }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/60" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
