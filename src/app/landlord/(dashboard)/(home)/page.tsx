import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { OverviewSection } from "./sections/OverviewSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.home");

  return {
    ...baseMetadata,
    title: "[ROOT] // OVERVIEW_CONSOLE",
    description: t("description"),
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
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

export default function AdminPage() {
  return <OverviewSection />;
}
