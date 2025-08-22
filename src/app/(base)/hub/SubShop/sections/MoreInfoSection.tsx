import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import projectData from "@/data/personal/projects.json";

interface ProjectsSectionProps {
  /**
   * Number of cards to display in wide format on desktop
   * The others will be in vertical format (preview on top, info on bottom)
   * @default 0 - All cards in vertical format
   */
  wideCardsCount: number;

  /**
   * Force all cards to be wide on desktop
   * @default false
   */
  allWide?: boolean;

  /**
   * Number of cards to display
   * @default 0 - All cards
   */
  limit?: number;
}

const config: ProjectsSectionProps = {
  allWide: false,
  wideCardsCount: 0,
  limit: 2,
};

export function MoreInfoSection() {
  const { allWide, wideCardsCount, limit } = config;
  return (
    <SectionLayout title="Autres ressources." layoutStart>
      {projectData.map((project, index) => {
        if (limit && index >= limit) return null;
        const isWide = allWide || index < wideCardsCount;

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
