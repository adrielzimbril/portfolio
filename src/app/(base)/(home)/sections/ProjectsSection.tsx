import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { cn } from "@/lib/utils";
import { Preview } from "@/components/shared/pages/resources/preview";

const projectData = [
  {
    id: 1,
    tags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    title: "Project title",
    categories: [
      {
        name: "SaaS 🦄",
        color: "bg-[#afffad]",
        colorCode: "#afffad",
        squircle: "squircle-[#afffad]",
      },
      {
        name: "Go To Market 🎯",
        color: "bg-[#ffe9ad]",
        colorCode: "#ffe9ad",
        squircle: "squircle-[#ffe9ad]",
      },
      {
        name: "Web Application 📝",
        color: "bg-[#ade9ff]",
        colorCode: "#ade9ff",
        squircle: "squircle-[#ade9ff]",
      },
      {
        name: "Design 🎨",
        color: "bg-[#f9f9f9]",
        colorCode: "#f9f9f9",
        squircle: "squircle-[#f9f9f9]",
      },
      {
        name: "Mobile App 📱",
        color: "bg-[#e2e4ff]",
        colorCode: "#e2e4ff",
        squircle: "squircle-[#e2e4ff]",
      },
    ],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos",
  },
  {
    id: 2,
    tags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    title: "Project title",
    categories: [
      {
        name: "SaaS 🦄",
        color: "bg-[#afffad]",
        colorCode: "#afffad",
        squircle: "squircle-[#afffad]",
      },
      {
        name: "Go To Market 🎯",
        color: "bg-[#ffe9ad]",
        colorCode: "#ffe9ad",
        squircle: "squircle-[#ffe9ad]",
      },
      {
        name: "Web Application 📝",
        color: "bg-[#ade9ff]",
        colorCode: "#ade9ff",
        squircle: "squircle-[#ade9ff]",
      },
      {
        name: "Design 🎨",
        color: "bg-[#f9f9f9]",
        colorCode: "#f9f9f9",
        squircle: "squircle-[#f9f9f9]",
      },
      {
        name: "Mobile App 📱",
        color: "bg-[#e2e4ff]",
        colorCode: "#e2e4ff",
        squircle: "squircle-[#e2e4ff]",
      },
    ],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos",
  },
  {
    id: 3,
    tags: ["Innovation", "Product Design"],
    title: "Vertical Project",
    categories: [
      {
        name: "Startup 🚀",
        color: "bg-[#ffadad]",
        colorCode: "#ffadad",
        squircle: "squircle-[#ffadad]",
      },
      {
        name: "Innovation 💡",
        color: "bg-[#adffff]",
        colorCode: "#adffff",
        squircle: "squircle-[#adffff]",
      },
    ],
    description:
      "This project shows how vertical layout works on larger screens",
    buttonText: "Voir plus",
  },
];

interface ProjectsSectionProps {
  /**
   * Number of cards to display in wide format on desktop
   * The others will be in vertical format (preview on top, info on bottom)
   * @default 0 - All cards in vertical format
   */
  wideCardsCount?: number;

  /**
   * Force all cards to be wide on desktop
   * @default false
   */
  allWide?: boolean;
}

export function ProjectsSection({
  wideCardsCount = 0,
  allWide = false,
}: ProjectsSectionProps) {
  return (
    <SectionLayout
      title="Projets"
      description="Chaque projet est une opportunité de transformer une idée en expérience réelle, avec un design qui séduit et une stratégie qui fonctionne."
      link={routes.projects.link}
      badge="Hub 🫶"
      asFade
    >
      {projectData.map((project, index) => {
        const isWide = allWide || index < wideCardsCount;

        return (
          <ProjectCard
            key={project.id}
            project={project}
            isWide={isWide}
            className={isWide ? "lg:col-span-2" : ""}
          />
        );
      })}
    </SectionLayout>
  );
}

interface ProjectCardProps {
  project: (typeof projectData)[0];
  isWide: boolean;
  className?: string;
}

function ProjectCard({ project, isWide, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl rounded-4sxl border-0 overflow-hidden",
        isWide && "md:flex-row",
        className
      )}
    >
      <CardContent
        className={cn(
          `flex flex-col px-6 md:px-8 py-8 md:py-10 gap-4 w-full`,
          isWide && "md:flex-row"
        )}
      >
        <Preview />
        <ProjectInfo project={project} isWide={isWide} />
      </CardContent>
    </Card>
  );
}

function ProjectInfo({
  project,
  isWide,
}: {
  project: (typeof projectData)[0];
  isWide: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 flex-1",
        !isWide && "w-full"
      )}
    >
      <div className="flex flex-col items-start gap-4 w-full">
        <ProjectTags tags={project.tags} />

        <ProjectTitle title={project.title} />

        <ProjectCategories categories={project.categories} />

        <ProjectDescription description={project.description} />
      </div>

      <ProjectButton buttonText={project.buttonText} />
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-start gap-[8px_8px] w-full">
      {tags.map((tag, index) => (
        <Badge key={index} className="squircle-white" variant="colored">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function ProjectTitle({ title }: { title: string }) {
  return <h3 className="relative capitalize">{title}</h3>;
}

function ProjectCategories({
  categories,
}: {
  categories: Array<{
    name: string;
    color: string;
    colorCode: string;
    squircle: string;
  }>;
}) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden">
      {categories.map((category, index) => (
        <Badge key={index} className={`${category.squircle}`} variant="colored">
          {category.name}
        </Badge>
      ))}
    </div>
  );
}

function ProjectDescription({ description }: { description: string }) {
  return (
    <div className="flex items-center">
      <p className="w-full relative text-[1.5rem] leading-[120%] font-medium text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function ProjectButton({ buttonText }: { buttonText: string }) {
  return (
    <Link href={routes.projects.link} asSquare whileTap size="xs" asIcon>
      <span className="flex items-center gap-1">
        {buttonText}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
