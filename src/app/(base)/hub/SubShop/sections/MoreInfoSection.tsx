"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { ResourcePreview } from "@/types";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";

export function MoreInfoSection() {
  return (
    <CardPreviewSection
      title="Autres ressources."
      dataPath="resources"
      subPath="personal"
      renderItem={(resource, index) => (
        <ResourceCard key={index} details={resource as ResourcePreview} />
      )}
    />
  );
}
