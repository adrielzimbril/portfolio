"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { siteConfig } from "@/data/config";

export function HeaderSection() {
  return (
    <PageHero
      title="Abonnements"
      description="Découvrez mes abonnements pour accéder à tous mes templates, UI kits et outils."
      buttonLink={siteConfig.links.contact.social.whatsapp.url}
      buttonText="WhatsApp"
      isMobileShowed
      imagePath={{ emoji: "🐼" }}
      actionButton
    />
  );
}
