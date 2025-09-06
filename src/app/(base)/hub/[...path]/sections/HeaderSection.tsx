import React from "react";
import { routes } from "@/data/route";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { PreviewContentType } from "@/types";
import { ResourceType } from "@/types/enum";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
  type,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
  type?: ResourceType;
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
      ctaButton={routes.contact.link}
      ctaButtonText="Obtenir 🦄"
    />
  );
}
