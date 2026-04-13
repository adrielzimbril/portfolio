"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

interface DaysSinceRevampProps {
  revampDate: Date;
  delay?: number;
}

export function DaysSinceRevamp({
  revampDate,
  delay = 0,
}: DaysSinceRevampProps) {
  const [isHovered, setIsHovered] = useState(false);

  const days = (() => {
    const now = new Date();
    const diff = now.getTime() - revampDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  })();

  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:bg-card";

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
          <Calendar className="h-5 w-5" />
        </motion.div>

        <h2 className="mb-2 font-medium text-foreground">Days Since Revamp</h2>
        <p className="text-sm text-muted-foreground">Last major update</p>

        <div className="mt-auto">
          <motion.p
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-3xl font-semibold tracking-tight text-primary"
          >
            {days}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
