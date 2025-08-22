import React from "react";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  Resource,
  ResourceCard,
} from "@/components/shared/pages/resources/card";
import resourcesData from "@/data/personal/resources.json";

const data = resourcesData as Resource[];

export function ResourcesSection() {
  return (
    <SectionLayout
      title="Ressources"
      description="Des guides, modèles et conseils pour maîtriser l'UI/UX, les design systems et Figma, et créer des produits qui donnent envie d'être utilisés."
      link={routes.projects.link}
      badge="Hub 🫶"
    >
      {data.map((resource) => (
        <ResourceCard key={resource.id} details={resource} />
      ))}
    </SectionLayout>
  );
}
