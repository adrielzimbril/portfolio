import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        src: "..//content.png",
        bg: "bg-avatar-user-squareamlie-laurent-color-background",
      },
      {
        src: "..//content-1.png",
        bg: "bg-avatar-user-squaresienna-hewitt-neutral-background",
      },
      {
        src: "..//content-2.png",
        bg: "bg-avatar-user-squareammar-foley-color-background",
      },
      {
        src: "..//content-3.png",
        bg: "bg-avatar-user-squarejulius-vaughan-color-background",
      },
    ],
    userCount: "+256 lecteurs",
    buttonText: "Lire 􀄫",
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
        src: "..//content-4.png",
        bg: "bg-avatar-user-squareali-mahdi-color-background",
      },
      {
        src: "..//content-5.png",
        bg: "bg-avatar-user-squarezahra-christensen-neutral-background",
      },
      {
        src: "..//content-6.png",
        bg: "bg-avatar-user-squareriley-omoore-color-background",
      },
      {
        src: "..//content-7.png",
        bg: "bg-avatar-user-squareyoussef-roberson-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Rejoindre 􀄫",
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
        src: "..//content-8.png",
        bg: "bg-avatar-user-squarecohen-lozano-color-background",
      },
      {
        src: "..//content-9.png",
        bg: "bg-avatar-user-squareashton-blackwell-color-background",
      },
      {
        src: "..//content-10.png",
        bg: "bg-avatar-user-squareowen-garcia-color-background",
      },
      {
        src: "..//content-11.png",
        bg: "bg-avatar-user-squareisla-allison-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Regarder 􀄫",
  },
];

export function ProjectsSection() {
  return (
    <section className="relative w-full bg-greys-00 py-[104px]">
      <div className="flex flex-col items-center gap-4 mb-[285px]">
        <Badge className="bg-[#f5f5f5cc] text-[#000000de] text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
          Hub 🫶
        </Badge>

        <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
          Ressources
        </h2>

        <p className="w-[654px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl text-center tracking-[0.02px] leading-[28.8px]">
          Des guides, modèles et conseils pour maîtriser l&apos;UI/UX, les
          design systems et Figma, et créer des produits qui donnent envie
          d&apos;être utilisés.
        </p>

        <Button className="px-4 py-[13px] bg-[#ffffff80] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl text-[#000000de] text-[17px] font-normal tracking-[0.07px] leading-[22px] h-auto hover:bg-[#ffffff90]">
          Voir plus 􀄫
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-[1136px] mx-auto px-4">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            className="w-[544px] bg-[#f9f9f9] rounded-[32px] border-0 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-end p-4 bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9] mb-4">
                <div className="flex flex-col h-60 items-center justify-center gap-2.5 px-[34px] py-0 w-full bg-white relative">
                  <div className="flex flex-col items-start gap-[6.98px] w-full">
                    <div className="mt-[-0.87px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                      😎
                      <br />I made you looked.
                    </div>

                    <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                      You can have the rest of the empty space here.
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 p-[9.6px] absolute top-2 right-2 bg-[#f9f9f9] rounded-[120px] overflow-hidden">
                    <img
                      className="w-6 h-6"
                      alt={project.iconAlt}
                      src={project.icon}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 px-[46px] pb-4">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h3 className="mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                    {project.title}
                  </h3>

                  <div className="flex items-start gap-1.5 px-2 py-1 w-full bg-white rounded-lg overflow-hidden">
                    <Badge className="bg-[#e2e4ff] text-[#000000de] text-xs font-medium px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                      {project.primaryTag}
                    </Badge>

                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#f5f5f599] text-[#000000de] text-xs font-medium px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col items-start justify-center gap-4 w-full">
                    <p className="mt-[-1.00px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl tracking-[0.02px] leading-[28.8px]">
                      {project.description}
                    </p>

                    <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-base tracking-[0.01px] leading-[19.2px] whitespace-pre-line">
                      {project.details}
                    </div>

                    <div className="gap-1.5 px-1 py-0.5 bg-white rounded-[5px] inline-flex items-center">
                      <div className="inline-flex items-start">
                        {project.avatars.map((avatar, index) => (
                          <div
                            key={index}
                            className={`relative w-[18px] h-[18px] rounded-[25px] ${
                              index > 0 ? "-ml-0.5" : ""
                            }`}
                          >
                            <div
                              className={`w-[19px] h-[19px] rounded-[25px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_0.5px_0.75px_-0.25px_#0a0d120d,0px_1.5px_2px_-0.5px_#0a0d121a] [background:url(${avatar.src})_50%_50%_/_cover,linear-gradient(0deg,rgba(221,192,206,1)_0%,rgba(221,192,206,1)_100%)] ${avatar.bg}`}
                            >
                              <div className="w-[18px] h-[18px] rounded-[25px] border-[0.12px] border-solid border-[#181d27] opacity-[0.08]" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[10px] tracking-[0.01px] leading-[12.0px] whitespace-nowrap">
                        {project.userCount}
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="px-4 py-2 bg-greys-08 rounded-xl text-text-iconsdark-high-emphasis font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)] h-auto hover:bg-greys-06">
                  {project.buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="absolute w-full h-[249px] bottom-0 left-0 bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
    </section>
  );
}
