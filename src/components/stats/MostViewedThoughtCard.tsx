"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { getResourcesUrl } from "@/utils";
import { PageType } from "@/types";

interface MostViewedThoughtCardProps {
  title: string;
  slug: string;
  coverImage: string;
  views: number;
  delay?: number;
}

export function MostViewedThoughtCard({
  title,
  slug,
  coverImage,
  views,
  delay = 0,
}: MostViewedThoughtCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayCount(views);
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
      setDisplayCount(Math.floor(eased * views));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [views, delay, shouldReduceAnimations]);

  const effectiveDisplayCount = shouldReduceAnimations ? views : displayCount;

  const cardClassName =
    "group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-primary transition-all duration-300 hover:border-indigo-400 hover:bg-white";

  if (shouldReduceAnimations) {
    return (
      <Link
        href={getResourcesUrl(PageType.THOUGHT, slug)}
        className="block h-full"
      >
        <div className={cardClassName}>
          <div className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-tl from-indigo-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative h-[280px] flex-shrink-0">
            <div
              style={{
                transform: "translate(-5px, 5px) rotate(-3deg)",
              }}
              className="absolute inset-4 rounded-lg bg-border-primary/40"
            />

            <div
              style={{
                transform: "rotate(1.5deg)",
              }}
              className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border border-border-primary bg-white shadow-sm"
            >
              <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-border-primary/50 bg-slate-50 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-300" />
                <div className="h-2 w-2 rounded-full bg-yellow-300" />
                <div className="h-2 w-2 rounded-full bg-green-300" />
                <div className="ml-2 h-2 flex-1 rounded bg-border-primary/30" />
              </div>

              <div className="relative h-[100px] w-full flex-shrink-0 overflow-hidden">
                <Image
                  src={`/thoughts/${coverImage}`}
                  alt={title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <p className="line-clamp-2 text-[8px] font-bold leading-tight text-white">
                    {title}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2 overflow-hidden bg-[#F7F7F8] p-2.5">
                <div className="space-y-1">
                  <div className="h-[5px] w-full rounded-sm bg-text-secondary/25" />
                  <div className="h-[5px] w-full rounded-sm bg-text-secondary/25" />
                  <div className="h-[5px] w-[92%] rounded-sm bg-text-secondary/25" />
                  <div className="h-[5px] w-[85%] rounded-sm bg-text-secondary/25" />
                </div>
                <div className="space-y-1">
                  <div className="h-[5px] w-full rounded-sm bg-text-secondary/20" />
                  <div className="h-[5px] w-full rounded-sm bg-text-secondary/20" />
                  <div className="h-[5px] w-[78%] rounded-sm bg-text-secondary/20" />
                </div>
                <div className="rounded bg-slate-200/60 p-1.5">
                  <div className="space-y-1">
                    <div className="h-[4px] w-[60%] rounded-sm bg-slate-400/30" />
                    <div className="h-[4px] w-[75%] rounded-sm bg-slate-400/30" />
                    <div className="h-[4px] w-[45%] rounded-sm bg-slate-400/30" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-[5px] w-full rounded-sm bg-text-secondary/15" />
                  <div className="h-[5px] w-[88%] rounded-sm bg-text-secondary/15" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent transition-colors group-hover:from-white group-hover:via-white/80" />
          </div>

          <div className="relative z-20 px-6 pb-6">
            <h2 className="mb-1 font-medium text-text-primary">
              Most Viewed Thought
            </h2>
            <h3 className="mb-3 line-clamp-2 text-sm leading-snug text-text-secondary transition-colors group-hover:text-text-primary">
              {title}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums tracking-tight text-purple-primary">
                {effectiveDisplayCount.toLocaleString()}
              </span>
              <span className="text-sm text-text-tertiary">views</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 opacity-0 transition-opacity group-hover:opacity-100">
            <svg
              className="h-4 w-4 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={getResourcesUrl(PageType.THOUGHT, slug)}
      className="block h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-tl from-indigo-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative h-[280px] flex-shrink-0">
          <motion.div
            animate={{
              rotate: isHovered ? -1 : -3,
              x: isHovered ? -3 : -5,
              y: isHovered ? 3 : 5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-4 rounded-lg bg-border-primary/40"
          />

          <motion.div
            animate={{
              rotate: isHovered ? 0.5 : 1.5,
              y: isHovered ? -4 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border border-border-primary bg-white shadow-sm"
          >
            <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-border-primary/50 bg-slate-50 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-red-300" />
              <div className="h-2 w-2 rounded-full bg-yellow-300" />
              <div className="h-2 w-2 rounded-full bg-green-300" />
              <div className="ml-2 h-2 flex-1 rounded bg-border-primary/30" />
            </div>

            <div className="relative h-[100px] w-full flex-shrink-0 overflow-hidden">
              <Image
                src={`/thoughts/${coverImage}`}
                alt={title}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2">
                <p className="line-clamp-2 text-[8px] font-bold leading-tight text-white">
                  {title}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-hidden bg-[#F7F7F8] p-2.5">
              <div className="space-y-1">
                <div className="h-[5px] w-full rounded-sm bg-text-secondary/25" />
                <div className="h-[5px] w-full rounded-sm bg-text-secondary/25" />
                <div className="h-[5px] w-[92%] rounded-sm bg-text-secondary/25" />
                <div className="h-[5px] w-[85%] rounded-sm bg-text-secondary/25" />
              </div>
              <div className="space-y-1">
                <div className="h-[5px] w-full rounded-sm bg-text-secondary/20" />
                <div className="h-[5px] w-full rounded-sm bg-text-secondary/20" />
                <div className="h-[5px] w-[78%] rounded-sm bg-text-secondary/20" />
              </div>
              <div className="rounded bg-slate-200/60 p-1.5">
                <div className="space-y-1">
                  <div className="h-[4px] w-[60%] rounded-sm bg-slate-400/30" />
                  <div className="h-[4px] w-[75%] rounded-sm bg-slate-400/30" />
                  <div className="h-[4px] w-[45%] rounded-sm bg-slate-400/30" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-[5px] w-full rounded-sm bg-text-secondary/15" />
                <div className="h-[5px] w-[88%] rounded-sm bg-text-secondary/15" />
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent transition-colors group-hover:from-white group-hover:via-white/80" />
        </div>

        <div className="relative z-20 px-6 pb-6">
          <h2 className="mb-1 font-medium text-text-primary">
            Most Viewed Thought
          </h2>
          <h3 className="mb-3 line-clamp-2 text-sm leading-snug text-text-secondary transition-colors group-hover:text-text-primary">
            {title}
          </h3>

          <div className="flex items-baseline gap-2">
            <motion.span
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-3xl font-bold tabular-nums tracking-tight text-purple-primary"
            >
              {effectiveDisplayCount.toLocaleString()}
            </motion.span>
            <span className="text-sm text-text-tertiary">views</span>
          </div>
        </div>

        <motion.div
          animate={{
            x: isHovered ? 0 : 8,
            y: isHovered ? 0 : 8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 right-4 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100"
        >
          <svg
            className="h-4 w-4 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
