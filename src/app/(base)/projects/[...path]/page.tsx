import React from "react";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { HeaderSection } from "./sections/HeaderSection";
import { InsightsSection } from "./sections/InsightsSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { ProblemStatementSection } from "./sections/ProblemStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection";
import { UserResearchSection } from "./sections/UserResearchSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { localeRedirect } from "@/module/i18n/routing";
import { getProjectWithAdjacent } from "@/module/content/utils/lib/projects";
import { getActivePathFromUrlParam } from "@/utils/content";
import { setRequestLocale } from "next-intl/server";
import { routes } from "@/data/route";
import { PageParams } from "@/types";

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

  const { title, created_at, tags, image_big, body } = post.currentProject;
  return (
    <>
      <HeaderSection />
      <ProjectDetailsSection />
      <ProjectGallerySection />
      <UserResearchSection />
      <ProblemStatementSection />
      <IntroductionSection />
      <InsightsSection />
      <ProjectOverviewSection />
      <MorePreviewSection data={post.adjacentProjects} />
      <CallToAction isPage />
    </>
  );
}
