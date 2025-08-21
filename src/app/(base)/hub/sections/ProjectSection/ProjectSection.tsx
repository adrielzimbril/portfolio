import React, { JSX } from "react";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { routes } from "@/data/route";
import resourcesData from "@/data/personal/resources.json";

export const ProjectSection = (): JSX.Element => {
  return (
    <SectionLayout>
      {resourcesData.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </SectionLayout>
  );
};
