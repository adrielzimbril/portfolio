import { ProjectCard } from "@/components/shared/pages/projects/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectPreview, ProjectsPreviewSectionProps } from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";

const config: ProjectsPreviewSectionProps = {
  allWide: false,
  wideCardsCount: 0,
  limit: 2,
};

export async function MoreInfoSection() {
  const { allWide, wideCardsCount, limit } = config;
  const projectData = (await getJsonDataCached(
    "projects",
    "personal"
  )) as ProjectPreview[];

  return (
    <SectionLayout title="Autres ressources." layoutStart>
      {projectData.map((project, index) => {
        if (limit && index >= limit!) return null;
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
