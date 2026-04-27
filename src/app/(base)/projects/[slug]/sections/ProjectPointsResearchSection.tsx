"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { useTranslations } from "use-intl";
import { Badge } from "@/components/ui/badge";

function PointCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center md:justify-start gap-2 md:gap-6">
        <h4 className="relative hidden md:block">{title}</h4>
        <Badge size="lg" className="md:hidden">
          {title} ✒️
        </Badge>
      </div>
      <p className="text-b-white-invert-thr">{description}</p>
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
        contentClassName="justify-center lg:max-w-[80%] items-center"
      >
        <EmojiPlaceholder
          //src={getImageUrl(getEmojiHub("✏️", "apple"))}
          //src={getImageUrl(getEmojiHub("✍🏻", "fluent", "anim"))}
          src={{ emoji: "✍🏻" }}
          variant="squircle"
          isMobileShowed
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
