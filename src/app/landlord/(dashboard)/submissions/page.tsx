import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { SubmissionsSection } from "./sections/SubmissionsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.pages.submissions");

  return {
    ...baseMetadata,
    title: "[ROOT] // INCOMING_PAYLOADS",
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function SubmissionsPage() {
  return <SubmissionsSection />;
}
