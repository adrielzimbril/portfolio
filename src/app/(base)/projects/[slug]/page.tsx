import React from "react";
import { MorePreviewSection } from "@/app/(base)/projects/[slug]/sections/MorePreviewSection";
import { HeaderSection } from "@/app/(base)/projects/[slug]/sections/HeaderSection";
import { ProjectPreviewSection } from "@/app/(base)/projects/[slug]/sections/ProjectPreviewSection";
import { ProjectPointsResearchSection } from "@/app/(base)/projects/[slug]/sections/ProjectPointsResearchSection";
import { ProjectStatementSection } from "@/app/(base)/projects/[slug]/sections/ProjectStatementSection";
import { ProjectDetailsSection } from "@/app/(base)/projects/[slug]/sections/ProjectDetailsSection";
import {
  CardData,
  ProjectResearchSection,
} from "@/app/(base)/projects/[slug]/sections/ProjectResearchSection";
import { ProjectResultSection } from "@/app/(base)/projects/[slug]/sections/ProjectResultSection";
import { GoalResearchSection } from "@/app/(base)/projects/[slug]/sections/GoalResearchSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { localeRedirect } from "@/integrations/i18n/routing";
import {
  getProjectWithAdjacent,
  getProjectBySlug,
} from "@/integrations/content/lib/projects";
import { getLocale } from "next-intl/server";
import { routes } from "@/data/routes";
import { PageParams } from "@/types";
import { getImageUrl } from "@/utils/base-url";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;

  const locale = await getLocale();
  const project = await getProjectBySlug(slug, { locale });

  return {
    title: project?.title,
    description: project?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: project?.title,
      description: project?.excerpt,
      images: [getImageUrl(project?.image_big ?? "opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: project?.title,
      description: project?.excerpt,
      images: [getImageUrl(project?.image_big ?? "opengraph-image.png")],
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
    role,
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
        slug={slug}
      />
      <ProjectDetailsSection
        content={body || ""}
        duration={date_project?.map((date) => date || null) || []}
        tags={tags}
        role={role}
      />
      {cardSectionDescription ||
        (cards && (
          <ProjectResearchSection
            cards={cards as CardData[]}
            cardSectionDescription={cardSectionDescription}
          />
        ))}
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
      {project!.adjacentProjects.length > 0 && (
        <MorePreviewSection data={project!.adjacentProjects} />
      )}
      <CallToAction isPage />
    </>
  );
}
