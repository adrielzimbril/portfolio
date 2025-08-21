import React from "react";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";

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
    tags: [
      "Innovation",
      "Product Design",
      "Web Application",
      "Mobile App",
      "Planification de la feuille de route",
    ],
    title: "Vertical Project",
    categories: [
      {
        name: "Startup 🚀",
        color: "bg-[#ffadad]",
        colorCode: "#ffadad",
        squircle: "squircle-[#ffadad]",
      },
      {
        name: "Go To Market 🎯",
        color: "bg-[#ffe9ad]",
        colorCode: "#ffe9ad",
        squircle: "squircle-[#ffe9ad]",
      },
      {
        name: "Innovation 💡",
        color: "bg-[#adffff]",
        colorCode: "#adffff",
        squircle: "squircle-[#adffff]",
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
  wideCardsCount: number;

  /**
   * Force all cards to be wide on desktop
   * @default false
   */
  allWide?: boolean;
}

const config: ProjectsSectionProps = {
  allWide: false,
  wideCardsCount: 1,
};

export function ProjectsSection() {
  const { allWide, wideCardsCount } = config;
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
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
