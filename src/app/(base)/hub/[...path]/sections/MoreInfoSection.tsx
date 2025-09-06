"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section-new";
import { Resource } from "@/module/content/types";

export function MoreInfoSection({ data }: { data: Resource[] }) {
  return (
    <CardPreviewSection title="Autres ressources.">
      {data.map((resource, index) => (
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
