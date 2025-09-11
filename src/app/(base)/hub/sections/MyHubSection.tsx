"use client";
import { useState, useEffect } from "react";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import logger from "@/utils/logger";
import { Resource } from "@/module/content/types";
import { getAllResources } from "@/module/content/utils/lib/resources";

export function MyHubSection() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getAllResources();
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: resources,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={resources.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {data.map((item, index) => (
        <ResourceCard
          key={index}
          title={item.title}
          slug={item.slug}
          cover={item.cover}
          type={item.type}
          tags={item.tags}
          description={item.excerpt}
          features={item.features ?? []}
          avatars={item.studentsProfilImage}
          userCount={item.studentsNumber}
        />
      ))}
    </LoadMoreSection>
  );
}
