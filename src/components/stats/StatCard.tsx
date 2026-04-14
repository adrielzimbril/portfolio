"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  delay = 0,
  className,
}: StatCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value !== "number") {
      return;
    }

    if (shouldReduceAnimations) {
      setDisplayValue(value);
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

  const effectiveValue =
    typeof value === "number" && !shouldReduceAnimations ? displayValue : value;

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 flex h-full flex-col">
          {icon && (
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-foreground">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {typeof effectiveValue === "number"
                ? effectiveValue.toLocaleString()
                : effectiveValue}
            </p>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
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

      <div className="relative z-20 flex h-full flex-col">
        {icon && (
          <motion.div
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              y: isHovered ? -4 : 0,
            }}
            transition={{
              rotate: { duration: 0.5 },
              y: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-b-base text-foreground"
          >
            {icon}
          </motion.div>
        )}
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <motion.p
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-3xl font-semibold tracking-tight text-foreground"
          >
            {typeof effectiveValue === "number"
              ? effectiveValue.toLocaleString()
              : effectiveValue}
          </motion.p>
          {suffix && (
            <span className="text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
