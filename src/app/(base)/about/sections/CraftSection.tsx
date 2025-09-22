"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import {
  DefaultIcon,
  PlayingCardsIcon,
  ShapeIcon,
  ThreeDIcon,
} from "@/components/shared/icons/break-icons";

interface CraftSectionCard {
  icon: string | React.ReactNode;
  locale: string;
  title: string;
  description: string;
}

const data: CraftSectionCard[] = [
  {
    icon: <PlayingCardsIcon />,
    locale: "fr",
    title: "Pour les entreprises",
    description:
      "Je conçois des interfaces conviviales et précieuses pour les clients et faciles à mettre en œuvre pour les ingénieurs.",
  },
  {
    icon: <ThreeDIcon />,
    locale: "fr",
    title: "Pour les startups",
    description:
      "J'aide à identifier le problème et à concevoir un MVP. Je vous conseille sur les outils de développement .",
  },
  {
    icon: <ShapeIcon />,
    locale: "fr",
    title: "Pour les équipes produits",
    description:
      "Je conçois des expériences de croissance et aide votre équipe à envisager les défis différemment pour créer un meilleur produit.",
  },
];

export function CraftSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SectionLayout
      badge={t("about.page.craft-section.badge")}
      title={t("about.page.craft-section.title")}
      //description={t("about.page.craft-section.description")}
      layoutStart
    >
      {data
        .filter((item) => item.locale === locale)
        .map((item, index) => (
          <DetailsCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
    </SectionLayout>
  );
}
