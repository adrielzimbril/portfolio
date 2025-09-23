"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getImageUrl } from "@/utils/base-url";
import Image from "next/image";
import { useTranslations } from "use-intl";

export function ProjectPreviewSection({
  title,
  description,
  gallery,
}: {
  title: string;
  description?: string;
  gallery: string[];
}) {
  const t = useTranslations();

  return (
    <>
      <SectionLayout
        id="gallery-section"
        title={t("projects.inner-page.project-preview-section.title")}
        description={
          description ||
          t("projects.inner-page.project-preview-section.description")
        }
        //className="p-0"
        contentClassName="lg:max-w-[80%] items-start"
        isFlex
      >
        <GallerySection title={title} gallery={gallery} />
      </SectionLayout>
    </>
  );
}

function GallerySection({
  title,
  gallery,
}: {
  title: string;
  gallery: string[];
}) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 mx-auto [&>img:last-child]:mb-0">
      {gallery.map((image) => (
        <Image
          key={image}
          className="w-full h-auto rounded-lg pointer-events-none mb-6 md:mb-12"
          src={getImageUrl(image)}
          width={2000}
          height={2000}
          alt={title}
        />
      ))}
    </div>
  );
}
