import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/projects/details";
import { cn } from "@/lib/utils";

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  categories: {
    name: string;
    squircle: string;
    color?: string;
    colorCode?: string;
  }[];
  buttonText: string;
}

export interface CardInfoProps {
  details: Project;
  isWide?: boolean;
}

export function ProjectCard({ details, isWide }: CardInfoProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full",
        isWide && "md:flex-row md:col-span-2"
      )}
    >
      <CardContent
        className={cn(
          `flex flex-col px-6 md:px-8 py-8 md:py-10 gap-4 h-full w-full`,
          isWide && "md:flex-row"
        )}
      >
        <CardPreview isWide={isWide} />
        <CardInfo details={details} isWide={isWide} />
      </CardContent>
    </Card>
  );
}
