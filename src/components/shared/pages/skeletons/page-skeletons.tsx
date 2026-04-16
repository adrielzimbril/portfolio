import { Skeleton } from "@/components/ui/skeleton";

/**
 * These components now act as placeholders that Boneyard-js will fill 
 * with pixel-perfect bones captured from the real UI.
 */

export function HomePageSkeleton() {
  return <Skeleton name="home-page" className="w-full min-h-screen" />;
}

export function ListingPageSkeleton({
  kind,
}: {
  kind: string;
}) {
  return <Skeleton name={`${kind}-listing`} className="w-full min-h-screen" />;
}

export function ResourceDetailPageSkeleton() {
  return <Skeleton name="resource-detail" className="w-full min-h-screen" />;
}

export function QuestDetailPageSkeleton() {
  return <Skeleton name="quest-detail" className="w-full min-h-screen" />;
}

export function ThoughtDetailPageSkeleton() {
  return <Skeleton name="thought-detail" className="w-full min-h-screen" />;
}

export function ProjectDetailPageSkeleton() {
  return <Skeleton name="project-detail" className="w-full min-h-screen" />;
}

export function FormPageSkeleton({
  variant = "default",
}: {
  variant?: "default" | "newsletter" | "contact";
}) {
  return <Skeleton name={`form-${variant}`} className="w-full min-h-screen" />;
}

export function LoadMoreCardsSkeleton({
  kind,
}: {
  kind: string;
}) {
  return <Skeleton name={`${kind}-load-more`} className="w-full h-40" />;
}

export function DefaultSectionSkeleton() {
  return <Skeleton name="default-section" className="w-full h-96" />;
}

export function ProjectsSectionSkeleton() {
  return <Skeleton name="projects-section" className="w-full h-[500px]" />;
}
