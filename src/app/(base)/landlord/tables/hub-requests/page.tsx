import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isUserAuthenticatedServer } from "@/lib/reactions/anonymous-user";
import { createClient } from "@/integrations/supabase/server";
import { ConfigValue } from "@/config";
import { landlordRoutes } from "@/data/landlordRoutes";
import { metadata as baseMetadata } from "@/app/metadata";
import { logger } from "@/utils";
import { HubRequestsSection } from "./HubRequestsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: `Hub Requests - ${t("admin.title")}`,
    description: "Demandes produits",
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
      title: `Hub Requests - ${t("admin.title")}`,
      description: "Demandes produits",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `Hub Requests - ${t("admin.title")}`,
      description: "Demandes produits",
    },
  };
}

export default async function HubRequestsPage() {
  const isAuthenticated = await isUserAuthenticatedServer();

  if (!isAuthenticated) {
    redirect(landlordRoutes.login.link);
  }

  let user = null;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    logger.error("[HubRequestsPage] Failed to fetch user data", error);
  }

  const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];
  const userEmail = user?.email;

  if (!user || !userEmail || !adminEmails.includes(userEmail)) {
    redirect(`${landlordRoutes.login.link}?reason=unauthorized`);
  }

  return <HubRequestsSection />;
}
