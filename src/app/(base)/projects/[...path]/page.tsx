import React from "react";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { HeaderSection } from "./sections/HeaderSection";
import { InsightsSection } from "./sections/InsightsSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { ProblemStatementSection } from "./sections/ProblemStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import {
  CardData,
  ProjectGallerySection,
} from "./sections/ProjectGallerySection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection";
import { UserResearchSection } from "./sections/UserResearchSection";
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
    //return localeRedirect({ href: routes.projects.link, locale });
    logger.error(`Project not found for slug: ${slug}`);
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
    cardSectionDescription,
    cards,
    goalSectionDescription,
    goalSectionSubDescription,
  } = post!.currentProject;
  return (
    <>
      <HeaderSection
        title={title}
        cover={image_big || ""}
        description={excerpt || ""}
        tags={categories}
        projectLink={project_link || ""}
      />
      <ProjectDetailsSection
        content={body || ""}
        duration={date_project?.map((date) => date || "") || []}
        tags={tags}
      />
      {cardSectionDescription && cards && (
        <ProjectGallerySection
          cards={cards as CardData[]}
          cardSectionDescription={cardSectionDescription}
        />
      )}
      {goalSectionDescription && (
        <UserResearchSection
          description={goalSectionDescription}
          subDescription={goalSectionSubDescription}
        />
      )}
      <ProblemStatementSection />
      <IntroductionSection />
      <InsightsSection />
      <ProjectOverviewSection />
      <MorePreviewSection data={post!.adjacentProjects} />
      <CallToAction isPage />
    </>
  );
}
