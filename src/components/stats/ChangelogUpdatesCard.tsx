"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { changelog } from "@/data/personal/changelog";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Bug, Wrench } from "@aurthle/icons";

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

  const typeIcons = {
    milestone: Sparkles,
    feature: Star,
    fix: Bug,
    improvement: Wrench,
  };

  const typeColors = {
    milestone: "text-primary",
    feature: "text-green-500",
    fix: "text-red-500",
    improvement: "text-blue-500",
  };

  // Get recent changelog items - show more for scrolling effect
  const recentItems = changelog
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const latestVersion = recentItems[0];

  useEffect(() => {
    if (shouldReduceAnimations) return;

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

  const getTopPosition = (index: number) => {
    const basePosition = -5;
    const spacing = 42;
    return `${basePosition + index * spacing}px`;
  };

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <Link href="/changelog" className="block h-full">
        <div className={cardClassName}>
          <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Central vertical timeline */}
          <div className="border-px absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 transform border-x border-border/10 bg-border/35" />

          {/* Timeline entries */}
          <div className="relative flex-1">
            <div className="absolute left-0 right-0 top-0">
              {recentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="absolute"
                  style={{
                    top: getTopPosition(index),
                    ...(index % 2 === 1
                      ? { left: "calc(50% + 6px)" }
                      : { right: "calc(50% + 6px)" }),
                  }}
                >
                  {/* Connecting line to timeline */}
                  <span
                    className={`absolute top-[14px] h-px w-[6px] bg-border ${
                      index % 2 === 1 ? "left-[-6px]" : "right-[-6px]"
                    }`}
                  />
                  {/* Entry card */}
                  <div className="z-10 inline-block w-[100px] space-y-px rounded-lg border border-border bg-b-base px-2 py-1.5 text-xs">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const Icon =
                          typeIcons[item.type as keyof typeof typeIcons];
                        return Icon ? (
                          <Icon
                            size={12}
                            className={cn(
                              typeColors[item.type as keyof typeof typeColors],
                            )}
                          />
                        ) : null;
                      })()}
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-foreground">
                        {item.version}
                      </p>
                    </div>
                    <time
                      dateTime={item.date}
                      className="text-[9px] text-muted-foreground"
                    >
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for scroll effect */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-linear-to-b from-b-base to-transparent transition-colors group-hover:from-b-sh-white" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-b-base via-b-base/75 to-transparent transition-colors group-hover:from-b-sh-white group-hover:via-b-sh-white/75" />

          {/* Content at bottom */}
          <div className="relative z-20 mt-auto">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-medium text-foreground">Changelog</h2>
              {latestVersion && (
                <Badge className="text-[9px] h-5 px-1.5 bg-primary/10 text-primary border-primary/20">
                  {latestVersion.version}
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {count}
              </span>
              <span className="text-sm text-muted-foreground">updates</span>
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
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Central vertical timeline */}
        <div className="border-px absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 transform border-x border-border/10 bg-border/35" />

        {/* Timeline entries */}
        <div className="relative flex-1">
          <motion.div
            animate={{
              y: isHovered ? -120 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
            }}
            className="absolute left-0 right-0 top-0"
          >
            {recentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + index * 0.05 }}
                className="absolute"
                style={{
                  top: getTopPosition(index),
                  ...(index % 2 === 1
                    ? { left: "calc(50% + 6px)" }
                    : { right: "calc(50% + 6px)" }),
                }}
              >
                {/* Connecting line to timeline */}
                <span
                  className={`absolute top-[14px] h-px w-[6px] bg-border ${
                    index % 2 === 1 ? "left-[-6px]" : "right-[-6px]"
                  }`}
                />
                {/* Entry card */}
                <div className="z-10 inline-block w-[100px] space-y-px rounded-lg border border-border bg-b-base px-2 py-1.5 text-xs">
                  <div className="flex items-center gap-1">
                    {(() => {
                      const Icon =
                        typeIcons[item.type as keyof typeof typeIcons];
                      return Icon ? (
                        <Icon
                          className={cn(
                            "h-3 w-3",
                            typeColors[item.type as keyof typeof typeColors],
                          )}
                        />
                      ) : null;
                    })()}
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-foreground">
                      {item.version}
                    </p>
                  </div>
                  <time
                    dateTime={item.date}
                    className="text-[9px] text-muted-foreground"
                  >
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for scroll effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-linear-to-b from-b-base to-transparent transition-colors group-hover:from-b-sh-white" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-b-base via-b-base/75 to-transparent transition-colors group-hover:from-b-sh-white group-hover:via-b-sh-white/75" />

        {/* Content at bottom */}
        <div className="relative z-20 mt-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-medium text-foreground">Changelog</h2>
            {latestVersion && (
              <Badge className="text-[9px] h-5 px-1.5 bg-primary/10 text-primary border-primary/20">
                {latestVersion.version}
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <motion.span
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-2xl font-bold tabular-nums tracking-tight text-foreground"
            >
              {displayCount}
            </motion.span>
            <span className="text-sm text-muted-foreground">updates</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
