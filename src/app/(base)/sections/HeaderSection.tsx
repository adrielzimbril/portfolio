"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";

export function HeaderSection() {
  return (
    <PageHero
      title="Ressources & Outils"
      description="Découvrez mes templates, UI kits et outils pour construire vos produits plus rapidement."
      badge="Shop 🛍️"
      buttonLink="#"
      buttonText="Whatsapp"
      isMobileShowed
      imagePath={{ emoji: "🛍️" }}
      actionButton
    />
  );
}
