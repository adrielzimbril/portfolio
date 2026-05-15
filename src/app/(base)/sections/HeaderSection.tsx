"use client";
import React from "react";
import { Skeleton } from "boneyard-js/react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { siteConfig } from "@/data/config";
import { useSquircleReady } from "@/components/providers/layout-provider";

export function HeaderSection() {
  const { isReady } = useSquircleReady();

  return (
    <Skeleton name="shop-header" loading={!isReady}>
      <PageHero
        title="Le dealer d'abonnement 🐼"
        description="Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et bien d'autres. Économisez jusqu'à 85% sur vos abonnements."
        buttonLink={siteConfig.links.contact.social.whatsapp.url}
        buttonText="WhatsApp"
        isMobileShowed
        imagePath={{ emoji: "🤯" }}
        actionButton
      />
    </Skeleton>
  );
}
