import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const projectsData = [
  {
    id: 1,
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    projectTitle: "Project title",
    icon: "/bold-duotone---school---book.svg",
    iconAlt: "Bold duotone school",
    primaryTag: "E-book 📕",
    tags: ["Saas", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details: [
      "🕓 Time: 7-30 Days",
      "⚡ Level: from 0 to PRO",
      "🎁 Figma files, extra lessons, certificate, community…",
    ],
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
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    projectTitle: "Project title",
    icon: "/bold-duotone---video--audio--sound---video-library.svg",
    iconAlt: "Bold duotone video",
    primaryTag: "Formation 🎥",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details: [
      "🕓 Time: 1-4 Days",
      "⚡ Level: from 0 to PRO",
      "🎁 400+ Figma Templates",
    ],
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
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    projectTitle: "Project title",
    icon: "/bold-duotone---video--audio--sound---clapperboard-play.svg",
    iconAlt: "Bold duotone video",
    primaryTag: "Masterclass 🎬",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details: [
      "🕓 Time: 7-30 Days",
      "⚡ Level: from 0 to PRO",
      "🎁 Figma files, extra lessons, certificate, community…",
    ],
    avatars: [
      {
        src: "..//content-12.png",
        bg: "bg-avatar-user-squarecohen-lozano-color-background",
      },
      {
        src: "..//content-13.png",
        bg: "bg-avatar-user-squareashton-blackwell-color-background",
      },
      {
        src: "..//content-14.png",
        bg: "bg-avatar-user-squareowen-garcia-color-background",
      },
      {
        src: "..//content-15.png",
        bg: "bg-avatar-user-squareisla-allison-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Regarder 􀄫",
  },
  {
    id: 4,
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    projectTitle: "Project title",
    icon: "/bold-duotone---video--audio--sound---clapperboard-play.svg",
    iconAlt: "Bold duotone video",
    primaryTag: "Masterclass 🎬",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details: [
      "🕓 Time: 7-30 Days",
      "⚡ Level: from 0 to PRO",
      "🎁 Figma files, extra lessons, certificate, community…",
    ],
    avatars: [
      {
        src: "..//content-12.png",
        bg: "bg-avatar-user-squarecohen-lozano-color-background",
      },
      {
        src: "..//content-13.png",
        bg: "bg-avatar-user-squareashton-blackwell-color-background",
      },
      {
        src: "..//content-14.png",
        bg: "bg-avatar-user-squareowen-garcia-color-background",
      },
      {
        src: "..//content-15.png",
        bg: "bg-avatar-user-squareisla-allison-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Regarder 􀄫",
  },
];

export const ProjectSection = (): JSX.Element => {
  return (
    <section className="w-full bg-greys-00 py-[53px]">
      <div className="max-w-[1136px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Card
              key={project.id}
              className="bg-[#f9f9f9] border-0 rounded-[32px] overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                  <div className="bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9] p-4">
                    <div className="relative bg-white rounded-lg h-60 flex flex-col justify-center px-[34px] py-0">
                      <div className="flex flex-col gap-[6.98px]">
                        <div className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                          {project.emoji}
                          <br />
                          {project.title}
                        </div>
                        <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                          {project.subtitle}
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-[#f9f9f9] rounded-[120px] p-[9.6px]">
                        <img
                          className="w-6 h-6"
                          alt={project.iconAlt}
                          src={project.icon}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-[46px] pb-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                        {project.projectTitle}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 bg-white rounded-lg p-2">
                        <Badge className="bg-[#e2e4ff] text-[#000000de] hover:bg-[#e2e4ff] px-3 py-1.5 rounded-[10px] text-xs font-medium [font-family:'SF_Pro_Text-Medium',Helvetica]">
                          {project.primaryTag}
                        </Badge>
                        {project.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#f5f5f599] text-[#000000de] hover:bg-[#f5f5f599] px-3 py-1.5 rounded-[10px] text-xs font-medium [font-family:'SF_Pro_Text-Medium',Helvetica]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col gap-4">
                        <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl tracking-[0.02px] leading-[28.8px]">
                          {project.description}
                        </p>

                        <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-base tracking-[0.01px] leading-[19.2px]">
                          {project.details.map((detail, index) => (
                            <div key={index}>
                              {detail}
                              {index < project.details.length - 1 && <br />}
                            </div>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 bg-white rounded-[5px] px-1 py-0.5 w-fit">
                          <div className="flex items-start">
                            {project.avatars.map((avatar, index) => (
                              <div
                                key={index}
                                className={`relative w-[18px] h-[18px] rounded-[25px] ${index > 0 ? "-ml-0.5" : ""}`}
                              >
                                <div
                                  className={`w-[19px] h-[19px] rounded-[25px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_0.5px_0.75px_-0.25px_#0a0d120d,0px_1.5px_2px_-0.5px_#0a0d121a] [background:url(${avatar.src})_50%_50%_/_cover] ${avatar.bg}`}
                                >
                                  <div className="w-[18px] h-[18px] rounded-[25px] border-[0.12px] border-solid border-[#181d27] opacity-[0.08]" />
                                </div>
                              </div>
                            ))}
                          </div>
                          <span className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[10px] tracking-[0.01px] leading-[12.0px] whitespace-nowrap">
                            {project.userCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-greys-08 hover:bg-greys-08 text-text-iconsdark-high-emphasis rounded-xl px-4 py-2 h-auto font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)] w-fit">
                      {project.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
