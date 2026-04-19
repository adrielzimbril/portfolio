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
import { LandlordLoginPanel } from "@/components/shared/pages/landlord/LoginButtons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: `${t("admin.title")} - Login`,
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
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

  return <LandlordLoginPanel reason={searchParams.reason} />;
}
