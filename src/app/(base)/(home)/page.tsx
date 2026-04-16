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
import { Skeleton } from "@/components/ui/skeleton";

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
      <Skeleton name="home-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      {showed.talks && (
        <Suspense fallback={<Skeleton name="home-talks" className="w-full h-80" />}>
          <Skeleton name="home-talks" loading={false}>
            <TalksSection />
          </Skeleton>
        </Suspense>
      )}
      {showed.quests && (
        <Suspense fallback={<Skeleton name="home-quests" className="w-full h-80" />}>
          <Skeleton name="home-quests" loading={false}>
            <QuestsSection />
          </Skeleton>
        </Suspense>
      )}
      {showed.resources && (
        <Suspense fallback={<Skeleton name="home-resources" className="w-full h-80" />}>
          <Skeleton name="home-resources" loading={false}>
            <ResourcesSection />
          </Skeleton>
        </Suspense>
      )}
      {showed.projects && (
        <Suspense fallback={<Skeleton name="home-projects" className="w-full h-[500px]" />}>
          <Skeleton name="home-projects" loading={false}>
            <ProjectsSection />
          </Skeleton>
        </Suspense>
      )}
      {showed.testimonials && (
        <Skeleton name="home-testimonials" loading={false}>
          <TestimonialsSection />
        </Skeleton>
      )}
      {showed.thoughts && (
        <Suspense fallback={<Skeleton name="home-thoughts" className="w-full h-80" />}>
          <Skeleton name="home-thoughts" loading={false}>
            <ThoughtsSection />
          </Skeleton>
        </Suspense>
      )}
      <Skeleton name="home-cta" loading={false}>
        <CallToAction />
      </Skeleton>
    </>
  );
}
