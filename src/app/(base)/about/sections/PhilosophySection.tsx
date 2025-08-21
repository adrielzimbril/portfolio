import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";

const data = [
  {
    icon: "/symbol.png",
    title: "Innovation centrée sur l'utilisateur",
    description:
      "Garder les besoins des utilisateurs finaux au premier plan pour créer des produits qui non seulement résolvent les problèmes mais dépassent également les attentes.",
    alt: "Symbol",
  },
  {
    icon: "/longitude.svg",
    title: "Leadership d'équipe",
    description:
      "Construire et responsabiliser des équipes interfonctionnelles pour atteindre des objectifs ambitieux.",
    alt: "Longitude",
  },
  {
    icon: "/balance-default.svg",
    title: "Agilité stratégique",
    description:
      "Équilibrer l'innovation avec une stratégie pratique pour naviguer dans une dynamique de marché complexe et saisir les opportunités émergentes.",
    alt: "Balance default",
  },
  {
    icon: "/book.svg",
    title: "Apprentissage continu",
    description:
      "Rester à la pointe des tendances en matière d'IA et de conception, en veillant à ce que mes équipes soient équipées pour relever les défis.",
    alt: "Book",
  },
];

export function PhilosophySection() {
  return (
    <SectionLayout badge="Unicorn 🦄" title="Ma philosophie." layoutStart>
      {data.map((item, index) => (
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
