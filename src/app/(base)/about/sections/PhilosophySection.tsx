"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import { Locale } from "@/types";
import {
  WandIcon,
  LongitudeIcon,
  BalanceIcon,
  BookIcon,
} from "@/components/shared/icons/break-icons";

interface PhilosophyCard {
  title: string;
  locale: Locale;
  icon: React.ReactNode;
  alt: string;
  description: string;
}

const data: PhilosophyCard[] = [
  {
    title: "L’utilisateur avant tout",
    locale: Locale.FR,
    icon: <WandIcon />,
    alt: "Symbol",
    description:
      "Chaque projet commence par une question simple : qu’est-ce qui compte vraiment pour l’utilisateur ?\nMon rôle : transformer cette réponse en expériences qui donnent envie d’être utilisées et qui dépassent les attentes.",
  },
  {
    title: "Toujours en apprentissage",
    locale: Locale.FR,
    icon: <BookIcon />,
    alt: "Book",
    description:
      "Design, IA, growth, systèmes… J’aime rester curieux et explorer ce qui vient ensuite.\nChaque nouveauté est une occasion d’améliorer ce que je crée — et d’inspirer ceux avec qui je travaille.",
  },
  {
    title: "Des équipes qui s’élèvent",
    locale: Locale.FR,
    icon: <LongitudeIcon />,
    alt: "Longitude",
    description:
      "Un produit réussi est un travail d’équipe. J’adore créer des espaces où les idées circulent, où chacun se sent impliqué et où l’on construit quelque chose dont tout le monde est fier.",
  },
  {
    title: "Agir vite, agir bien",
    locale: Locale.FR,
    icon: <BalanceIcon />,
    alt: "Balance default",
    description:
      "Je crois aux itérations rapides et aux décisions intentionnelles.\nChaque test est une boussole, chaque ajustement rapproche le produit de sa meilleure version.",
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
