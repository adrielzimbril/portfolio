"use client";
import { BProgress } from "@bprogress/next";
import { useTheme } from "next-themes";

export function ProgressBar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <BProgress
      color={isDark ? "#60a5fa" : "#2563eb"}
      height="3px"
      options={{ showSpinner: false }}
    />
  );
}
