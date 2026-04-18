import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { apiRoutes } from "@/data/api-routes";
import { AdminAuthGuard } from "@/components/shared/pages/landlord/AdminAuthGuard";
import { AdminDashboard } from "@/components/shared/pages/landlord/AdminDashboard";
import { isUserAuthenticatedServer } from "@/lib/reactions/anonymous-user";

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
    // Redirect to home if not authenticated
    return null;
  }

  // Fetch user data to check admin status
  const res = await fetch(apiRoutes.auth.user.link);
  const { user } = await res.json();

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
