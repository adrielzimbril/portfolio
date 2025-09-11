"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";

interface CardPreviewSectionProps {
  title: string;
  limit?: number;
  pageId?: number;
  children: React.ReactNode;
}

export function CardPreviewSection({
  title,
  limit = 2,
  pageId,
  children,
}: CardPreviewSectionProps) {
  return (
    <SectionLayout title={title} layoutStart>
      {children}
    </SectionLayout>
  );
}
