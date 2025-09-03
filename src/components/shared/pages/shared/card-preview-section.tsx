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
  pageId?: number;
  renderItem: (item: PreviewItem, index: number) => React.ReactNode;
}

export function CardPreviewSection({
  title,
  dataPath,
  subPath,
  limit = 2,
  pageId,
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

  // if pageId is provided, filter out the current page data
  const filteredData = pageId
    ? dataSource.filter((item) => item.id !== pageId)
    : dataSource;

  const limitedData = filteredData.slice(0, limit);

  return (
    <SectionLayout title={title} layoutStart>
      {limitedData.map(renderItem)}
    </SectionLayout>
  );
}
