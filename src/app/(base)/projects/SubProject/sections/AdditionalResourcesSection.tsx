"use client";
import React, { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview, PreviewCardContainerSectionProps } from "@/types";
import { getJsonDataCached } from "@/utils";
import logger from "@/utils/logger";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export function AdditionalResourcesSection() {
  const [dataSource, setDataSource] = useState<ProjectPreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "projects",
        "personal"
      )) as ProjectPreview[];
      setDataSource(data);
    };
    loadInitialData();
  }, []);

  const { limit } = config;

  return (
    <>
      <SectionLayout title="More works." layoutStart>
        {dataSource.slice(0, limit!).map((project, index) => {
          return <ProjectCard key={index} details={project} />;
        })}
      </SectionLayout>
    </>
  );
}
