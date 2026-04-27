/**
 * List of supported OAuth providers
 */
export const providerList = ["github", "google"] as const;
export type OAuthProvider = (typeof providerList)[number];

/**
 * Authentication Providers available in the system
 */
export enum AuthProvider {
  SUPABASE = "supabase",
  BETTERAUTH = "betterauth",
}

export type AuthProviderType = AuthProvider | string;

/**
 * Common interface for all authentication provider implementations
 */
export interface AuthHandler {
  /**
   * Action to sign in with GitHub
   * @param callbackURL - Optional custom callback URL (e.g., "/community")
   */
  signInWithGithub: (callbackURL?: string) => Promise<void>;

  /**
   * Action to sign in with Google
   * @param callbackURL - Optional custom callback URL (e.g., "/community")
   */
  signInWithGoogle: (callbackURL?: string) => Promise<void>;

  /**
   * Action to sign out
   */
  signOut: () => Promise<void>;

  /**
   * Hook to access the current user and loading state
   */
  useUser: () => {
    user: any;
    loading: boolean;
  };
}
