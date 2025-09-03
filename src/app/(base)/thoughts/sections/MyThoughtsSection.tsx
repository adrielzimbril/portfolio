"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { ThoughtPreview } from "@/types";

export function MyThoughtsSection() {
  return (
    <LoadMoreSection
      dataPath="thoughts"
      subPath="personal"
      renderItem={(item) => (
        <ThoughtCard key={item.id} details={item as ThoughtPreview} />
      )}
    />
  );
}
