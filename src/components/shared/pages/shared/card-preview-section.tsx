"use client";
import React, { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getJsonDataCached } from "@/utils";
import { PreviewItem } from "@/types";

interface CardPreviewSectionProps {
  title: string;
  dataPath: string;
  subPath: string;
  limit?: number;
  renderItem: (item: PreviewItem, index: number) => React.ReactNode;
}

export function CardPreviewSection({
  title,
  dataPath,
  subPath,
  limit = 2,
  renderItem,
}: CardPreviewSectionProps) {
  const [dataSource, setDataSource] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        dataPath,
        subPath
      )) as PreviewItem[];
      setDataSource(data);
    };
    loadInitialData();
  }, [dataPath, subPath]);

  return (
    <SectionLayout title={title} layoutStart>
      {dataSource.slice(0, limit).map(renderItem)}
    </SectionLayout>
  );
}
