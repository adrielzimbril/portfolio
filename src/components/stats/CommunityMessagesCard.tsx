"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChatBubble } from "@aurthle/icons";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CommunityMessagesCardProps {
  count: number;
  delay?: number;
  className?: string;
}

const messageDecorations = [
  { emoji: "💬", x: "10%", y: "20%", rotate: -15, delay: 0 },
  { emoji: "📝", x: "75%", y: "15%", rotate: 10, delay: 0.1 },
  { emoji: "✉️", x: "85%", y: "60%", rotate: -8, delay: 0.2 },
  { emoji: "📨", x: "15%", y: "70%", rotate: 12, delay: 0.3 },
];

export function CommunityMessagesCard({
  count,
  delay = 0,
  className,
}: CommunityMessagesCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(
    shouldReduceAnimations ? count : 0,
  );

  useEffect(() => {
    if (shouldReduceAnimations) {
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

  return (
    <Link href="/community-wall" className="block h-full">
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden",
          className,
        )}
      >
        <CardContent className="grid grid-cols-1 size-full p-2 gap-2">
          <div
            className={cn(
              "squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden",
            )}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {messageDecorations.map((deco, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: deco.rotate - 20 }}
                  animate={{
                    opacity: isHovered ? 0.3 : 0.15,
                    scale: isHovered ? 1.3 : 1,
                    rotate: isHovered ? deco.rotate + 15 : deco.rotate,
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
                  {deco.emoji}
                </motion.div>
              ))}
            </div>
            <div
              className={cn(
                "relative size-full flex flex-row z-20 items-center gap-2 md:gap-4 px-2 py-2 m-auto",
              )}
            >
              <Badge className="capitalize" size="lg" circle>
                <ChatBubble size={32} className="text-primary" variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Community Messages</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {displayCount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
