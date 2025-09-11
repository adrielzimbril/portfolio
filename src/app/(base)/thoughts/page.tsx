import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    title: t("thoughts.title"),
    description: t("thoughts.description"),
  };
  return metadata;
}

export default function MyThoughts() {
  return (
    <>
      <HeaderSection />
      <MyThoughtsSection />
      <CallToAction isPage />
    </>
  );
}
