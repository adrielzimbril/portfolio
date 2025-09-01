import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { ResourcePreview } from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";
import { PreviewCardContainerSectionProps } from "@/types/type";

const config: PreviewCardContainerSectionProps = {
  limit: 4,
};

export async function ResourcesSection() {
  const { limit } = config;
  const resourceData = (await getJsonDataCached(
    "resources",
    "personal"
  )) as ResourcePreview[];

  return (
    <SectionLayout
      title="Ressources"
      description="Des guides, modèles et conseils pour maîtriser l'UI/UX, les design systems et Figma, et créer des produits qui donnent envie d'être utilisés."
      link={routes.projects.link}
      badge="Hub 🫶"
    >
      {resourceData.map((resource, index) => {
        if (limit !== undefined && index >= limit) return null;
        return <ResourceCard key={resource.id} details={resource} />;
      })}
    </SectionLayout>
  );
}
