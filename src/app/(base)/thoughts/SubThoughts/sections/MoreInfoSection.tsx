"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { ThoughtPreview } from "@/types";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";

export function MoreInfoSection() {
  return (
    <CardPreviewSection
      title="Autres articles."
      dataPath="thoughts"
      subPath="personal"
      renderItem={(thought, index) => (
        <ThoughtCard key={index} details={thought as ThoughtPreview} />
      )}
    />
  );
}
