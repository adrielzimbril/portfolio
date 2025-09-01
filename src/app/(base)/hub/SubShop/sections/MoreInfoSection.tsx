import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  ResourcePreview,
  ProjectPreviewCardContainerSectionProps,
} from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";

const config: ProjectPreviewCardContainerSectionProps = {
  limit: 2,
};

export async function MoreInfoSection() {
  const { limit } = config;
  const resourceData = (await getJsonDataCached(
    "resources",
    "personal"
  )) as ResourcePreview[];

  return (
    <SectionLayout title="Autres ressources." layoutStart>
      {resourceData.map((resource, index) => {
        if (limit && index >= limit!) return null;

        return <ResourceCard key={resource.id} details={resource} />;
      })}
    </SectionLayout>
  );
}
