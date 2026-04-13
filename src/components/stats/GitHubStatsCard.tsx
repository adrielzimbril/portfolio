"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Star, GitFork, GitCommit } from "lucide-react";

interface GitHubStatsCardProps {
  type: "stars" | "forks" | "commits";
  label: string;
  value: number;
  delay?: number;
}

export function GitHubStatsCard({ type, label, value, delay = 0 }: GitHubStatsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  const icon = type === "stars" ? <Star className="h-5 w-5" /> : type === "forks" ? <GitFork className="h-5 w-5" /> : <GitCommit className="h-5 w-5" />;

  useEffect(() => {
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
  }, [value, delay]);

  const cardClassName = "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card";

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
        <motion.div
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          {icon}
        </motion.div>

        <h2 className="mb-2 font-medium text-foreground">{label}</h2>

        <div className="mt-auto">
          <motion.p
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-3xl font-semibold tracking-tight text-primary"
          >
            {displayValue.toLocaleString()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
