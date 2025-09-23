"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";

interface CardPreviewSectionProps {
  title: string;
  children: React.ReactNode;
}

export function CardPreviewSection({
  title,
  children,
}: CardPreviewSectionProps) {
  return (
    <SectionLayout title={title} layoutStart>
      {children}
    </SectionLayout>
  );
}
