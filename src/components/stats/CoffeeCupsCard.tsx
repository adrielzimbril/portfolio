"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Coffee } from "@aurthle/icons";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CoffeeCupsCardProps {
  cups: number;
  delay?: number;
  className?: string;
}

export function CoffeeCupsCard({
  cups,
  delay = 0,
  className,
}: CoffeeCupsCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCups, setDisplayCups] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayCups(cups);
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
      setDisplayCups(Math.floor(eased * cups));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [cups, delay, shouldReduceAnimations]);

  const effectiveDisplayCups = shouldReduceAnimations ? cups : displayCups;

  const coffeeCups = [
    { x: "10%", y: "20%", rotate: -15, delay: 0 },
    { x: "75%", y: "15%", rotate: 10, delay: 0.1 },
    { x: "85%", y: "60%", rotate: -8, delay: 0.2 },
    { x: "15%", y: "70%", rotate: 12, delay: 0.3 },
  ];

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
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {coffeeCups.map((cup, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: cup.rotate - 20 }}
                animate={{
                  opacity: isHovered ? 0.3 : 0.15,
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? cup.rotate + 10 : cup.rotate,
                  y: isHovered ? -8 : 0,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: delay + cup.delay },
                  scale: { type: "spring", stiffness: 200, damping: 15 },
                  rotate: { type: "spring", stiffness: 200, damping: 15 },
                  y: { type: "spring", stiffness: 200, damping: 15 },
                }}
                className="absolute text-2xl"
                style={{ left: cup.x, top: cup.y }}
              >
                ☕
              </motion.span>
            ))}
          </div>
          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                <Coffee size={32} className="text-amber-600" variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Coffee Consumed</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  ~{effectiveDisplayCups.toLocaleString()} cups
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">1 cup per 500 words</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
