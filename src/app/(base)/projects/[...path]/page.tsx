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
import { getProjectWithAdjacent } from "@/module/content/utils/lib/projects";
import { getActivePathFromUrlParam } from "@/utils/content";
import { setRequestLocale } from "next-intl/server";
import { routes } from "@/data/route";
import { PageParams } from "@/types";
import logger from "@/utils/logger";

export default async function SubProject(props: {
  params: Promise<PageParams>;
}) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

  const slug = getActivePathFromUrlParam(path);
  const post = await getProjectWithAdjacent(slug, { locale });

  if (!post) {
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
  } = post!.currentProject;
  return (
    <>
      <HeaderSection
        title={title}
        cover={image_big || ""}
        description={excerpt || ""}
        tags={categories}
        projectLink={project_link}
      />
      <ProjectDetailsSection
        content={body || ""}
        duration={date_project?.map((date) => date || "") || []}
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
      <MorePreviewSection data={post!.adjacentProjects} />
      <CallToAction isPage />
    </>
  );
}
