// Utility for managing anonymous user IDs in localStorage

const ANONYMOUS_USER_ID_KEY = 'anonymous_user_id';

export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let anonymousId = localStorage.getItem(ANONYMOUS_USER_ID_KEY);
  
  if (!anonymousId) {
    // Generate a new anonymous ID
    anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(ANONYMOUS_USER_ID_KEY, anonymousId);
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
  return userId.startsWith('anon_');
}
