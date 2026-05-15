"use client";
import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { useIsMounted } from "@/hooks/useIsMounted";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();
  const isDarkMode = useIsDarkMode();
  const progressColor = isMounted && isDarkMode ? "#f5f5f5" : "#27272a";

  return (
    <>
      <AppProgressProvider
        color={progressColor}
        height="3px"
        options={{ showSpinner: false }}
        shallowRouting={false}
      >
        {children}
      </AppProgressProvider>
    </>
  );
}
