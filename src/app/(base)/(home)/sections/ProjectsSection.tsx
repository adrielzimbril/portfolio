import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { routes } from "@/data/route";
import { ArrowRightOne, LinkDiagonalOne, LinkOne } from "@aurthle/icons";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const projectsData = [
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

export function ProjectsSection() {
  return (
    <section className="relative w-full bg-greys-00 py-[104px]">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 mb-12">
        <Badge>Hub 🫶</Badge>

        <h2 className=" ">Ressources</h2>

        <p className="text-center text-xl md:text-2xl text-gray-600 font-medium">
          Des guides, modèles et conseils pour maîtriser l&apos;UI/UX, les
          design systems et Figma, et créer des produits qui donnent envie
          d&apos;être utilisés.
        </p>

        <Link
          href={routes.projects.link}
          variant="outline"
          asSquare
          asIcon
          whileTap
          size="xs"
        >
          <span className="flex items-center gap-1">
            Voir plus <ArrowRightOne size={16} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl rounded-4sxl border-0 overflow-hidden"
          >
            <CardContent className="grid grid-cols-1 p-0 px-6 md:px-8 py-8 md:py-10 gap-4">
              <div className="flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-3xl squircle-white overflow-hidden">
                <div className="flex flex-col items-start gap-3 w-full max-w-[90%] mx-auto">
                  <h4 className="text-3xl tracking-wide leading-[120%]">
                    😎
                    <br />I made you looked.
                  </h4>

                  <p className="font-medium text-zinc-500 text-2xl leading-[120%]">
                    You can have the rest of the empty space here.
                  </p>
                </div>

                <div className="inline-flex items-center justify-center gap-3 p-2.5 absolute top-2 right-2 bg-zinc-100 rounded-full overflow-hidden">
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    alt={project.iconAlt}
                    src={project.icon}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-center gap-4 w-full">
                <h3 className="relative">{project.title}</h3>

                <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden">
                  <Badge className="squircle-[#e2e4ff]" variant="colored">
                    {project.primaryTag}
                  </Badge>

                  {project.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
                <p className="w-full relative text-[1.5rem] leading-[120%] font-medium text-zinc-600">
                  {project.description}
                </p>

                <p className="w-full relative text-base text-zinc-500 leading-6 whitespace-pre-line">
                  {project.details}
                </p>

                <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-white">
                  <div className="inline-flex items-start">
                    <AvatarGroup numPeople={99}>
                      {project.avatars.map((avatar, index) => (
                        <Avatar key={index} className="w-6 h-6">
                          {/* <AvatarImage src={avatar.src} /> */}
                          <AvatarFallback className={cn(avatar.bg)}>
                            <span className="text-xs">a</span>
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </div>

                  <span className="relative text-sm text-zinc-600">
                    {project.userCount}
                  </span>
                </div>
                <Link
                  href={routes.projects.link}
                  asSquare
                  whileTap
                  size="xs"
                  asIcon
                >
                  <span className="flex items-center gap-1">
                    {project.buttonText}
                    <LinkDiagonalOne size={16} />
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
