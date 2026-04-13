"use client";
import { Post, Resource, Project } from "@/integrations/content/types";
import { ResourceSection } from "@/components/shared/pages/shared/resource-content";
import { PageType } from "@/types";

interface ResourceWrapperProps {
  initialData: Project[] | Post[] | Resource[];
  type: PageType;
}

export function ResourceWrapper({ initialData, type }: ResourceWrapperProps) {
  return <ResourceSection data={initialData} type={type} />;
}
