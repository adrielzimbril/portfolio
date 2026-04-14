"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Display,
  Mobile,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "@aurthle/icons";
import type { LighthouseScores } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  delay?: number;
  lastUpdated?: string;
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
      glow: "shadow-primary/20",
      icon: ShieldCheck,
      iconColor: "text-primary",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-accent",
      barBg: "bg-accent/10",
      text: "text-accent",
      glow: "shadow-accent/20",
      icon: AlertTriangle,
      iconColor: "text-accent",
    };
  }
  return {
    bar: "bg-destructive",
    barBg: "bg-destructive/10",
    text: "text-destructive",
    glow: "shadow-destructive/20",
    icon: XCircle,
    iconColor: "text-destructive",
  };
}

function getOverallScore(scores: LighthouseScores) {
  const avg =
    (scores.performance +
      scores.accessibility +
      scores.bestPractices +
      scores.seo) /
    4;
  return Math.round(avg);
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
  const ScoreIcon = colors.icon;

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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScoreIcon size={14} className={colors.iconColor} />
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
          <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
            {displayScore}
          </span>
        </div>
        <div
          className={`h-2.5 w-full overflow-hidden rounded-full ${colors.barBg}`}
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScoreIcon size={14} className={colors.iconColor} />
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <motion.span
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`text-sm font-bold tabular-nums ${colors.text}`}
        >
          {displayScore}
        </motion.span>
      </div>
      <div
        className={`h-2.5 w-full overflow-hidden rounded-full ${colors.barBg}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${displayScore}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className={`h-full rounded-full ${colors.bar} ${isHovered ? `shadow-lg ${colors.glow}` : ""}`}
        />
      </div>
    </div>
  );
}

export function LighthouseScoreCard({
  scores,
  strategy,
  delay = 0,
  lastUpdated,
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

  const overallScore = getOverallScore(scores);
  const overallColors = getScoreColor(overallScore);

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

        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

        <div className="relative z-20 mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-b-base text-foreground shadow-lg">
              <DeviceIcon size={24} className="text-accent" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {strategy === "mobile" ? "Mobile" : "Desktop"}
              </h2>
              <p className="text-xs text-muted-foreground">Lighthouse Score</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`text-3xl font-bold tabular-nums ${overallColors.text}`}
            >
              {overallScore}
            </span>
            <span className="text-xs text-muted-foreground">Overall</span>
          </div>
        </div>

        <div className="relative z-20 grid flex-1 grid-cols-2 gap-x-4 gap-y-4">
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

        {lastUpdated && (
          <div className="relative z-20 mt-4 pt-4 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground text-center">
              Updated {lastUpdated}
            </p>
          </div>
        )}
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
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-20 mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
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
            <DeviceIcon size={24} className="text-accent" />
          </motion.div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {strategy === "mobile" ? "Mobile" : "Desktop"}
            </h2>
            <p className="text-xs text-muted-foreground">Lighthouse Score</p>
          </div>
        </div>
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-end"
        >
          <span
            className={`text-3xl font-bold tabular-nums ${overallColors.text}`}
          >
            {overallScore}
          </span>
          <span className="text-xs text-muted-foreground">Overall</span>
        </motion.div>
      </div>

      <div className="relative z-20 grid flex-1 grid-cols-2 gap-x-4 gap-y-4">
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

      {lastUpdated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.3 }}
          className="relative z-20 mt-4 pt-4 border-t border-border/50"
        >
          <p className="text-[10px] text-muted-foreground text-center">
            Updated {lastUpdated}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
