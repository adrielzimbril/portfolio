"use client";
import { useTurnstile } from "@/integrations/anti-bot/turnstile";
import { useEffect } from "react";
import { getTurnstileConfig } from "@/config";

export function Turnstile({
  execute,
  onTokenReady,
  onError,
}: {
  execute?: boolean;
  onTokenReady?: (token: string) => void;
  onError?: (error: any) => void;
}) {
  const { siteKey } = getTurnstileConfig();
  const {
    ref,
    token,
    error,
    isLoading,
    execute: executeTurnstile,
  } = useTurnstile(siteKey, {
    appearance: "execute",
    execution: "execute",
    "retry-interval": 1000,
    theme: "auto",
  });

  // Execute when the prop execute changes
  useEffect(() => {
    if (execute) {
      executeTurnstile();
    }
  }, [execute, executeTurnstile]);

  // Notify the parent when the token is ready
  useEffect(() => {
    if (token && onTokenReady) {
      onTokenReady(token);
    }
  }, [token, onTokenReady]);

  // Notify the parent in case of error
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return <div ref={ref} className="hidden" />;
}
