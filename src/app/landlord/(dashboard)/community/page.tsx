import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { CommunitySection } from "./sections/CommunitySection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: "[ROOT] // COMMUNITY_NODE",
    description: "Orchestration des signaux de la communauté.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function CommunityPage() {
  return <CommunitySection />;
}
