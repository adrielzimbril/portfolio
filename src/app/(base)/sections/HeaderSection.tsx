"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { siteConfig } from "@/data/config";

export function HeaderSection() {
  return (
    <PageHero
      title="Le dealer d'abonnement"
      description="Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et bien d'autres. Économisez jusqu'à 50% sur vos abonnements."
      buttonLink={siteConfig.links.contact.social.whatsapp.url}
      buttonText="Commander sur WhatsApp"
      isMobileShowed
      imagePath={{ emoji: "�" }}
      actionButton
    />
  );
}
