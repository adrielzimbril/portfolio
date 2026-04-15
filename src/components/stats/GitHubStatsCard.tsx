"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Star, Github, Git, Calendar } from "@aurthle/icons";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

type GitHubStatType = "stars" | "forks" | "commits";

interface GitHubStatsCardProps {
  type: GitHubStatType;
  label: string;
  value: number;
  delay?: number;
  change?: number;
  period?: string;
  className?: string;
}

const themeConfig = {
  stars: {
    icon: Star,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-transparent",
  },
  forks: {
    icon: Git,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-500/10",
    glowColor: "shadow-teal-500/20",
    gradient: "from-teal-500/20 to-transparent",
  },
  commits: {
    icon: Github,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    glowColor: "shadow-violet-500/20",
    gradient: "from-violet-500/20 to-transparent",
  },
};

export function GitHubStatsCard({
  type,
  label,
  value,
  delay = 0,
  change,
  period,
  className,
}: GitHubStatsCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(
    shouldReduceAnimations ? value : 0,
  );

  const theme = themeConfig[type];
  const Icon = theme.icon;

  useEffect(() => {
    if (shouldReduceAnimations) {
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;

      if (elapsed < 0) {
        requestAnimationFrame(animateCount);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, delay, shouldReduceAnimations]);

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: theme.iconColor.replace("text-", "") }}
        />

        <div className="relative z-20 flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-b-base text-foreground shadow-lg">
              <Icon size={24} className={theme.iconColor} />
            </div>
            {change !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                  change >= 0
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500",
                )}
              >
                {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
              </div>
            )}
          </div>

          <div className="mt-auto">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </h3>
            <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
              {displayValue.toLocaleString()}
            </p>
            {period && (
              <p className="mt-1 text-xs text-muted-foreground">{period}</p>
            )}
          </div>
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

      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: theme.iconColor.replace("text-", "") }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-20 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <motion.div
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              y: isHovered ? -4 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              rotate: { duration: 0.5 },
              y: { type: "spring", stiffness: 200, damping: 15 },
              scale: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-b-base text-foreground shadow-lg"
          >
            <Icon size={24} className={theme.iconColor} />
          </motion.div>

          {change !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3, duration: 0.3 }}
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                change >= 0
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500",
              )}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
            </motion.div>
          )}
        </div>

        <div className="mt-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </h3>
          <motion.p
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-1 text-4xl font-bold tracking-tight text-foreground"
          >
            {displayValue.toLocaleString()}
          </motion.p>
          {period && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4, duration: 0.3 }}
              className="mt-1 text-xs text-muted-foreground"
            >
              {period}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
