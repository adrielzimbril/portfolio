"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface ChangelogUpdatesCardProps {
  count: number;
  delay?: number;
  className?: string;
}

export function ChangelogUpdatesCard({
  count,
  delay = 0,
  className,
}: ChangelogUpdatesCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayCount(count);
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
      setDisplayCount(Math.floor(eased * count));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [count, delay, shouldReduceAnimations]);

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden border border-border bg-b-base p-6 transition-all duration-300 hover:border-primary hover:bg-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <Link href="/changelog" className="block h-full">
        <div className={cardClassName}>
          <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl bg-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-20 flex h-full flex-col">
            <h2 className="mb-2 font-medium text-foreground">
              Changelog Updates
            </h2>
            <p className="text-sm text-muted-foreground">Version history</p>

            <div className="mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-foreground">
                  {displayCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/changelog" className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl bg-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 flex h-full flex-col">
          <h2 className="mb-2 font-medium text-foreground">
            Changelog Updates
          </h2>
          <p className="text-sm text-muted-foreground">Version history</p>

          <div className="mt-auto">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                {displayCount.toLocaleString()}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
