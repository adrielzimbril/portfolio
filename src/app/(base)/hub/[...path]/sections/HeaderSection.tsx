import React from "react";
import { routes } from "@/data/route";
import { HeaderSection as ResourceHeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { PreviewContentType } from "@/types";

export function HeaderSection({
  title,
  cover,
  description,
  tags,
}: {
  title: string;
  cover: string;
  description: string;
  tags: { name: string; color: string }[];
}) {
  return (
    <ResourceHeaderSection
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
      tags={tags}
      ctaButton={routes.contact.link}
    />
  );
}
