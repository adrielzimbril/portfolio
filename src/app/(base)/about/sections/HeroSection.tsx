import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";

export function HeroSection() {
  return (
    <PageHero
      title={"Hello, je suis \n Adriel Zimbril - \n Product designer"}
      description="Donnez à votre entreprise les moyens d&#39;une conception centrée sur l&#39;utilisateur et de l&#39;IA pour offrir des expériences client fluides et accélérer la croissance."
      buttonLink={routes.about.link}
      buttonText="Voir mes projets"
      buttonVariant="secondary"
      imagePath="/portrait.png"
    />
  );
}
