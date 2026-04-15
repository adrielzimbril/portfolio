"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface CommunityMessagesCardProps {
  count: number;
  delay?: number;
  className?: string;
}

const miniCards = [
  { rotate: -12, x: -25, y: 8, gradient: "url(#grad1)" },
  { rotate: 0, x: 0, y: 0, gradient: "url(#grad2)" },
  { rotate: 12, x: 25, y: 8, gradient: "url(#grad3)" },
];

export function CommunityMessagesCard({
  count,
  delay = 0,
  className,
}: CommunityMessagesCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayCount(count);
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

  const cardClassName = cn(
    "group relative flex h-full min-h-[340px] flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <Link href="/community-wall" className="block h-full">
        <div className={cardClassName}>
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_2px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="pointer-events-none absolute inset-0 z-30 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center pb-16">
            <div className="relative h-32 w-40">
              {miniCards.map((card, index) => (
                <svg
                  key={index}
                  className="absolute left-1/2 top-1/2 w-36"
                  style={{
                    zIndex: index === 1 ? 3 : index === 2 ? 2 : 1,
                    transform: `translate(calc(-50% + ${card.x * 0.6}px), calc(-50% + ${card.y * 0.5}px)) rotate(${card.rotate * 0.8}deg) scale(${1 - (2 - index) * 0.02})`,
                    transformOrigin: "center",
                  }}
                  viewBox="-15 -15 160 155"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="var(--secondary)" />
                      <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                    <linearGradient
                      id="grad3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--secondary)" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="130"
                    height="125"
                    rx="12"
                    fill={card.gradient}
                    opacity="0.6"
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="relative z-20 flex h-full flex-col">
            <h2 className="mb-2 font-medium text-foreground">
              Community Messages
            </h2>
            <p className="text-sm text-muted-foreground">Messages received</p>

            <div className="mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-foreground">
                  {displayCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/community-wall" className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_2px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="pointer-events-none absolute inset-0 z-30 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center pb-16">
          <div className="relative h-32 w-40">
            {miniCards.map((card, index) => (
              <motion.svg
                key={index}
                className="absolute left-1/2 top-1/2 w-36"
                initial={{ opacity: 0, scale: 0.8, rotate: card.rotate * 0.5 }}
                animate={{
                  opacity: 0.6,
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? card.rotate * 1.2 : card.rotate * 0.8,
                  x: isHovered ? card.x * 1.2 : card.x * 0.6,
                  y: isHovered ? card.y * 1.2 : card.y * 0.5,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: delay + index * 0.1 },
                  scale: { type: "spring", stiffness: 200, damping: 15 },
                  rotate: { type: "spring", stiffness: 200, damping: 15 },
                  x: { type: "spring", stiffness: 200, damping: 15 },
                  y: { type: "spring", stiffness: 200, damping: 15 },
                }}
                style={{
                  zIndex: index === 1 ? 3 : index === 2 ? 2 : 1,
                  transformOrigin: "center",
                }}
                viewBox="-15 -15 160 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                  <linearGradient
                    id="grad2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--secondary)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                  <linearGradient
                    id="grad3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="130"
                  height="125"
                  rx="12"
                  fill={card.gradient}
                />
              </motion.svg>
            ))}
          </div>
        </div>

        <div className="relative z-20 flex h-full flex-col">
          <h2 className="mb-2 font-medium text-foreground">
            Community Messages
          </h2>
          <p className="text-sm text-muted-foreground">Messages received</p>

          <div className="mt-auto">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                {displayCount.toLocaleString()}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
