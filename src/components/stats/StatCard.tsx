"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  decoration?: string;
  delay?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  decoration,
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

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden",
        className,
      )}
    >
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-center gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          {decoration && (
            <motion.div
              animate={{
                rotate: isHovered ? 10 : -10,
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -bottom-6 -right-6 text-[100px] leading-none opacity-30"
            >
              {decoration}
            </motion.div>
          )}
          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4",
              )}
            >
              {icon && (
                <Badge className="capitalize" size="lg" circle>
                  {icon}
                </Badge>
              )}
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{label}</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {typeof effectiveValue === "number"
                    ? effectiveValue.toLocaleString()
                    : effectiveValue}{" "}
                  {suffix}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
