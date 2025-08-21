import React, { JSX } from "react";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import resourcesData from "@/data/personal/resources.json";

export function ProjectSection() {
  return (
    <SectionLayout className="p-0">
      {resourcesData.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </SectionLayout>
  );
};
