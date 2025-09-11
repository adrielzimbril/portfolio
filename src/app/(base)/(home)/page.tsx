import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { ThoughtsSection } from "./sections/ThoughtsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { Seo } from "@/components/shared/_layouts/_seo";
import { getPathUrl } from "@/utils";
import { routes } from "@/data/route";

export default function Home() {
  const path = routes.home.link;
  const url = getPathUrl(path ?? "/");
  return (
    <>
      <Seo title="Home" description="Home page" url={url} />
      <HeaderSection />
      <ResourcesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ThoughtsSection />
      <CallToAction />
    </>
  );
}
