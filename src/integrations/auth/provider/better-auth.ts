"use client";

import { useEffect, useState } from "react";
import { AuthHandler } from "@/integrations/auth/types/types";
import { ConfigValue } from "@/config";

// Note: BetterAuth usually requires a client from 'better-auth/react'
// Since the dependency is not yet in package.json, we implement the logic
// following their standard API structure.

const BETTER_AUTH_API_BASE = `${ConfigValue.BETTER_AUTH_URL}/api/auth`;

export const signInWithGithub: AuthHandler["signInWithGithub"] = async () => {
  // BetterAuth standard redirect flow
  window.location.href = `${BETTER_AUTH_API_BASE}/login/github?callbackUrl=${window.location.origin}/community`;
};

export const signInWithGoogle: AuthHandler["signInWithGoogle"] = async () => {
  // BetterAuth standard redirect flow
  window.location.href = `${BETTER_AUTH_API_BASE}/login/google?callbackUrl=${window.location.origin}/community`;
};

export const signOut: AuthHandler["signOut"] = async () => {
  try {
    const response = await fetch(`${BETTER_AUTH_API_BASE}/sign-out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("BetterAuth | Sign out failed");
    
    // Refresh page or redirect
    window.location.href = "/";
  } catch (error) {
    console.error("BetterAuth | Sign out error:", error);
    throw error;
  }
};

export const useUser: AuthHandler["useUser"] = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${BETTER_AUTH_API_BASE}/get-session`);
        if (response.ok) {
          const data = await response.json();
          setUser(data?.user ?? null);
        }
      } catch (error) {
        console.error("BetterAuth | Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { user, loading };
};
