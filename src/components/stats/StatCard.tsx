"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  animate?: boolean;
  delay?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  animate = true,
  delay = 0,
  className = "",
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const numericValue = typeof value === "number" ? value : null;
  const [displayValue, setDisplayValue] = useState(animate ? 0 : numericValue);

  useEffect(() => {
    if (!animate || numericValue === null) {
      setDisplayValue(numericValue);
      return;
    }

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
      setDisplayValue(Math.floor(eased * numericValue));

      if (progress < 1) {
        rafId = requestAnimationFrame(animateCount);
      }
    };

    rafId = requestAnimationFrame(animateCount);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [numericValue, animate, delay]);

  const cardClassName = `group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 flex h-full flex-col">
        {icon && (
          <motion.div
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            {icon}
          </motion.div>
        )}

        <h2 className="mb-2 font-medium text-foreground">{label}</h2>

        <motion.p
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-auto text-3xl font-semibold tracking-tight text-primary"
        >
          {numericValue !== null ? (
            <>
              {displayValue?.toLocaleString()}
              {suffix && (
                <span className="ml-1 text-lg font-normal text-muted-foreground">
                  {suffix}
                </span>
              )}
            </>
          ) : (
            value
          )}
        </motion.p>
      </div>
    </motion.div>
  );
}
