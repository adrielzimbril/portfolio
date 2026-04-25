import React from "react";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HubProductLinksSection } from "@/landlord/pages/HubProductLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: "[ROOT] // HUB_PRODUCT_LINKS",
    description: "Gestion des liens privés des produits du Hub.",
    robots: { index: false, follow: false },
  };
}

export default function HubProductLinksPage() {
  return <HubProductLinksSection />;
}
