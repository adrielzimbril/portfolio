import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { getAllResources } from "@/integrations/content/lib/resources";
import { getLocale, getTranslations } from "next-intl/server";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export async function ResourcesSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const { limit } = config;
  const resources = await getAllResources({ limit, locale });

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
            avatars={resource.studentsProfileImage}
            userCount={resource.studentsNumber}
          />
        );
      })}
    </SectionLayout>
  );
}
