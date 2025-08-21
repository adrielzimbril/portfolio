import { LightbulbIcon } from "lucide-react";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";

export function HeaderSection() {
  return (
    <PageHero
      title="Réflexions"
      description="Voici un espace où vous pouvez publier des articles sur vraiment tout, par exemple des conseils sur le design, des engrenages qui boostent votre productivité"
      buttonLink={routes.hub.link}
      buttonText="Voir mes réflexions"
      imagePath="/image-657.png"
      actionButton
    />
  );
}
