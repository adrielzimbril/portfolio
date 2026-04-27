import { User } from "@supabase/supabase-js";

/**
 * Common interface for all authentication providers
 */
export interface AuthProvider {
  /**
   * Action to sign in with GitHub
   */
  signInWithGithub: () => Promise<void>;

  /**
   * Action to sign in with Google
   */
  signInWithGoogle: () => Promise<void>;

  /**
   * Action to sign out
   */
  signOut: () => Promise<void>;

  /**
   * Hook to access the current user and loading state
   */
  useUser: () => {
    user: any; // User type varies by provider, using any for flexibility
    loading: boolean;
  };
}
