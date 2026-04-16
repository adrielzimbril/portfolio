import React from "react";
import { Suspense } from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "@/app/(base)/(home)/sections/HeaderSection";
import { TalksSection } from "@/app/(base)/(home)/sections/TalksSection";
import { QuestsSection } from "@/app/(base)/(home)/sections/QuestsSection";
import { ProjectsSection } from "@/app/(base)/(home)/sections/ProjectsSection";
import { ResourcesSection } from "@/app/(base)/(home)/sections/ResourcesSection";
import { ThoughtsSection } from "@/app/(base)/(home)/sections/ThoughtsSection";
import { TestimonialsSection } from "@/app/(base)/(home)/sections/TestimonialsSection";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { siteConfig } from "@/data/config";
import {
  DefaultSectionSkeleton,
  ProjectsSectionSkeleton,
} from "@/components/shared/pages/skeletons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("home.title"),
    description: t("home.description"),
    keywords: t("home.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("home.title"),
      description: t("home.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("home.title"),
      description: t("home.description"),
    },
  };

  return metadata;
}

export default function Home() {
  const showed = siteConfig.home.sections.showed;

  return (
    <>
      <HeaderSection />
      {showed.talks && (
        <Suspense fallback={<DefaultSectionSkeleton count={2} />}>
          <TalksSection />
        </Suspense>
      )}
      {showed.quests && (
        <Suspense fallback={<DefaultSectionSkeleton count={2} />}>
          <QuestsSection />
        </Suspense>
      )}
      {showed.resources && (
        <Suspense fallback={<DefaultSectionSkeleton count={2} />}>
          <ResourcesSection />
        </Suspense>
      )}
      {showed.projects && (
        <Suspense fallback={<ProjectsSectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
      )}
      {showed.testimonials && <TestimonialsSection />}
      {showed.thoughts && (
        <Suspense fallback={<DefaultSectionSkeleton count={2} />}>
          <ThoughtsSection />
        </Suspense>
      )}
      <CallToAction />
    </>
  );
}
