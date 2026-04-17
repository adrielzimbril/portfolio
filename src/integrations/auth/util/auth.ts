import { ConfigValue } from "@/config";
import {
  AuthProvider,
  AuthProviderType,
} from "@/integrations/auth/types/types";
import * as provider from "@/integrations/auth/provider";

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

export async function signInWithGithub(callbackURL?: string) {
  return provider.signInWithGithub(callbackURL);
}

export async function signInWithGoogle(callbackURL?: string) {
  return provider.signInWithGoogle(callbackURL);
}

export async function signOut() {
  return provider.signOut();
}

/**
 * useUser hook re-exported from the active provider.
 * This needs to be a separate export since it's a React Hook.
 */
export const useUser = provider.useUser;
