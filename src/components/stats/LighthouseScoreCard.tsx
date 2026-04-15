"use client";

import { useState } from "react";
import { Display, Mobile } from "@aurthle/icons";
import type { LighthouseScores } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { RadarBackground } from "./LighthouseScoreCard/RadarBackground";
import { PulseRings } from "./LighthouseScoreCard/PulseRings";
import { ScoreBar } from "./LighthouseScoreCard/ScoreBar";
import {
  getScoreColor,
  getOverallScore,
} from "./LighthouseScoreCard/lighthouse-utils";

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  delay?: number;
  lastUpdated?: string;
  className?: string;
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
