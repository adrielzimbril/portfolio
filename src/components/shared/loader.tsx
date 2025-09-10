"use client";

import { cn } from "@/utils/utils";
import { motion } from "motion/react";

type LoaderProps = {
  style?: "dots" | "bounce" | "pulse" | "single";
  color?: string;
  className?: string;
};

export function Loader({
  style = "dots",
  color = "bg-zinc-100",
  className,
}: LoaderProps) {
  switch (style) {
    case "dots":
      return (
        <motion.div
          className={cn("flex gap-2 items-center justify-center", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn("w-3 h-3 rounded-full", color)}
              animate={{
                scale: [1, 1.2, 0.9],
                opacity: [0.4, 1, 0.6],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.3 + 1.5,
              }}
            />
          ))}
        </motion.div>
      );

    case "bounce":
      return (
        <div className={cn("flex items-center gap-2", className)}>
          <div
            className={cn("w-3 h-3 rounded-full animate-bounce delay-0", color)}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-bounce delay-150",
              color
            )}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-bounce delay-300",
              color
            )}
          />
        </div>
      );

    case "pulse":
      return (
        <div className={cn("flex items-center gap-2", className)}>
          <div
            className={cn("w-3 h-3 rounded-full animate-pulse delay-0", color)}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-pulse delay-300",
              color
            )}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-pulse delay-600",
              color
            )}
          />
        </div>
      );

    case "single":
      return (
        <motion.div
          className={cn("size-4 bg-white rounded-full", className)}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.4],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      );

    default:
      return null;
  }
}
