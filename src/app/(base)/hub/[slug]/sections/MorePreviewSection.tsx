"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { Resource } from "@/integrations/content/types";
import { useTranslations } from "use-intl";

export function MorePreviewSection({ data }: { data: Resource[] }) {
  const t = useTranslations();

  return (
    <CardPreviewSection title={t("hub.inner-page.more-preview-section.title")}>
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
          avatars={resource.studentsProfileImage}
          userCount={resource.studentsNumber}
          reactionsPosition="bottom"
        />
      ))}
    </CardPreviewSection>
  );
}
