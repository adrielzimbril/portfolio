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
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { localeRedirect } from "@/integrations/i18n/routing";
import {
  getProjectWithAdjacent,
  getProjectBySlug,
} from "@/integrations/content/lib/projects";
import { getLocale } from "next-intl/server";
import { routes } from "@/data/routes";
import { PageParams, PageType } from "@/types";
import { getImageUrl } from "@/utils/base-url";
import { metadata as baseMetadata } from "@/app/metadata";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Skeleton name="project-detail-header" loading={false}>
        <HeaderSection
          title={title}
          cover={image_big || ""}
          description={excerpt || ""}
          tags={categories}
          projectLink={project_link}
          pageViewsData={{ slug, locale }}
        />
      </Skeleton>
      <Skeleton name="project-detail-content" loading={false}>
        <ProjectDetailsSection
          content={body || ""}
          duration={date_project?.map((date) => date || null) || []}
          tags={tags}
          role={role}
        />
        <ReactionBar pageType={PageType.PROJECT} entityId={slug} variant="inline" className="max-w-4xl mx-auto my-12" />
      </Skeleton>
      {cardSectionDescription ||
        (cards && (
          <Skeleton name="project-detail-research" loading={false}>
            <ProjectResearchSection
              cards={cards as CardData[]}
              cardSectionDescription={cardSectionDescription}
            />
          </Skeleton>
        ))}
      {goalSectionDescription && (
        <Skeleton name="project-detail-goal" loading={false}>
          <GoalResearchSection
            description={goalSectionDescription}
            subDescription={goalSectionSubDescription}
          />
        </Skeleton>
      )}
      {statementSectionDescription && statements && (
        <Skeleton name="project-detail-statement" loading={false}>
          <ProjectStatementSection
            description={statementSectionDescription}
            statements={statements}
          />
        </Skeleton>
      )}
      {pointSectionDescription && points && (
        <Skeleton name="project-detail-points" loading={false}>
          <ProjectPointsResearchSection
            pointSectionDescription={pointSectionDescription}
            points={points}
          />
        </Skeleton>
      )}
      {gallery && (
        <Skeleton name="project-detail-preview" loading={false}>
          <ProjectPreviewSection
            title={title}
            description={previewSectionDescription}
            gallery={gallery}
          />
        </Skeleton>
      )}
      {resultSectionDescription && results && (
        <Skeleton name="project-detail-result" loading={false}>
          <ProjectResultSection
            description={resultSectionDescription}
            results={results}
          />
        </Skeleton>
      )}
      {project!.adjacentProjects.length > 0 && (
        <Skeleton name="project-detail-more" loading={false}>
          <MorePreviewSection data={project!.adjacentProjects} />
        </Skeleton>
      )}
      <Skeleton name="project-detail-cta" loading={false}>
        <CallToAction isPage />
      </Skeleton>
    </>
  );
}
