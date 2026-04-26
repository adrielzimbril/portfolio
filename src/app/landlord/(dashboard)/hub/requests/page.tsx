import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { HubRequestsTableSection } from "./sections/HubRequestsTableSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.hub_requests");

  return {
    ...baseMetadata,
    title: "[ROOT] // HUB_REQUESTS",
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function HubRequestsPage() {
  return <HubRequestsTableSection />;
}
