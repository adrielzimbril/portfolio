import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";

export function HeaderSection() {
  return (
    <PageHero
      title="Mes projets"
      description="Donnez à votre entreprise les moyens d&#39;une conception centrée sur l&#39;utilisateur et de l&#39;IA pour offrir des expériences client fluides et accélérer la croissance."
      buttonLink={routes.hub.link}
      buttonText="Voir mes projets"
      imagePath="/image-657.png"
      actionButton
    />
  );
}
