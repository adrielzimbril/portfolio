"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface MostViewedArticleCardProps {
  title: string;
  views: number;
  delay?: number;
  className?: string;
}

export function MostViewedArticleCard({
  title,
  views,
  delay = 0,
  className,
}: MostViewedArticleCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayViews, setDisplayViews] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayViews(views);
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
      setDisplayViews(Math.floor(eased * views));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [views, delay, shouldReduceAnimations]);

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden border border-border bg-b-base p-6 transition-all duration-300 hover:border-primary hover:bg-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl bg-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 flex h-full flex-col">
          <h2 className="mb-2 font-medium text-foreground">
            Most Viewed Article
          </h2>

          <div className="mt-auto">
            <p className="mb-2 text-lg font-semibold text-foreground">
              {title}
            </p>
            <p className="text-sm text-muted-foreground">
              {displayViews.toLocaleString()} views
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
      <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl bg-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 flex h-full flex-col">
        <h2 className="mb-2 font-medium text-foreground">
          Most Viewed Article
        </h2>

        <div className="mt-auto">
          <motion.p
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-2 text-lg font-semibold text-foreground"
          >
            {title}
          </motion.p>
          <p className="text-sm text-muted-foreground">
            {displayViews.toLocaleString()} views
          </p>
        </div>
      </div>
    </motion.div>
  );
}
