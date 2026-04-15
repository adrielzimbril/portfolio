"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface DaysSinceRevampProps {
  revampDate: Date;
  delay?: number;
  className?: string;
}

export function DaysSinceRevamp({
  revampDate,
  delay = 0,
  className,
}: DaysSinceRevampProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [days, setDays] = useState(0);
  const [displayDays, setDisplayDays] = useState(0);

  useEffect(() => {
    const now = new Date();
    const diffTime = now.getTime() - revampDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, [revampDate]);

  useEffect(() => {
    if (days === 0) return;

    if (shouldReduceAnimations) {
      setDisplayDays(days);
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
      setDisplayDays(Math.floor(eased * days));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [days, delay, shouldReduceAnimations]);

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
          className="absolute -bottom-2 -right-2 text-[100px] leading-none opacity-10"
          style={{ transform: "rotate(-5deg)" }}
        >
          📅
        </div>

        <div className="relative z-20 flex h-full flex-col">
          <h2 className="mb-2 font-medium text-foreground">Site Age</h2>
          <p className="text-sm text-muted-foreground">Since last revamp</p>

          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {displayDays}
              </span>
              <span className="text-lg text-muted-foreground">days</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Launched{" "}
              {revampDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
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
        animate={{
          rotate: isHovered ? 5 : -5,
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -10 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute -bottom-2 -right-2 text-[100px] leading-none opacity-10"
      >
        📅
      </motion.div>

      <div className="relative z-20 flex h-full flex-col">
        <h2 className="mb-2 font-medium text-foreground">Site Age</h2>
        <p className="text-sm text-muted-foreground">Since last revamp</p>

        <div className="mt-auto">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-baseline gap-2"
          >
            <span className="text-5xl font-bold tracking-tight text-foreground">
              {displayDays}
            </span>
            <span className="text-lg text-muted-foreground">days</span>
          </motion.div>
          <p className="mt-2 text-xs text-muted-foreground">
            Launched{" "}
            {revampDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
