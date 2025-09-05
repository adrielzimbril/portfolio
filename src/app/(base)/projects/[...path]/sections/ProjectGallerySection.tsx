import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { PortfolioProjectScope } from "@/types/enum";

export interface CardData {
  title: PortfolioProjectScope;
  emoji: string;
  description: string;
  methodology?: string;
}

export function ProjectGallerySection({
  cards,
  cardSectionDescription,
}: {
  cards: CardData[];
  cardSectionDescription: string;
}) {
  return (
    <>
      <SectionLayout
        title="Cadrage du problème"
        description={cardSectionDescription}
        //className="p-0"
      >
        {cards.map((card, index) => {
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
