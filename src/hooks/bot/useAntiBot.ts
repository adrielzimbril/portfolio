// hooks/useAntiBot.ts
import { useState, useEffect } from "react";
import { z } from "zod";

// Schema Zod with anti-bot protection
export const createProtectedSchema = <T extends z.ZodRawShape>(
  baseSchema: z.ZodObject<T>
) => {
  return baseSchema.extend({
    // Honeypot field (should remain empty)
    website: z.string().max(0, "Bot detected").optional(),
    // Token de timing
    _token: z.string().min(1, "Token required"),
    // Timestamp of form creation
    _timestamp: z.string().min(1, "Timestamp required"),
  });
};

// Hook for anti-bot protection
export const useAntiBot = (minTime = 3000) => {
  // 3 secondes minimum
  const [botProtection, setBotProtection] = useState({
    token: "",
    timestamp: "",
    isReady: false,
  });

  useEffect(() => {
    const token = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString();

    setBotProtection({
      token,
      timestamp,
      isReady: false,
    });

    // Mark as ready after the minimum time
    const timer = setTimeout(() => {
      setBotProtection((prev) => ({ ...prev, isReady: true }));
    }, minTime);

    return () => clearTimeout(timer);
  }, [minTime]);

  const validateBotProtection = (data: any) => {
    // Verify the honeypot
    if (data.website && data.website.trim() !== "") {
      throw new Error("Bot detected via honeypot");
    }

    // Verify the timing
    const currentTime = Date.now();
    const formTime = parseInt(data._timestamp);
    const timeDiff = currentTime - formTime;

    if (timeDiff < minTime) {
      throw new Error("Form submitted too quickly");
    }

    if (timeDiff > 30 * 60 * 1000) {
      // 30 minutes max
      throw new Error("Form expired");
    }

    // Verify the token (basic)
    if (!data._token || data._token.length < 10) {
      throw new Error("Invalid token");
    }

    return true;
  };

  return { botProtection, validateBotProtection };
};
