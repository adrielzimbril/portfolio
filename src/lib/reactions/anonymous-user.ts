// Utility for managing anonymous user IDs using cookies for cross-device sync

import { apiRoutes } from "@/data/api-routes";

const ANONYMOUS_USER_ID_COOKIE = "shironymous_reactions_user_id";
const ANONYMOUS_SYNC_COOKIE = "shironymous_reactions_synced";

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// Helper function to set cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Check if user is authenticated via Supabase auth cookies
export function isUserAuthenticated(): boolean {
  // Check for Supabase auth token cookies
  const authToken = getCookie("sb-puvwpzzntsvoihxbuxbz-auth-token.0");
  return !!authToken;
}

export function getAnonymousUserId(): string {
  if (typeof window === "undefined") return "";

  let anonymousId = getCookie(ANONYMOUS_USER_ID_COOKIE);

  if (!anonymousId) {
    // Generate a new anonymous ID
    anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    setCookie(ANONYMOUS_USER_ID_COOKIE, anonymousId, 365);
  }

  return anonymousId;
}

export function getCurrentUserId(user: any): string | undefined {
  // If user is authenticated, return their user_id
  if (user?.id) return user.id;

  // If not authenticated, return anonymous ID
  return getAnonymousUserId();
}

export function isAnonymousUser(userId: string): boolean {
  return userId.startsWith("anon_");
}

// Sync anonymous reactions to authenticated user when they log in
export async function syncAnonymousReactionsOnLogin(
  anonymousId: string,
): Promise<number> {
  // Check if already synced
  const getCookie = (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const hasSynced = getCookie(ANONYMOUS_SYNC_COOKIE);

  if (hasSynced) {
    return 0; // Already synced, skip
  }

  try {
    const res = await fetch(apiRoutes.reactions.sync.link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anonymousId }),
    });

    if (!res.ok) {
      throw new Error("Failed to sync reactions");
    }

    const { syncedCount } = await res.json();

    // Set sync cookie after successful sync
    const setCookie = (name: string, value: string, days: number) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    setCookie(ANONYMOUS_SYNC_COOKIE, "true", 365);

    return syncedCount || 0;
  } catch (error) {
    console.error("Error syncing anonymous reactions:", error);
    return 0;
  }
}

// Clear sync cookie when user logs out
export function clearSyncCookie(): void {
  if (typeof window === "undefined") return;
  document.cookie = `${ANONYMOUS_SYNC_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}
