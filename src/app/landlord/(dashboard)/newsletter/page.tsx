import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { NewsletterSection } from "./sections/NewsletterSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: "[ROOT] // SIGNAL_REGISTRY",
    description: "Registre des entités connectées au flux newsletter.",
    robots: { index: false, follow: false },
  };
}

export default function NewsletterPage() {
  return <NewsletterSection />;
}
