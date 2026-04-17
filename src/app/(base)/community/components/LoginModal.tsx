"use client";
import React from "react";
import { Link } from "@/components/ui/link";
import { Github, Google } from "@aurthle/icons";
import { useTranslations } from "use-intl";
import { cn } from "@/utils/utils";

export function LoginModal() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          {t("community.login-modal.title")}
        </h3>
        <p className="text-muted-foreground">
          {t("community.login-modal.description")}
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href={`/api/auth/login?provider=github`}
          variant="default"
          likeButton
          asIcon
          whileTap
          className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
        >
          <span className="flex items-center justify-center gap-2">
            <Github size={16} variant="bulk" />
            {t("community.login-modal.github")}
          </span>
        </Link>
        <Link
          href={`/api/auth/login?provider=google`}
          variant="secondary"
          asIcon
          likeButton
          whileTap
          className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
        >
          <span className="flex items-center justify-center gap-2">
            <Google size={16} variant="bulk" />
            {t("community.login-modal.google")}
          </span>
        </Link>
      </div>
    </div>
  );
}
