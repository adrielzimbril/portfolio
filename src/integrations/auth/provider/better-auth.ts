"use client";

import { createAuthClient } from "better-auth/react";
import { AuthHandler } from "@/integrations/auth/types/types";
import { ConfigValue } from "@/config";

const authClient = createAuthClient({
  baseURL: ConfigValue.BETTER_AUTH_URL,
});

export const signInWithGithub: AuthHandler["signInWithGithub"] = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: `${window.location.origin}/community`,
  });
};

export const signInWithGoogle: AuthHandler["signInWithGoogle"] = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${window.location.origin}/community`,
  });
};

export const signOut: AuthHandler["signOut"] = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};

export const useUser: AuthHandler["useUser"] = () => {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user ?? null,
    loading: isPending,
  };
};
