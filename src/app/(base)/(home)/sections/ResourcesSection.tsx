"use client";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllResources } from "@/module/content/utils/lib/resources";
import { Resource } from "@/module/content/types";
import logger from "@/utils/logger";

const config: PreviewCardContainerSectionProps = {
  limit: 4,
};

export function ResourcesSection() {
  const { limit } = config;
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getAllResources({ limit: limit });
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, []);

  return (
    <SectionLayout
      title="Ressources"
      description="Des guides, modèles et conseils pour maîtriser l'UI/UX, les design systems et Figma, et créer des produits qui donnent envie d'être utilisés."
      link={routes.hub.link}
      badge="Hub 🫶"
    >
      {resources.map((resource, index) => {
        if (limit !== undefined && index >= limit) return null;
        return (
          <ResourceCard
            key={index}
            title={resource.title}
            cover={resource.cover}
            slug={resource.slug}
            type={resource.type}
            tags={resource.tags}
            description={resource.excerpt}
            features={resource.features ?? []}
            avatars={resource.studentsProfilImage}
            userCount={resource.studentsNumber}
          />
        );
      })}
    </SectionLayout>
  );
}
