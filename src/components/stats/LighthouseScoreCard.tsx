"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Display, Mobile } from "@aurthle/icons";
import type { LighthouseScores } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  delay?: number;
  className?: string;
}

interface ScoreBarProps {
  score: number;
  label: string;
  delay?: number;
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}

function getScoreColor(score: number) {
  if (score >= 90) {
    return {
      bar: "bg-primary",
      barBg: "bg-primary/10",
      text: "text-primary",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-accent",
      barBg: "bg-accent/10",
      text: "text-accent",
    };
  }
  return {
    bar: "bg-destructive",
    barBg: "bg-destructive/10",
    text: "text-destructive",
  };
}

function ScoreBar({
  score,
  label,
  delay = 0,
  isHovered,
  shouldReduceAnimations,
}: ScoreBarProps) {
  const [displayScore, setDisplayScore] = useState(
    shouldReduceAnimations ? score : 0,
  );
  const colors = getScoreColor(score);

  useEffect(() => {
    if (shouldReduceAnimations) {
      return;
    }

    const duration = 1200;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    const animateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;

      if (elapsed < 0) {
        requestAnimationFrame(animateScore);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.floor(eased * score));

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [score, delay, shouldReduceAnimations]);

  if (shouldReduceAnimations) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
            {displayScore}
          </span>
        </div>
        <div
          className={`h-2 w-full overflow-hidden rounded-full ${colors.barBg}`}
        >
          <div
            style={{ width: `${displayScore}%` }}
            className={`h-full rounded-full ${colors.bar}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <motion.span
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`text-sm font-bold tabular-nums ${colors.text}`}
        >
          {displayScore}
        </motion.span>
      </div>
      <div
        className={`h-2 w-full overflow-hidden rounded-full ${colors.barBg}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${displayScore}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className={`h-full rounded-full ${colors.bar}`}
        />
      </div>
    </div>
  );
}

export function LighthouseScoreCard({
  scores,
  strategy,
  delay = 0,
  className,
}: LighthouseScoreCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);

  const scoreItems = [
    { score: scores.performance, label: "Performance" },
    { score: scores.accessibility, label: "Accessibility" },
    { score: scores.bestPractices, label: "Best Practices" },
    { score: scores.seo, label: "SEO" },
  ];

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  const DeviceIcon = strategy === "mobile" ? Mobile : Display;

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-foreground">
            <DeviceIcon size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-foreground">
              {strategy === "mobile" ? "Mobile" : "Desktop"}
            </h2>
            <p className="text-xs text-muted-foreground">Lighthouse</p>
          </div>
        </div>

        <div className="relative z-20 grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
          {scoreItems.map((item, i) => (
            <ScoreBar
              key={item.label}
              score={item.score}
              label={item.label}
              delay={delay + 0.15 + i * 0.08}
              isHovered={false}
              shouldReduceAnimations={shouldReduceAnimations}
            />
          ))}
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

      <div className="relative z-20 mb-4 flex items-center gap-3">
        <motion.div
          animate={{
            rotate: isHovered ? [0, -5, 5, 0] : 0,
            y: isHovered ? -4 : 0,
          }}
          transition={{
            rotate: { duration: 0.5 },
            y: { type: "spring", stiffness: 200, damping: 15 },
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-foreground"
        >
          <DeviceIcon size={20} className="text-accent" />
        </motion.div>
        <div>
          <h2 className="text-sm font-medium text-foreground">
            {strategy === "mobile" ? "Mobile" : "Desktop"}
          </h2>
          <p className="text-xs text-muted-foreground">Lighthouse</p>
        </div>
      </div>

      <div className="relative z-20 grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
        {scoreItems.map((item, i) => (
          <ScoreBar
            key={item.label}
            score={item.score}
            label={item.label}
            delay={delay + 0.15 + i * 0.08}
            isHovered={isHovered}
            shouldReduceAnimations={shouldReduceAnimations}
          />
        ))}
      </div>
    </motion.div>
  );
}
