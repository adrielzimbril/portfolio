import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { AdminAuthGuard } from "@/components/shared/pages/landlord/AdminAuthGuard";
import { AdminDashboard } from "@/components/shared/pages/landlord/AdminDashboard";
import { isUserAuthenticatedServer } from "@/lib/reactions/anonymous-user";
import { LoginButtons } from "@/components/shared/pages/landlord/LoginButtons";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";
import { logger } from "@/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("admin.title"),
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("admin.title"),
      description: t("admin.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("admin.title"),
      description: t("admin.description"),
    },
  };
}

export default async function AdminPage() {
  const isAuthenticated = await isUserAuthenticatedServer();
  const t = await getTranslations();

  if (!isAuthenticated) {
    return (
      <>
        <PageHero
          title={t("admin.page.title")}
          description="Connectez-vous pour accéder au tableau de bord administratif"
          imagePath={{ emoji: "🔐" }}
          isMobileShowed
        />

        <SectionLayout isFlex>
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <p className="text-center text-b-white-invert-sec">
              Vous devez être connecté pour accéder à cette page
            </p>
            <LoginButtons />
          </div>
        </SectionLayout>
      </>
    );
  }

  // Fetch user data to check admin status
  let user = null;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    // User fetch failed, continue without user
  }

  return (
    <AdminAuthGuard user={user}>
      <PageHero
        title={t("admin.page.title")}
        description={t("admin.page.description")}
        imagePath={{ emoji: "🔐" }}
        isMobileShowed
      />

      <SectionLayout isFlex>
        <AdminDashboard />
      </SectionLayout>
    </AdminAuthGuard>
  );
}
