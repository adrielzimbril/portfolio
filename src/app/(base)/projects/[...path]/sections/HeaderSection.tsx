import React from "react";
import { routes } from "@/data/route";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { DEFAULT_TAG_COLOR } from "@/types/default";
import { PreviewContentType } from "@/types/enum";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
  projectLink,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
  projectLink: string;
}) {
  return (
    <ResourceHeaderSection
      sectionClassName="md:w-[90%] mx-auto"
      previewContent={
        cover
          ? {
              type: PreviewContentType.IMAGE,
              src: cover,
              alt: title,
            }
          : undefined
      }
      mainTitle={title}
      description={description}
      tags={tags}
      ctaButton={{ text: "Voir le projet 🦄", href: projectLink }}
    />
  );
}
