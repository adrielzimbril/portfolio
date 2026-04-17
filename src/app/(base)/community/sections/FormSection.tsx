"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Google, ChatBubbleCircle } from "@aurthle/icons";
import { GuestbookForm } from "../components/GuestbookForm";
import { useTranslations } from "use-intl";

interface FormSectionProps {
  user: any;
}

export function FormSection({ user }: FormSectionProps) {
  const t = useTranslations();

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-32">
        <div className="bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 squircle-border-b-base-accent group-hover:squircle-border-[#ffd3ad] overflow-hidden transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-12 overflow-hidden transition-all duration-300">
                <div className="pointer-events-none flex h-full w-full items-center justify-center">
                  <ChatBubbleCircle size={20} className="text-[#ffd3ad]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">
                  {t("community.form.title")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Share your thoughts
                </p>
              </div>
            </div>

            {user ? (
              <GuestbookForm user={user} />
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("community.form.signInPrompt")}
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="secondary"
                    whileTap
                    asPointer
                    className="w-full rounded-2xl h-11 font-semibold"
                  >
                    <a href={`/api/auth/login?provider=github`}>
                      <Github size={16} className="mr-2" />
                      Continue with GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    whileTap
                    asPointer
                    className="w-full rounded-2xl h-11 font-semibold"
                  >
                    <a href={`/api/auth/login?provider=google`}>
                      <Google size={16} className="mr-2" />
                      Continue with Google
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
