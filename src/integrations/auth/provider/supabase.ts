"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider } from "../types";
import { authRoutes } from "../routes";

/**
 * Supabase Authentication Provider Implementation
 */
export const supabaseProvider: AuthProvider = {
  signInWithGithub: async () => {
    window.location.href = `${authRoutes.login}?provider=github`;
  },

  signInWithGoogle: async () => {
    window.location.href = `${authRoutes.login}?provider=google`;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  useUser: () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getInitialUser = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      getInitialUser();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }, []);

    return { user, loading };
  },
};
