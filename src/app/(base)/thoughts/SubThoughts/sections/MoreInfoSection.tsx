"use client";
import { useState, useEffect } from "react";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ThoughtPreview } from "@/types";
import { getJsonDataCached } from "@/utils/get-json-data";
import { PreviewCardContainerSectionProps } from "@/types/type";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export function MoreInfoSection() {
  const [dataSource, setDataSource] = useState<ThoughtPreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "thoughts",
        "personal"
      )) as ThoughtPreview[];
      setDataSource(data);
    };
    loadInitialData();
  }, []);

  const { limit } = config;

  return (
    <SectionLayout title="Autres articles" layoutStart>
      {dataSource.slice(0, limit!).map((thought, index) => {
        return <ThoughtCard key={index} details={thought} />;
      })}
    </SectionLayout>
  );
}
