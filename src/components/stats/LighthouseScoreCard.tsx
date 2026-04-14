"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
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
      bar: "squircle-primary",
      barBg: "squircle-primary/10",
      text: "text-primary",
      glow: "shadow-primary/20",
    };
  }
  if (score >= 50) {
    return {
      bar: "squircle-accent",
      barBg: "squircle-accent/10",
      text: "text-accent",
      glow: "shadow-accent/20",
    };
  }
  return {
    bar: "squircle-destructive",
    barBg: "squircle-destructive/10",
    text: "text-destructive",
    glow: "shadow-destructive/20",
  };
}

function ScoreBar({
  score,
  label,
  delay = 0,
  isHovered,
  shouldReduceAnimations,
}: ScoreBarProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const colors = getScoreColor(score);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayScore(score);
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
          className={`h-full rounded-full ${colors.bar} ${isHovered ? "shadow-lg " + colors.glow : ""}`}
        />
      </div>
    </div>
  );
}

function RadarBackground({
  scores,
  isHovered,
  delay,
  shouldReduceAnimations,
}: {
  scores: number[];
  isHovered: boolean;
  delay: number;
  shouldReduceAnimations: boolean;
}) {
  const size = 220;
  const center = size / 2;
  const maxRadius = 90;

  const getPolygonPoints = (scoreValues: number[]) => {
    const angles = [-90, 0, 90, 180];
    return scoreValues
      .map((score, i) => {
        const angle = angles[i] !== undefined ? (angles[i] * Math.PI) / 180 : 0;
        const radius = (score / 100) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-16 -right-16">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={maxRadius * scale}
              fill="none"
              stroke="currentColor"
              strokeWidth={scale === 1 ? 1.5 : 1}
              className="text-border"
              opacity={0.25}
            />
          ))}
          <g opacity={0.2}>
            <line
              x1={center}
              y1={center - maxRadius}
              x2={center}
              y2={center + maxRadius}
              stroke="currentColor"
              strokeWidth={1}
              className="text-border"
            />
            <line
              x1={center - maxRadius}
              y1={center}
              x2={center + maxRadius}
              y2={center}
              stroke="currentColor"
              strokeWidth={1}
              className="text-border"
            />
          </g>
          <polygon
            points={getPolygonPoints(scores)}
            fill="url(#radarGradient)"
            stroke="var(--accent)"
            strokeWidth={2}
            opacity={0.25}
          />
          {scores.map((score, i) => {
            const angles = [-90, 0, 90, 180];
            const angle =
              angles[i] !== undefined ? (angles[i] * Math.PI) / 180 : 0;
            const radius = (score / 100) * maxRadius;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="var(--accent)"
                opacity={0.5}
              />
            );
          })}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity={0.15}
              />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="pointer-events-none absolute -bottom-16 -right-16"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={maxRadius * scale}
            fill="none"
            stroke="currentColor"
            strokeWidth={scale === 1 ? 1.5 : 1}
            className="text-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.5 : 0.25 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={center}
            y1={center - maxRadius}
            x2={center}
            y2={center + maxRadius}
            stroke="currentColor"
            strokeWidth={1}
            className="text-border"
          />
          <line
            x1={center - maxRadius}
            y1={center}
            x2={center + maxRadius}
            y2={center}
            stroke="currentColor"
            strokeWidth={1}
            className="text-border"
          />
        </motion.g>
        <motion.polygon
          points={getPolygonPoints(scores)}
          fill="url(#radarGradient)"
          stroke="var(--accent)"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovered ? 0.5 : 0.25,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { type: "spring", stiffness: 200, damping: 15 },
          }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />
        {scores.map((score, i) => {
          const angles = [-90, 0, 90, 180];
          const angle =
            angles[i] !== undefined ? (angles[i] * Math.PI) / 180 : 0;
          const radius = (score / 100) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill="var(--accent)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isHovered ? 0.9 : 0.5,
                scale: isHovered ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.15} />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function PulseRings({
  isHovered,
  shouldReduceAnimations,
}: {
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}) {
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-20 -right-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full squircle-border-accent/30"
            style={{
              width: 140 + i * 50,
              height: 140 + i * 50,
              right: -(i * 25),
              bottom: -(i * 25),
              opacity: 0.08,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute -bottom-20 -right-20">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full squircle-border-color-accent/30"
          style={{
            width: 140 + i * 50,
            height: 140 + i * 50,
            right: -(i * 25),
            bottom: -(i * 25),
          }}
          animate={{
            opacity: isHovered ? [0.25, 0.1, 0.25] : 0.08,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{
            opacity: { duration: isHovered ? 2 : 0.2 },
            scale: {
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
        />
      ))}
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

  const scoreValues = [
    scores.performance,
    scores.accessibility,
    scores.bestPractices,
    scores.seo,
  ];

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-5 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <PulseRings
          isHovered={false}
          shouldReduceAnimations={shouldReduceAnimations}
        />
        <RadarBackground
          scores={scoreValues}
          isHovered={false}
          delay={delay}
          shouldReduceAnimations={shouldReduceAnimations}
        />
        <div className="relative z-20 mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-secondary/20">
            {strategy === "mobile" ? (
              <svg
                className="h-4 w-4 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {strategy === "mobile" ? "Mobile" : "Desktop"}
            </h2>
            <p className="text-[10px] text-muted-foreground">Lighthouse</p>
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
      <PulseRings
        isHovered={isHovered}
        shouldReduceAnimations={shouldReduceAnimations}
      />
      <RadarBackground
        scores={scoreValues}
        isHovered={isHovered}
        delay={delay}
        shouldReduceAnimations={shouldReduceAnimations}
      />
      <div className="relative z-20 mb-4 flex items-center gap-2.5">
        <motion.div
          animate={{
            y: isHovered ? -2 : 0,
            rotate: isHovered ? [0, -3, 3, 0] : 0,
          }}
          transition={{
            y: { type: "spring", stiffness: 200, damping: 15 },
            rotate: { duration: 0.5 },
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-secondary/20"
        >
          {strategy === "mobile" ? (
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
        </motion.div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {strategy === "mobile" ? "Mobile" : "Desktop"}
          </h2>
          <p className="text-[10px] text-muted-foreground">Lighthouse</p>
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
