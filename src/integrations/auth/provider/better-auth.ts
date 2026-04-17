"use client";

import { AuthProvider } from "../types";

/**
 * BetterAuth Provider (Stub - Currently Disabled)
 * This serves as a placeholder for future BetterAuth integration.
 */
export const betterAuthProvider: AuthProvider = {
  signInWithGithub: async () => {
    throw new Error("BetterAuth is currently disabled. Use Supabase instead.");
  },

  signInWithGoogle: async () => {
    throw new Error("BetterAuth is currently disabled. Use Supabase instead.");
  },

  signOut: async () => {
    throw new Error("BetterAuth is currently disabled. Use Supabase instead.");
  },

  useUser: () => {
    return {
      user: null,
      loading: false,
    };
  },
};
