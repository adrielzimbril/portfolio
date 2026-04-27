"use client";
import { cn } from "@/utils/utils";

type LoaderProps = {
  variant?: "dots" | "bounce" | "pulse" | "single";
  color?: string;
  className?: string;
};

export function Loader({
  variant = "dots",
  color = "bg-b-base",
  className,
}: LoaderProps) {
  switch (variant) {
    case "dots":
      return (
        <div
          className={cn("flex gap-2 items-center justify-center", className)}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn("w-3 h-3 rounded-full animate-bounce", color)}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
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
              color,
            )}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-bounce delay-300",
              color,
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
              color,
            )}
          />
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-pulse delay-600",
              color,
            )}
          />
        </div>
      );

    case "single":
      return (
        <div
          className={cn(
            "size-4 bg-b-white rounded-full animate-pulse",
            className,
          )}
        />
      );

    default:
      return null;
  }
}
