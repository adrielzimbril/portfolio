"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import { Locale } from "@/types";

interface PhilosophyCard {
  title: string;
  locale: Locale;
  icon: string;
  alt: string;
  description: string;
}

const data = [
  {
    title: "Innovation centrée sur l'utilisateur",
    locale: Locale.FR,
    icon: "/symbol.png",
    alt: "Symbol",
    description:
      "Garder les besoins des utilisateurs finaux au premier plan pour créer des produits qui non seulement résolvent les problèmes mais dépassent également les attentes.",
  },
  {
    title: "Leadership d'équipe",
    locale: Locale.FR,
    icon: "/longitude.svg",
    alt: "Longitude",
    description:
      "Construire et responsabiliser des équipes interfonctionnelles pour atteindre des objectifs ambitieux.",
  },
  {
    title: "Agilité stratégique",
    locale: Locale.FR,
    icon: "/balance-default.svg",
    alt: "Balance default",
    description:
      "Équilibrer l'innovation avec une stratégie pratique pour naviguer dans une dynamique de marché complexe et saisir les opportunités émergentes.",
  },
  {
    title: "Apprentissage continu",
    locale: Locale.FR,
    icon: "/book.svg",
    alt: "Book",
    description:
      "Rester à la pointe des tendances en matière d'IA et de conception, en veillant à ce que mes équipes soient équipées pour relever les défis.",
  },
];

export function PhilosophySection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SectionLayout
      badge={t("about.page.philosophy-section.badge")}
      title={t("about.page.philosophy-section.title")}
      //description={t("about.page.philosophy-section.description")}
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
