"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { ResourcePreview } from "@/types";

export function MyHubSection() {
  return (
    <LoadMoreSection
      dataPath="resources"
      subPath="personal"
      renderItem={(item) => (
        <ResourceCard key={item.id} details={item as ResourcePreview} />
      )}
    />
  );
}
