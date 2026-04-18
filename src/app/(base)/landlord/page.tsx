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
import { Link } from "@/components/ui/link";
import { Github, Google } from "@aurthle/icons";

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
            <div className="flex gap-4">
              <Link
                href={`/api/auth/login?provider=github`}
                variant="default"
                likeButton
                className="flex items-center gap-2"
              >
                <Github size={20} variant="bulk" />
                Connexion GitHub
              </Link>
              <Link
                href={`/api/auth/login?provider=google`}
                variant="secondary"
                likeButton
                className="flex items-center gap-2"
              >
                <Google size={20} variant="bulk" />
                Connexion Google
              </Link>
            </div>
          </div>
        </SectionLayout>
      </>
    );
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
