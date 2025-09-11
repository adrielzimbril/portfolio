import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyHubSection } from "./sections/MyHubSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    title: t("hub.title"),
    description: t("hub.description"),
  };

  return metadata;
}

export default function MyHub() {
  return (
    <>
      <HeaderSection />
      <MyHubSection />
      <CallToAction isPage />
    </>
  );
}
