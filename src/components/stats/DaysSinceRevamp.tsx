"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar } from "@aurthle/icons";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                <Calendar size={32} className="text-primary" variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Site Age</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {displayDays} days
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Launched{" "}
              {revampDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
