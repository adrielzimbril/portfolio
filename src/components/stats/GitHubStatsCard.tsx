"use client";

import { useEffect, useState } from "react";
import { Star, Github, Git, Calendar } from "@aurthle/icons";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

type GitHubStatType = "stars" | "forks" | "commits";

interface GitHubStatsCardProps {
  type: GitHubStatType;
  label: string;
  value: number;
  delay?: number;
  change?: number;
  period?: string;
  className?: string;
}

const starDecorations = [
  { x: "12%", y: "18%", size: 16, rotate: 0, delay: 0 },
  { x: "78%", y: "12%", size: 12, rotate: 15, delay: 0.1 },
  { x: "85%", y: "55%", size: 14, rotate: -10, delay: 0.15 },
  { x: "20%", y: "65%", size: 10, rotate: 20, delay: 0.2 },
  { x: "65%", y: "70%", size: 8, rotate: -5, delay: 0.25 },
];

const forkDecorations = [
  { x: "15%", y: "20%", rotate: -20, delay: 0 },
  { x: "80%", y: "15%", rotate: 25, delay: 0.1 },
  { x: "75%", y: "60%", rotate: -15, delay: 0.15 },
  { x: "25%", y: "70%", rotate: 10, delay: 0.2 },
];

const commitDecorations = [
  { x: "15%", y: "25%", delay: 0 },
  { x: "30%", y: "18%", delay: 0.05 },
  { x: "75%", y: "20%", delay: 0.1 },
  { x: "85%", y: "50%", delay: 0.15 },
  { x: "20%", y: "65%", delay: 0.2 },
  { x: "70%", y: "70%", delay: 0.25 },
];

function StarShape({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function BranchShape({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="10" cy="4" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="16" cy="20" r="2" />
      <path d="M10 6v6M10 12c0 4-6 4-6 8M10 12c0 4 6 4 6 8" />
    </svg>
  );
}

function CommitDot({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <circle cx="8" cy="8" r="4" />
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
    </svg>
  );
}

const themeConfig = {
  stars: {
    icon: Star,
    decorColor: "text-amber-400",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-transparent",
  },
  forks: {
    icon: Git,
    decorColor: "text-teal-400",
    iconColor: "text-teal-500",
    bgColor: "bg-teal-500/10",
    glowColor: "shadow-teal-500/20",
    gradient: "from-teal-500/20 to-transparent",
  },
  commits: {
    icon: Github,
    decorColor: "text-violet-400",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    glowColor: "shadow-violet-500/20",
    gradient: "from-violet-500/20 to-transparent",
  },
};

export function GitHubStatsCard({
  type,
  label,
  value,
  delay = 0,
  change,
  period,
  className,
}: GitHubStatsCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(
    shouldReduceAnimations ? value : 0,
  );

  const theme = themeConfig[type];
  const Icon = theme.icon;

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
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, delay, shouldReduceAnimations]);

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-1 squircle size-full squircle-b-base squircle-5xl squircle-smooth-lg border-0 overflow-hidden"
      >
        <CardContent className="grid grid-cols-1 size-full p-2 gap-2">
          <div
            className={cn(
              "squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden",
            )}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {type === "stars" &&
                starDecorations.map((star, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: star.rotate - 30 }}
                    animate={{
                      opacity: isHovered ? 0.55 : 0.3,
                      scale: isHovered ? 1.4 : 1,
                      rotate: isHovered ? star.rotate + 15 : star.rotate,
                      y: isHovered ? -8 : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { type: "spring", stiffness: 200, damping: 15 },
                      rotate: { type: "spring", stiffness: 200, damping: 15 },
                      y: { type: "spring", stiffness: 200, damping: 15 },
                    }}
                    className={`absolute ${theme.decorColor}`}
                    style={{ left: star.x, top: star.y }}
                  >
                    <StarShape size={star.size} />
                  </motion.div>
                ))}

              {type === "forks" &&
                forkDecorations.map((fork, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: fork.rotate }}
                    animate={{
                      opacity: isHovered ? 0.5 : 0.28,
                      scale: isHovered ? 1.3 : 1,
                      rotate: isHovered ? fork.rotate * 1.3 : fork.rotate,
                      y: isHovered ? -8 : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { type: "spring", stiffness: 200, damping: 15 },
                      rotate: { type: "spring", stiffness: 200, damping: 15 },
                      y: { type: "spring", stiffness: 200, damping: 15 },
                    }}
                    className={`absolute ${theme.decorColor}`}
                    style={{ left: fork.x, top: fork.y }}
                  >
                    <BranchShape />
                  </motion.div>
                ))}

              {type === "commits" &&
                commitDecorations.map((commit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isHovered ? 0.55 : 0.32,
                      scale: isHovered ? 1.5 : 1,
                      y: isHovered ? -6 : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { type: "spring", stiffness: 250, damping: 15 },
                      y: { type: "spring", stiffness: 200, damping: 15 },
                    }}
                    className={`absolute ${theme.decorColor}`}
                    style={{ left: commit.x, top: commit.y }}
                  >
                    <CommitDot />
                  </motion.div>
                ))}
            </div>
            <div
              className={cn(
                "relative flex flex-row z-20 items-center gap-2 md:gap-4 px-2 py-2 md:px-4 md:py-4",
              )}
            >
              <Badge
                className={cn("capitalize whitespace-pre-line")}
                size="lg"
                circle
              >
                <Icon size={32} className={theme.iconColor} variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide whitespace-pre-line">{label}</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {displayValue.toLocaleString()}
                </p>
                {period && (
                  <p className="mt-1 text-xs text-muted-foreground">{period}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
