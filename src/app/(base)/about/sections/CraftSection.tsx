"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import {
  HandshakeIcon,
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
      "J’aime concevoir des interfaces qui respirent la simplicité, qui s’intègrent naturellement dans la vie de vos utilisateurs et qui respectent vos objectifs business.\n\n🎯 Impact : des clients satisfaits, des équipes techniques qui implémentent sans stress et un produit qui prouve sa valeur sur le long terme.",
  },
  {
    icon: <ThreeDIcon />,
    locale: "fr",
    title: "Pour les startups",
    description:
      "Construire un produit, c’est avant tout comprendre ce qui compte vraiment. Ensemble, nous clarifions le problème, imaginons un MVP réaliste et choisissons les bons outils pour tester vos hypothèses rapidement.\n\n🎯 Impact : moins de paris hasardeux, plus d’apprentissages concrets et un premier produit qui attire vos vrais utilisateurs.",
  },
  {
    icon: <HandshakeIcon />,
    locale: "fr",
    title: "Pour les équipes produits",
    description:
      "Les meilleurs produits naissent d’équipes alignées et curieuses. À travers des ateliers et des sessions de co-création, j’aide vos équipes à voir leurs défis autrement et à trouver des solutions qui font grandir votre produit.\n\n🎯 Impact : un produit qui évolue dans la bonne direction, et des équipes motivées et fières de ce qu’elles construisent.",
  },
  {
    icon: <ShapeIcon />,
    locale: "fr",
    title: "Pour les étudiants & créateurs",
    description:
      "Apprendre le design, ce n’est pas seulement suivre un cours : c’est comprendre comment passer d’une idée brute à un projet qui tient la route. Mes formations et ressources sont là pour vous donner les bons réflexes dès le départ.\n\n🎯 Impact : plus de confiance, moins d’abandon, et la satisfaction de voir vos idées devenir réelles.",
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
