import React from "react";
import { routes } from "@/data/route";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { DEFAULT_TAG_COLOR } from "@/types/default";
import { PreviewContentType } from "@/types/enum";

const tags = [
  {
    text: "SaaS 🦄",
    bgColor: DEFAULT_TAG_COLOR.GREEN,
  },
  {
    text: "Go To Market 🎯",
    bgColor: DEFAULT_TAG_COLOR.YELLOW,
  },
  {
    text: "Web Application 📝",
    bgColor: DEFAULT_TAG_COLOR.BLUE,
  },
  {
    text: "Design 🎨",
    bgColor: DEFAULT_TAG_COLOR.WHITE_GOLD,
  },
  {
    text: "Mobile App 📱",
    bgColor: DEFAULT_TAG_COLOR.PURPLE,
  },
];

export function HeaderSection() {
  return (
    <ResourceHeaderSection
      sectionClassName="md:w-[90%] mx-auto"
      previewContent={{
        type: PreviewContentType.TEXT,
        emoji: "🛍️🛒",
        title: "E-commerce",
        subtitle:
          "Une plateforme de vente en ligne pour les artisans et petits commerçants.",
      }}
      mainTitle="Shiroshop"
      description="Donnez à votre entreprise les moyens d'une conception centrée sur l'utilisateur et de l'IA pour offrir des expériences client fluides et accélérer la croissance. Que ce soit pour discuter design, produit ou innovation, n'hésitez pas à me contacter."
      tags={tags}
      ctaButton={{ text: "Voir le projet 🦄", href: routes.projects.link }}
    />
  );
}
