"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { getImageUrl } from "@/utils/base-url";
import { useTranslations } from "next-intl";

function PointCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="relative">{title}</h4>
      <p className="text-zinc-500">{description}</p>
    </div>
  );
}

export function ProjectPointsResearchSection({
  pointSectionDescription,
  points,
}: {
  pointSectionDescription: string;
  points: { title: string; description: string }[];
}) {
  const t = useTranslations();

  return (
    <>
      <SectionLayout
        title={t("projects.inner-page.project-points-research-section.title")}
        description={
          pointSectionDescription ||
          t("projects.inner-page.project-points-research-section.description")
        }
        //className="p-0"
        contentClassName="lg:max-w-[80%] items-start"
      >
        <EmojiPlaceholder
          src={getImageUrl("/image-989-1.png")}
          variant="squircle"
          unOrdered
        />

        <div className="flex flex-col gap-4 md:gap-6 md:max-w-lg">
          {points.map((point, index) => (
            <PointCard
              key={index}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
