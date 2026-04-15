import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Button } from "@/components/ui/button";
import { Github, ChatBubble, Users, Heart } from "@aurthle/icons";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { GuestbookForm } from "./components/GuestbookForm";
import { GuestbookList } from "./components/GuestbookList";
import { cn } from "@/utils/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("community.title"),
    description: t("community.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("community.title"),
      description: t("community.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("community.title"),
      description: t("community.description"),
    },
  };
}

export default async function CommunityPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("community.page.title")}
        description={t("community.page.description")}
        imagePath={{ emoji: "🎨" }}
        isMobileShowed
      />

      {/* Stats Section */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              icon: ChatBubble,
              label: "Messages",
              value: "1,234",
              color: "#8e8eff",
            },
            { icon: Users, label: "Members", value: "892", color: "#ffd3ad" },
            { icon: Heart, label: "Active", value: "156", color: "#ff8e8e" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="relative size-full flex flex-col items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-32 overflow-hidden transition-all duration-300 group-hover:squircle-border-[#8e8eff]">
                <div className="pointer-events-none flex h-full w-full items-center justify-center">
                  <stat.icon
                    size={32}
                    className={cn(
                      "transition-all duration-300",
                      stat.color === "#8e8eff"
                        ? "text-[#8e8eff]"
                        : stat.color === "#ffd3ad"
                          ? "text-[#ffd3ad]"
                          : "text-[#ff8e8e]",
                    )}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionLayout isFlex>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 squircle-border-b-base-accent group-hover:squircle-border-[#ffd3ad] overflow-hidden transition-all duration-300 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-12 overflow-hidden transition-all duration-300">
                  <div className="pointer-events-none flex h-full w-full items-center justify-center">
                    <ChatBubble size={20} className="text-[#ffd3ad]" />
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
                  <Button
                    asChild
                    variant="secondary"
                    whileTap
                    asPointer
                    className="w-full rounded-2xl h-11 font-semibold"
                  >
                    <a href={`/api/auth/login?provider=github`}>
                      <Github size={16} className="mr-2" />
                      {t("community.form.signInButton")}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <GuestbookList />
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
