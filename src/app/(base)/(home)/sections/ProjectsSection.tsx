import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { getJsonDataCached } from "@/utils/get-json-data";
import { ProjectPreview } from "@/types";
import { ProjectsPreviewSectionProps } from "@/types/type";

const config: ProjectsPreviewSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 3,
};

export async function ProjectsSection() {
  const { allWide, wideCardsCount, limit } = config;
  const projectData = (await getJsonDataCached(
    "projects",
    "personal"
  )) as ProjectPreview[];

  return (
    <SectionLayout
      title="Projets"
      description="Chaque projet est une opportunité de transformer une idée en expérience réelle, avec un design qui séduit et une stratégie qui fonctionne."
      link={routes.projects.link}
      badge="Hub 🫶"
      asFade
    >
      {projectData.map((project, index) => {
        if (limit && index >= limit) return null;
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
