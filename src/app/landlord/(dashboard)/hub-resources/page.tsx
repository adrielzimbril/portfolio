import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { HubResourcesManagementSection } from "@/landlord/pages/HubResourcesManagementSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: "[ROOT] // HUB_RESOURCES",
    description: "Gestion des liens privés du Hub Shiro.",
    robots: { index: false, follow: false },
  };
}

export default function HubResourcesPage() {
  return <HubResourcesManagementSection />;
}
