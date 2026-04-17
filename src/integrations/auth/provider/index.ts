import { supabaseProvider } from "./supabase";
// import { betterAuthProvider } from "./better-auth";

/**
 * The active authentication provider.
 * Currently using Supabase as the default provider.
 */
const activeProvider = supabaseProvider; // To switch, use betterAuthProvider

export const {
  signInWithGithub,
  signInWithGoogle,
  signOut,
  useUser,
} = activeProvider;
