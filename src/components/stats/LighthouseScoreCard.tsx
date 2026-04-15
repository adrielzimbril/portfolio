"use client";

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

// Radar background visualization
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

  // Convert scores to polygon points (4 quadrants)
  const getPolygonPoints = (scoreValues: number[]) => {
    const angles = [-90, 0, 90, 180]; // Top, Right, Bottom, Left
    return scoreValues
      .map((score, i) => {
        const angle = (angles[i] * Math.PI) / 180;
        const radius = (score / 100) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Mobile: Plain div with static SVG
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-16 -right-16">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Concentric circles */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={maxRadius * scale}
              fill="none"
              stroke="currentColor"
              strokeWidth={scale === 1 ? 1.5 : 1}
              className="text-gray-300"
              opacity={0.25}
            />
          ))}

          {/* Cross axes */}
          <g opacity={0.2}>
            <line
              x1={center}
              y1={center - maxRadius}
              x2={center}
              y2={center + maxRadius}
              stroke="currentColor"
              strokeWidth={1}
              className="text-gray-300"
            />
            <line
              x1={center - maxRadius}
              y1={center}
              x2={center + maxRadius}
              y2={center}
              stroke="currentColor"
              strokeWidth={1}
              className="text-gray-300"
            />
          </g>

          {/* Score polygon fill */}
          <polygon
            points={getPolygonPoints(scores)}
            fill="url(#radarGradient)"
            stroke="rgba(251, 146, 60, 0.5)"
            strokeWidth={2}
            opacity={0.25}
          />

          {/* Score points */}
          {scores.map((score, i) => {
            const angles = [-90, 0, 90, 180];
            const angle = (angles[i] * Math.PI) / 180;
            const radius = (score / 100) * maxRadius;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="rgb(251, 146, 60)"
                opacity={0.5}
              />
            );
          })}

          {/* Gradient definition */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="rgb(251, 191, 36)"
                stopOpacity="0.5"
              />
              <stop
                offset="100%"
                stopColor="rgb(251, 146, 60)"
                stopOpacity="0.15"
              />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Desktop: Static radar
  return (
    <div className="pointer-events-none absolute -bottom-16 -right-16">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Concentric circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={maxRadius * scale}
            fill="none"
            stroke="currentColor"
            strokeWidth={scale === 1 ? 1.5 : 1}
            className="text-gray-300"
            opacity={0.25}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}

        {/* Cross axes */}
        <g opacity={0.2}>
          <line
            x1={center}
            y1={center - maxRadius}
            x2={center}
            y2={center + maxRadius}
            stroke="currentColor"
            strokeWidth={1}
            className="text-gray-300"
          />
          <line
            x1={center - maxRadius}
            y1={center}
            x2={center + maxRadius}
            y2={center}
            stroke="currentColor"
            strokeWidth={1}
            className="text-gray-300"
          />
        </g>

        {/* Score polygon fill */}
        <polygon
          points={getPolygonPoints(scores)}
          fill="url(#radarGradient)"
          stroke="rgba(251, 146, 60, 0.5)"
          strokeWidth={2}
          opacity={0.25}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Score points */}
        {scores.map((score, i) => {
          const angles = [-90, 0, 90, 180];
          const angle = (angles[i] * Math.PI) / 180;
          const radius = (score / 100) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill="rgb(251, 146, 60)"
              opacity={0.5}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.5" />
            <stop
              offset="100%"
              stopColor="rgb(251, 146, 60)"
              stopOpacity="0.15"
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// Animated pulse rings
function PulseRings({
  isHovered,
  shouldReduceAnimations,
}: {
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}) {
  // Mobile: Plain div
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-20 -right-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-amber-400/30"
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

  // Desktop: Static rings
  return (
    <div className="pointer-events-none absolute -bottom-20 -right-20">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-amber-400/30"
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
        <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
          {displayScore}
        </span>
      </div>
      <div
        className={`h-2.5 w-full overflow-hidden rounded-full ${colors.barBg}`}
      >
        <div
          style={{ width: `${displayScore}%` }}
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

  const scoreValues = [
    scores.performance,
    scores.accessibility,
    scores.bestPractices,
    scores.seo,
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
        {/* Trigonometric background pattern */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 opacity-5"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="trigono-pattern-static"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="20,0 40,40 0,40"
                fill="currentColor"
                className="text-primary"
              />
              <polygon
                points="0,0 20,40 40,0"
                fill="currentColor"
                className="text-primary/50"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#trigono-pattern-static)"
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Pulse rings background */}
        <PulseRings
          isHovered={false}
          shouldReduceAnimations={shouldReduceAnimations}
        />

        {/* Radar visualization */}
        <RadarBackground
          scores={scoreValues}
          isHovered={false}
          delay={delay}
          shouldReduceAnimations={shouldReduceAnimations}
        />

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
    <div
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trigonometric background pattern */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 opacity-5"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="trigono-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="20,0 40,40 0,40"
              fill="currentColor"
              className="text-primary"
            />
            <polygon
              points="0,0 20,40 40,0"
              fill="currentColor"
              className="text-primary/50"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trigono-pattern)" />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Pulse rings background */}
      <PulseRings isHovered={false} shouldReduceAnimations={true} />

      {/* Radar visualization */}
      <RadarBackground
        scores={scoreValues}
        isHovered={false}
        delay={delay}
        shouldReduceAnimations={true}
      />

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
            isHovered={isHovered}
            shouldReduceAnimations={true}
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
