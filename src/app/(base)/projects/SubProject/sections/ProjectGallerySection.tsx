import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { PortfolioProjectResearchScope } from "@/types/enum";

interface CardData {
  title: PortfolioProjectResearchScope;
  emoji: string;
  description: string;
  methodology?: string;
}
const cardData: CardData[] = [
  {
    title: PortfolioProjectResearchScope.WHO,
    emoji: "/emoji-true-2.png",
    description:
      "Qui rencontre le problème ? Vous pouvez ajouter des cadres plus spécifiques pour les développer.",
    methodology: "Persona",
  },
  {
    title: PortfolioProjectResearchScope.WHEN,
    emoji: "/image-1310-2.png",
    description:
      "Quand le problème apparaît-il réellement dans le processus? Cela peut être à un moment précis.",
    methodology: "Carte d'empathie",
  },
  {
    title: PortfolioProjectResearchScope.WHERE,
    emoji: "/emoji-true-2.png",
    description:
      "Dans quel contexte l'utilisateur rencontre-t-il le problème, espace physique ou numérique ?",
    methodology: "Carte du parcours",
  },
  {
    title: PortfolioProjectResearchScope.WHY,
    emoji: "/emoji-true-2.png",
    description:
      "Pourquoi ce problème est-il important pour les utilisateurs, les avantages de la résolution de ce problème ?",
    methodology: "Carte des propositions de valeur",
  },
];

export function ProjectGallerySection() {
  return (
    <>
      <SectionLayout
        title="Cadrage du problème"
        description="Toute bonne histoire commence par un POURQUOI ? La même chose s'applique à votre projet ! Clarifier d'abord le problème est un excellent moyen de briser la glace pour vos lecteurs"
        //className="p-0"
      >
        {cardData.map((card, index) => {
          return (
            card.methodology && (
              <PreviewValueCard
                key={index}
                icon={card.emoji}
                badge={card.title}
                title={card.description}
                description={card.methodology}
              />
            )
          );
        })}
      </SectionLayout>
    </>
  );
}
