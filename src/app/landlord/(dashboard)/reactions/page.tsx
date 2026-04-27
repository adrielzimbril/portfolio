import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { ReactionsSection } from "./sections/ReactionsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.reactions");

  return {
    ...baseMetadata,
    title: "[ROOT] // SIGNAL_LOGS",
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function ReactionsPage() {
  return <ReactionsSection />;
}
