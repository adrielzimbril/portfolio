"use client";
import React, { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getJsonDataCached } from "@/utils";
import { PreviewItem } from "@/types";

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
