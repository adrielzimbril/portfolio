import React from "react";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";

const resourcesData = [
  {
    id: 1,
    title: "Project title",
    icon: "/bold-duotone---school---book.png",
    iconAlt: "Bold duotone school",
    primaryTag: "E-book 📕",
    tags: ["Saas", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 7-30 Days\n⚡ Level: from 0 to PRO\n🎁 Figma files, extra lessons, certificate, community…",
    avatars: [
      {
        src: ".//content.png",
        bg: "bg-avatar-user-squareamlie-laurent-color-background",
      },
      {
        src: ".//content-1.png",
        bg: "bg-avatar-user-squaresienna-hewitt-neutral-background",
      },
      {
        src: ".//content-2.png",
        bg: "bg-avatar-user-squareammar-foley-color-background",
      },
      {
        src: ".//content-3.png",
        bg: "bg-avatar-user-squarejulius-vaughan-color-background",
      },
    ],
    userCount: "+256 lecteurs",
    buttonText: "Lire",
  },
  {
    id: 2,
    title: "Project title",
    icon: "/bold-duotone---video--audio--sound---video-library.svg",
    iconAlt: "Bold duotone video",
    primaryTag: "Formation 🎥",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 1-4 Days\n⚡ Level: from 0 to PRO\n🎁 400+ Figma Templates",
    avatars: [
      {
        src: ".//content-4.png",
        bg: "bg-avatar-user-squareali-mahdi-color-background",
      },
      {
        src: ".//content-5.png",
        bg: "bg-avatar-user-squarezahra-christensen-neutral-background",
      },
      {
        src: ".//content-6.png",
        bg: "bg-avatar-user-squareriley-omoore-color-background",
      },
      {
        src: ".//content-7.png",
        bg: "bg-avatar-user-squareyoussef-roberson-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Rejoindre",
  },
  {
    id: 3,
    title: "Project title",
    icon: "/bold-duotone---video--audio--sound---clapperboard-play.png",
    iconAlt: "Bold duotone video",
    primaryTag: "Masterclass 🎬",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 7-30 Days\n⚡ Level: from 0 to PRO\n🎁 Figma files, extra lessons, certificate, community…",
    avatars: [
      {
        src: ".//content-8.png",
        bg: "bg-avatar-user-squarecohen-lozano-color-background",
      },
      {
        src: ".//content-9.png",
        bg: "bg-avatar-user-squareashton-blackwell-color-background",
      },
      {
        src: ".//content-10.png",
        bg: "bg-avatar-user-squareowen-garcia-color-background",
      },
      {
        src: ".//content-11.png",
        bg: "bg-avatar-user-squareisla-allison-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Regarder",
  },
];

export function ResourcesSection() {
  return (
    <SectionLayout
      title="Ressources"
      description="Des guides, modèles et conseils pour maîtriser l'UI/UX, les design systems et Figma, et créer des produits qui donnent envie d'être utilisés."
      link={routes.projects.link}
      badge="Hub 🫶"
    >
      {resourcesData.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </SectionLayout>
  );
}
