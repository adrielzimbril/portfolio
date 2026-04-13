import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreviewCardContainerSectionProps } from "@/types/type";
import { getAllProjects } from "@/integrations/content/lib";
import { cn } from "@/utils/utils";;
import { getLocale, getTranslations } from "next-intl/server";

const config: ProjectPreviewCardContainerSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 3,
};

export async function ProjectsSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const { allWide, wideCardsCount, limit } = config;
  const projects = await getAllProjects({ limit, locale });

  return (
    <SectionLayout
      title={t("common.page-sections.projects.title")}
      description={t("common.page-sections.projects.description")}
      link={routes.projects.link}
      badge={t("common.page-sections.projects.badge")}
    >
      {projects.map((project, index) => {
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <div
            key={index}
            className={cn(
              "size-full",
              isWide ? "md:flex-row md:col-span-2" : "md:flex-col md:col-span-1"
            )}
          >
            <ProjectCard
              title={project.title}
              cover={project.image_thumbnail}
              description={project.excerpt || ""}
              slug={project.slug}
              tags={project.tags}
              categories={project.categories}
              isWide={isWide}
            />
          </div>
        );
      })}
    </SectionLayout>
  );
}
