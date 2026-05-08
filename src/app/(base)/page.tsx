import React from "react";
import { HeaderSection } from "@/app/(base)/sections/HeaderSection";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { ShopListing } from "@/app/(base)/sections/ShopListing";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    ...baseMetadata,
    title: "Shop - Ressources & Outils",
    description:
      "Des ressources et outils pour accélérer votre développement de produits SaaS.",
    keywords: "shop, ressources SaaS, templates, UI kits, outils design",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Shop - Ressources & Outils",
      description:
        "Des ressources et outils pour accélérer votre développement de produits SaaS.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Shop - Ressources & Outils",
      description:
        "Des ressources et outils pour accélérer votre développement de produits SaaS.",
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
