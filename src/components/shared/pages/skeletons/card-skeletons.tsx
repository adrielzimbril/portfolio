import { Skeleton } from "@/components/ui/skeleton";

export function ResourceCardSkeleton() {
  return <Skeleton name="resource-card" className="w-full h-80" />;
}

export function QuestCardSkeleton() {
  return <Skeleton name="quest-card" className="w-full h-80" />;
}

export function TalkCardSkeleton() {
  return <Skeleton name="talk-card" className="w-full h-80" />;
}

export function ThoughtCardSkeleton() {
  return <Skeleton name="thought-card" className="w-full h-80" />;
}

export function ProjectCardSkeleton({ isWide = false }: { isWide?: boolean }) {
  return (
    <Skeleton
      name={isWide ? "project-card-wide" : "project-card"}
      className={isWide ? "w-full h-64 md:col-span-2" : "w-full h-96"}
    />
  );
}

export function InnerStatementCardSkeleton() {
  return <Skeleton name="inner-statement-card" className="w-full h-32" />;
}
