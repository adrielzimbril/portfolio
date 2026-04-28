"use client";
import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();

  return (
    <>
      <AppProgressProvider
        color={isDarkMode ? "#f5f5f5" : "#27272a"}
        height="3px"
        options={{ showSpinner: false }}
        shallowRouting={false}
      >
        {children}
      </AppProgressProvider>
    </>
  );
}
