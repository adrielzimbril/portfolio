"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";
import { pickRandomColor } from "@/utils/pick-random-color";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  decoration?: string;
  decorationPattern?: string;
  description?: string;
  delay?: number;
  className?: string;
  decorations?: Array<{ x: string; y: string; rotate: number; delay: number }>;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  decoration,
  decorationPattern,
  description,
  delay = 0,
  className,
  decorations = [
    { x: "10%", y: "20%", rotate: -15, delay: 0 },
    { x: "75%", y: "15%", rotate: 10, delay: 0.1 },
    { x: "85%", y: "60%", rotate: -8, delay: 0.2 },
    { x: "15%", y: "70%", rotate: 12, delay: 0.3 },
  ],
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden",
        className,
      )}
    >
      <CardContent className="grid grid-cols-1 p-4 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-center gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          {decoration && (
            <motion.div
              animate={{
                rotate: isHovered ? -20 : -32,
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="pointer-events-none absolute -bottom-6 -right-6 text-[6rem] leading-none opacity-20"
            >
              {decoration}
            </motion.div>
          )}
          {decorationPattern && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {decorations.map((deco, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: deco.rotate - 20 }}
                  animate={{
                    opacity: isHovered ? 0.2 : 0.1,
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? deco.rotate + 10 : deco.rotate,
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: delay + deco.delay },
                    scale: { type: "spring", stiffness: 200, damping: 15 },
                    rotate: { type: "spring", stiffness: 200, damping: 15 },
                    y: { type: "spring", stiffness: 200, damping: 15 },
                  }}
                  className="absolute text-2xl"
                  style={{ left: deco.x, top: deco.y }}
                >
                  {decorationPattern}
                </motion.span>
              ))}
            </div>
          )}
          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4",
              )}
            >
              {icon && (
                <Badge
                  className={cn(
                    "capitalize text-xs font-medium",
                    pickRandomColor(
                      decorationPattern
                        ? DEFAULT_COLOR_CODE_NAME.VIOLET
                        : DEFAULT_COLOR_CODE_NAME.ORANGE,
                    ),
                    decorationPattern && "size-max text-primary-foreground",
                  )}
                  variant="colored"
                  size="lg"
                  circle
                >
                  {icon}
                </Badge>
              )}
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{label}</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {value} {suffix}
                </p>
              </div>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
