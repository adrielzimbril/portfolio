"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface SiteViewsCardProps {
  value: number;
  delay?: number;
  className?: string;
}

// Elegant rising wave visualization - adapté aux couleurs du projet
function RisingWave({
  isHovered,
  delay,
  shouldReduceAnimations,
}: {
  isHovered: boolean;
  delay: number;
  shouldReduceAnimations: boolean;
}) {
  const curvePath =
    "M -10 105 " +
    "C 20 100, 35 95, 50 88 " +
    "C 65 81, 75 85, 90 82 " +
    "C 105 79, 115 70, 130 65 " +
    "C 145 60, 155 62, 170 58 " +
    "C 185 54, 195 45, 210 42 " +
    "C 225 39, 235 44, 250 38 " +
    "C 265 32, 280 22, 295 15 " +
    "L 310 10";

  const areaPath = `${curvePath} L 310 150 L -10 150 Z`;

  // Mobile: Static SVG
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden squircle-2xl">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 320 130"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.03" />
              <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop
                offset="100%"
                stopColor="var(--secondary)"
                stopOpacity="0.15"
              />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop
                offset="100%"
                stopColor="var(--secondary)"
                stopOpacity="0.7"
              />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#waveGradient)" />
          <path
            d={curvePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx="310" cy="10" r="4" fill="var(--secondary)" />
        </svg>
      </div>
    );
  }

  // Desktop: Full Framer Motion animations
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden squircle-2xl">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 130"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.03" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop
              offset="100%"
              stopColor="var(--secondary)"
              stopOpacity="0.15"
            />
          </linearGradient>
          <linearGradient
            id="waveGradientHover"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop
              offset="100%"
              stopColor="var(--secondary)"
              stopOpacity="0.28"
            />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop
              offset="100%"
              stopColor="var(--secondary)"
              stopOpacity="0.7"
            />
          </linearGradient>
          <linearGradient id="lineGradHover" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={areaPath}
          fill={isHovered ? "url(#waveGradientHover)" : "url(#waveGradient)"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: isHovered ? -3 : 0 }}
          transition={{
            opacity: { duration: 0.8, delay },
            y: { duration: 0.3, ease: "easeOut" },
          }}
        />

        <motion.path
          d={curvePath}
          fill="none"
          stroke={isHovered ? "url(#lineGradHover)" : "url(#lineGrad)"}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, y: isHovered ? -3 : 0 }}
          transition={{
            pathLength: { duration: 1.2, delay: delay + 0.2, ease: "easeOut" },
            opacity: { duration: 0.5, delay },
            y: { duration: 0.3, ease: "easeOut" },
          }}
        />

        <motion.path
          d={curvePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.4 : 0, y: isHovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.circle
          cx="310"
          cy="10"
          r="4"
          fill="var(--secondary)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: 1,
            y: isHovered ? -3 : 0,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.5, delay: delay + 1 },
            y: { duration: 0.3 },
          }}
        />

        <motion.circle
          cx="310"
          cy="10"
          r="4"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: isHovered ? [0.6, 0] : 0,
            scale: isHovered ? [1, 2.5] : 1,
            y: isHovered ? -3 : 0,
          }}
          transition={{
            opacity: { duration: 1, repeat: Infinity },
            scale: { duration: 1, repeat: Infinity },
            y: { duration: 0.3 },
          }}
        />
      </svg>
    </div>
  );
}

// Small upward arrow icon
function TrendArrow({
  isHovered,
  shouldReduceAnimations,
}: {
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}) {
  const svg = (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17l5-5 5 5" />
      <path d="M7 11l5-5 5 5" />
    </svg>
  );

  if (shouldReduceAnimations) {
    return (
      <div className="flex items-center gap-1 text-emerald-500">{svg}</div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-1 text-emerald-500"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0, y: isHovered ? -2 : 0 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.8 },
        y: { duration: 0.2 },
      }}
    >
      {svg}
    </motion.div>
  );
}

export function SiteViewsCard({
  value,
  delay = 0,
  className,
}: SiteViewsCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    let rafId: number;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;

      if (elapsed < 0) {
        rafId = requestAnimationFrame(animateCount);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animateCount);
      }
    };

    rafId = requestAnimationFrame(animateCount);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, delay, shouldReduceAnimations]);

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

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
      <RisingWave
        isHovered={isHovered}
        delay={delay}
        shouldReduceAnimations={shouldReduceAnimations}
      />

      <div className="relative z-20 flex h-full flex-col">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-medium text-foreground">Total Site Views</h3>
          <TrendArrow
            isHovered={isHovered}
            shouldReduceAnimations={shouldReduceAnimations}
          />
        </div>

        <motion.p
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-auto text-3xl font-semibold tracking-tight text-foreground"
        >
          {displayValue.toLocaleString()}
        </motion.p>
      </div>
    </motion.div>
  );
}
