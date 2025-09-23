import React from "react";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectPreviewSection } from "./sections/ProjectPreviewSection";
import { ProjectPointsResearchSection } from "./sections/ProjectPointsResearchSection";
import { ProjectStatementSection } from "./sections/ProjectStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import {
  CardData,
  ProjectResearchSection,
} from "./sections/ProjectResearchSection";
import { ProjectResultSection } from "./sections/ProjectResultSection";
import { GoalResearchSection } from "./sections/GoalResearchSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { localeRedirect } from "@/module/i18n/routing";
import {
  getProjectWithAdjacent,
  getProjectBySlug,
} from "@/module/content/utils/lib/projects";
import { getLocale } from "next-intl/server";
import { routes } from "@/data/routes";
import { PageParams, PageType } from "@/types";
import { getImageUrl, getResourcesUrl } from "@/utils";

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;

  const locale = await getLocale();
  const project = await getProjectBySlug(slug, { locale });

  return {
    title: project?.title,
    description: project?.excerpt,
    openGraph: {
      title: project?.title,
      description: project?.excerpt,
      images: [
        getImageUrl(project?.image_big ?? ""),
        getResourcesUrl(
          PageType.PROJECT,
          `${slug}/opengraph-image?${new Date().getTime()}`
        ),
      ],
    },
  };
}

export default async function SubProject(props: {
  params: Promise<PageParams>;
}) {
  const { slug } = await props.params;

  const locale = await getLocale();

  const project = await getProjectWithAdjacent(slug, { locale });

  if (!project) {
    return localeRedirect({ href: routes.projects.link, locale });
  }

  const {
    title,
    created_at,
    tags,
    image_big,
    body,
    excerpt,
    project_link,
    date_project,
    categories,
    gallery,
    cardSectionDescription,
    cards,
    goalSectionDescription,
    goalSectionSubDescription,
    pointSectionDescription,
    points,
    statementSectionDescription,
    statements,
    previewSectionDescription,
    resultSectionDescription,
    results,
  } = project!.currentProject;
  return (
    <>
      <HeaderSection
        title={title}
        cover={image_big || ""}
        description={excerpt || ""}
        tags={categories}
        projectLink={project_link}
        pageViewsData={{ slug, locale }}
      />
      <ProjectDetailsSection
        content={body || ""}
        duration={date_project?.map((date) => date || null) || []}
        tags={tags}
      />
      {cardSectionDescription && cards && (
        <ProjectResearchSection
          cards={cards as CardData[]}
          cardSectionDescription={cardSectionDescription}
        />
      )}
      {goalSectionDescription && (
        <GoalResearchSection
          description={goalSectionDescription}
          subDescription={goalSectionSubDescription}
        />
      )}
      {statementSectionDescription && statements && (
        <ProjectStatementSection
          description={statementSectionDescription}
          statements={statements}
        />
      )}
      {pointSectionDescription && points && (
        <ProjectPointsResearchSection
          pointSectionDescription={pointSectionDescription}
          points={points}
        />
      )}
      {gallery && (
        <ProjectPreviewSection
          title={title}
          description={previewSectionDescription}
          gallery={gallery}
        />
      )}
      {resultSectionDescription && results && (
        <ProjectResultSection
          description={resultSectionDescription}
          results={results}
        />
      )}
      <MorePreviewSection data={project!.adjacentProjects} />
      <CallToAction isPage />
    </>
  );
}
