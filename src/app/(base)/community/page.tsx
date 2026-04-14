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
              color: "text-primary",
            },
            {
              icon: Users,
              label: "Members",
              value: "892",
              color: "text-accent",
            },
            {
              icon: Heart,
              label: "Active",
              value: "156",
              color: "text-pink-500",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "group relative flex flex-col items-center justify-center p-6 overflow-hidden squircle-border-border squircle-b-base transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
                "squircle squircle-smooth-xl squircle-6xl",
              )}
            >
              <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: stat.color.replace("text-", "") }}
              />
              <div className="relative z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-b-base text-foreground shadow-lg mb-3">
                <stat.icon size={24} className={stat.color} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionLayout
        title={t("community.sections.wall.title")}
        description={t("community.sections.wall.description")}
        badge={t("community.sections.wall.badge")}
        isFlex
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div
              className={cn(
                "group relative overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
                "squircle squircle-smooth-xl squircle-6xl sticky top-32",
              )}
            >
              <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-b-base text-foreground shadow-lg">
                    <ChatBubble size={24} className="text-primary" />
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
                      className="w-full rounded-2xl h-11 font-semibold"
                    >
                      <a href={`/api/auth/login?provider=github`}>
                        <Github className="mr-2 h-4 w-4" />
                        {t("community.form.signInButton")}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
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
