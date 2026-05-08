"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { siteConfig } from "@/data/config";

export function HeaderSection() {
  return (
    <PageHero
      title="Ressources & Outils"
      description="Découvrez mes templates, UI kits et outils pour construire vos produits plus rapidement."
      buttonLink={siteConfig.links.contact.social.whatsapp.url}
      buttonText="Whatsapp"
      isMobileShowed
      imagePath={{ emoji: "🛍️" }}
      actionButton
    />
  );
}
