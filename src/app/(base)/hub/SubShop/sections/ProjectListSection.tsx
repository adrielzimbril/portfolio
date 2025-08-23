import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResourceCard } from "@/components/shared/pages/resources/page/card";
import { SectionLayout } from "@/components/shared/sections/layout";

export function ProjectListSection() {
  const statsData = [
    {
      icon: "/image-989.png",
      number: "30",
      description: "Interviews téléphonique",
    },
    {
      icon: "/image-1001-1.png",
      number: "30",
      description: "Interviews téléphonique",
    },
    {
      icon: "/image-657.png",
      number: "30",
      description: "Interviews téléphonique",
    },
  ];

  return (
    <>
      <SectionLayout
        title="Chiffres clés"
        description="C'est désormais un sujet vaste et cela varie selon les projets. Il peut s'agir d'un entretien avec un utilisateur, d'enquêtes ou même d'une réunion avec les parties prenantes"
        className="p-0"
        contentClassName="md:grid-cols-3"
      >
        {statsData.map((stat, index) => (
          <ResourceCard key={index} details={stat} />
        ))}
      </SectionLayout>
    </>
  );
}
