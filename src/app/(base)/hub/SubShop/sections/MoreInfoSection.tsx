"use client";
import React, { useEffect, useState } from "react";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  ResourcePreview,
  PreviewCardContainerSectionProps,
} from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export function MoreInfoSection() {
  const [dataSource, setDataSource] = useState<ResourcePreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "resources",
        "personal"
      )) as ResourcePreview[];
      setDataSource(data);
    };
    loadInitialData();
  }, []);

  const { limit } = config;

  return (
    <SectionLayout title="Autres ressources." layoutStart>
      {dataSource.slice(0, limit!).map((resource, index) => {
        return <ResourceCard key={index} details={resource} />;
      })}
    </SectionLayout>
  );
}
