"use client";
import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllResources } from "@/module/content/utils/lib/resources";
import { Resource } from "@/module/content/types";
import logger from "@/utils/logger";
import { useLocale, useTranslations } from "use-intl";

const config: PreviewCardContainerSectionProps = {
  limit: 4,
};

export function ResourcesSection() {
  const t = useTranslations();
  const locale = useLocale();

  const { limit } = config;
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getAllResources({ limit: limit, locale });
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, [limit, locale]);

  return (
    <SectionLayout
      title={t("common.page-sections.hub.title")}
      description={t("common.page-sections.hub.description")}
      link={routes.hub.link}
      badge={t("common.page-sections.hub.badge")}
    >
      {resources.map((resource, index) => {
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
