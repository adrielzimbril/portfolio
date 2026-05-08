import React from "react";
import { HeaderSection } from "@/app/(base)/sections/HeaderSection";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { ShopListing } from "@/app/(base)/sections/ShopListing";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    ...baseMetadata,
    title: "Le dealer d'abonnement - Abonnements à prix réduits",
    description:
      "Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et bien d'autres. Économisez jusqu'à 50% sur vos abonnements.",
    keywords:
      "abonnements prix réduits, ChatGPT pas cher, Gemini discount, Claude AI promo, CapCut abonnement, Figma discount, Canva promo, abonnements outils, abonnements SaaS",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Le dealer d'abonnement - Abonnements à prix réduits",
      description:
        "Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et bien d'autres. Économisez jusqu'à 50% sur vos abonnements.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Le dealer d'abonnement - Abonnements à prix réduits",
      description:
        "Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et bien d'autres. Économisez jusqu'à 50% sur vos abonnements.",
    },
  };

  return metadata;
}

export default function ShopPage() {
  return (
    <>
      <HeaderSection />
      <ShopListing />
    </>
  );
}
