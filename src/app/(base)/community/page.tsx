import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { GuestbookForm } from "./components/GuestbookForm";
import { GuestbookList } from "./components/GuestbookList";

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

      <SectionLayout
        title={t("community.sections.wall.title")}
        description={t("community.sections.wall.description")}
        badge={t("community.sections.wall.badge")}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl sticky top-32">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">
                  {t("community.form.title")}
                </h3>
                {user ? (
                  <GuestbookForm user={user} />
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("community.form.signInPrompt")}
                    </p>
                    <Button asChild className="w-full">
                      <a href={`/api/auth/login?provider=github`}>
                        <Github className="mr-2 h-4 w-4" />
                        {t("community.form.signInButton")}
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
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
