import React from "react";
import { MyProjectsSection } from "./sections/MyProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    title: t("projects.title"),
    description: t("projects.description"),
  };
  return metadata;
}

export default function MyProject() {
  return (
    <>
      <HeaderSection />
      <MyProjectsSection />
      <CallToAction isPage />
    </>
  );
}
