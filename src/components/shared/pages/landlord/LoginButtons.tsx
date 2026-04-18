"use client";
import React from "react";
import { Github, Google } from "@aurthle/icons";
import { Button } from "@/components/ui/button";
import { cn, getPathUrl } from "@/utils";
import { useTranslations } from "use-intl";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/integrations/auth/provider/supabase";
import { landlordRoutes } from "@/data/landlordRoutes";

export function LoginButtons() {
  const t = useTranslations();

  const handleSignIn = async (
    signInFn: (callbackURL?: string) => Promise<void>,
  ) => {
    const callbackURL = getPathUrl(
      landlordRoutes.landlord.link + window.location.search,
    );
    await signInFn(callbackURL);
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => handleSignIn(signInWithGithub)}
        variant="default"
        asIcon
        whileTap
        className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
      >
        <span className="flex items-center justify-center gap-2">
          <Github size={16} variant="bulk" />
          {t("community.login-modal.github")}
        </span>
      </Button>
      <Button
        onClick={() => handleSignIn(signInWithGoogle)}
        variant="secondary"
        asIcon
        whileTap
        className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
      >
        <span className="flex items-center justify-center gap-2">
          <Google size={16} variant="bulk" />
          {t("community.login-modal.google")}
        </span>
      </Button>
    </div>
  );
}
