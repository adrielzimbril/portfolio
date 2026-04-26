import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { NewsletterSection } from "./sections/NewsletterSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.newsletter");

  return {
    ...baseMetadata,
    title: "[ROOT] // SIGNAL_REGISTRY",
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function NewsletterPage() {
  return <NewsletterSection />;
}
