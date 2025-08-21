import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";

const data = [
  {
    icon: "/playing-cards.svg",
    title: "Pour les entreprises",
    description:
      "Je conçois des interfaces conviviales et précieuses pour les clients et faciles à mettre en œuvre pour les ingénieurs.",
  },
  {
    icon: "/symbol-1.svg",
    title: "Pour les startups",
    description:
      "J'aide à identifier le problème et à concevoir un MVP. Je vous conseille sur les outils de développement .",
  },
  {
    icon: "/shape.svg",
    title: "Pour les équipes produits",
    description:
      "Je conçois des expériences de croissance et aide votre équipe à envisager les défis différemment pour créer un meilleur produit.",
  },
];

export function CraftSection() {
  return (
    <SectionLayout
      badge="Votre partenaire 🫶"
      title="Ce que je peux faire pour vous."
      layoutStart
    >
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
