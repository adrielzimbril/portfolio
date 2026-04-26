import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { HubProductLinksSection } from "./sections/HubProductLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.hub_product_links");

  return {
    ...baseMetadata,
    title: "[ROOT] // HUB_PRODUCT_LINKS",
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function HubProductLinksPage() {
  return <HubProductLinksSection />;
}
