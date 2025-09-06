"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section-new";
import logger from "@/utils/logger";
import { Resource } from "@/module/content/types";
import { useState, useEffect } from "react";
import { getAllResources } from "@/module/content/utils/lib/resources";

export function MoreInfoSection() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getAllResources({ limit: 2 });
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, []);

  return (
    <CardPreviewSection title="Autres ressources.">
      {resources.map((resource, index) => (
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
      ))}
    </CardPreviewSection>
  );
}
