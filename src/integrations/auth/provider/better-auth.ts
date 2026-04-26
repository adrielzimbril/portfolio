"use client";
import { createAuthClient } from "better-auth/react";
import { AuthHandler } from "@/integrations/auth/types/types";
import { ConfigValue } from "@/config";

const authClient = createAuthClient({
  baseURL: ConfigValue.BETTER_AUTH_URL,
});

const getCallbackURL = (customCallback?: string) => {
  if (customCallback) return `${window.location.origin}${customCallback}`;
  return `${window.location.origin}${ConfigValue.AUTH_CALLBACK_URL_COMMUNITY}`;
};

export const signInWithGithub: AuthHandler["signInWithGithub"] = async (
  callbackURL?,
) => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: getCallbackURL(callbackURL),
  });
};

export const signInWithGoogle: AuthHandler["signInWithGoogle"] = async (
  callbackURL?,
) => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: getCallbackURL(callbackURL),
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
