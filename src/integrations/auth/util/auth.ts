import { ConfigValue } from "@/config";
import { AuthProvider, AuthProviderType } from "../types/types";
import * as provider from "../provider";

/**
 * Resolves the authentication provider from environment config or manual override
 */
function resolveProvider(input?: AuthProviderType): AuthProvider {
  const fromEnv = (ConfigValue.AUTH_PROVIDER || "").toLowerCase();
  
  if (fromEnv === "betterauth") {
    return AuthProvider.BETTERAUTH;
  }
  
  return AuthProvider.SUPABASE;
}

/**
 * High-level Auth Actions and Hooks
 * These functions abstract the underlying provider implementation.
 */

export async function signInWithGithub() {
  return provider.signInWithGithub();
}

export async function signInWithGoogle() {
  return provider.signInWithGoogle();
}

export async function signOut() {
  return provider.signOut();
}

/**
 * useUser hook re-exported from the active provider.
 * This needs to be a separate export since it's a React Hook.
 */
export const useUser = provider.useUser;
