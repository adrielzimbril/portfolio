"use client";
import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app"; 
import { useTheme } from "next-themes";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <AppProgressProvider
        color={isDark ? "#60a5fa" : "#2563eb"}
        height="3px"
        options={{ showSpinner: true }}
        shallowRouting={false}
      >
        {children}
      </AppProgressProvider>
    </>
  );
}
