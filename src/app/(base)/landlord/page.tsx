import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { supabase } from "@/integrations/supabase/client";
import { AdminAuthGuard } from "./components/AdminAuthGuard";
import { AdminDashboard } from "./components/AdminDashboard";

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations();

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
