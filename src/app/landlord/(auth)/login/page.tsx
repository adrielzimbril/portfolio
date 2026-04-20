import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { createClient } from "@/integrations/supabase/server";
import { isUserAuthenticatedServer } from "@/lib/reactions/anonymous-user";
import { ConfigValue } from "@/config";
import { landlordRoutes } from "@/data/landlordRoutes";
import { LoginSection } from "./sections/LoginSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: "[ROOT] // AUTHENTICATION_TERMINAL",
    description: "Portail d'accès privé. Authentification Racine requise pour la mutation des nœuds de données.",
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      nocache: true,
    },
  };
}

export default async function LandlordLoginPage(props: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const searchParams = await props.searchParams;
  const isAuthenticated = await isUserAuthenticatedServer();

  if (isAuthenticated) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const adminEmails = ConfigValue.NEXT_PRIVATE_ADMIN_EMAILS?.split(",") || [];

    if (user?.email && adminEmails.includes(user.email)) {
      redirect(landlordRoutes.landlord.link);
    }
  }

  return <LoginSection reason={searchParams.reason} />;
}
