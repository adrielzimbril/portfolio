"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { authRoutes } from "@/integrations/auth/routes";
import { AuthHandler } from "@/integrations/auth/types/types";

export const signInWithGithub: AuthHandler["signInWithGithub"] = async (
  callbackURL?,
) => {
  const url = new URL(window.location.origin + authRoutes.login);
  url.searchParams.set("provider", "github");
  if (callbackURL) {
    url.searchParams.set("next", callbackURL);
  }
  window.location.href = url.toString();
};

export const signInWithGoogle: AuthHandler["signInWithGoogle"] = async (
  callbackURL?,
) => {
  const url = new URL(window.location.origin + authRoutes.login);
  url.searchParams.set("provider", "google");
  if (callbackURL) {
    url.searchParams.set("next", callbackURL);
  }
  window.location.href = url.toString();
};

export const signOut: AuthHandler["signOut"] = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const useUser: AuthHandler["useUser"] = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Supabase Auth | Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};
