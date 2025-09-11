"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { PortfolioProjectResearchScope } from "@/types/enum";
import { useTranslations } from "next-intl";

export interface CardData {
  title: PortfolioProjectResearchScope;
  emoji: string;
  description: string;
  methodology?: string;
}

export function ProjectResearchSection({
  cards,
  cardSectionDescription,
}: {
  cards: CardData[];
  cardSectionDescription: string;
}) {
  const t = useTranslations();

  return (
    <>
      <SectionLayout
        title={t("projects.inner-page.project-research-section.title")}
        description={
          cardSectionDescription ||
          t("projects.inner-page.project-research-section.description")
        }
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
