import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projectsData = [
  {
    id: 1,
    icon: "/bold-duotone---school---book.svg",
    iconAlt: "Bold duotone school",
    title: "Project title",
    primaryTag: "E-book 📕",
    tags: ["Saas", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 7-30 Days\n⚡ Level: from 0 to PRO\n🎁 Figma files, extra lessons, certificate, community…",
    avatars: [
      {
        src: "..//content.png",
        bgClass: "bg-avatar-user-squareamlie-laurent-color-background",
      },
      {
        src: "..//content-1.png",
        bgClass: "bg-avatar-user-squaresienna-hewitt-neutral-background",
      },
      {
        src: "..//content-2.png",
        bgClass: "bg-avatar-user-squareammar-foley-color-background",
      },
      {
        src: "..//content-3.png",
        bgClass: "bg-avatar-user-squarejulius-vaughan-color-background",
      },
    ],
    readerCount: "+256 lecteurs",
    buttonText: "Lire 􀄫",
  },
  {
    id: 2,
    icon: "/bold-duotone---video--audio--sound---video-library.svg",
    iconAlt: "Bold duotone video",
    title: "Project title",
    primaryTag: "Formation 🎥",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 1-4 Days\n⚡ Level: from 0 to PRO\n🎁 400+ Figma Templates",
    avatars: [
      {
        src: "..//content-4.png",
        bgClass: "bg-avatar-user-squareali-mahdi-color-background",
      },
      {
        src: "..//content-5.png",
        bgClass: "bg-avatar-user-squarezahra-christensen-neutral-background",
      },
      {
        src: "..//content-6.png",
        bgClass: "bg-avatar-user-squareriley-omoore-color-background",
      },
      {
        src: "..//content-7.png",
        bgClass: "bg-avatar-user-squareyoussef-roberson-color-background",
      },
    ],
    readerCount: "+2468 étudiants",
    buttonText: "Rejoindre 􀄫",
  },
  {
    id: 3,
    icon: "/bold-duotone---video--audio--sound---clapperboard-play.svg",
    iconAlt: "Bold duotone video",
    title: "Project title",
    primaryTag: "Masterclass 🎬",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    details:
      "🕓 Time: 7-30 Days\n⚡ Level: from 0 to PRO\n🎁 Figma files, extra lessons, certificate, community…",
    avatars: [
      {
        src: "..//content-8.png",
        bgClass: "bg-avatar-user-squarecohen-lozano-color-background",
      },
      {
        src: "..//content-9.png",
        bgClass: "bg-avatar-user-squareashton-blackwell-color-background",
      },
      {
        src: "..//content-10.png",
        bgClass: "bg-avatar-user-squareowen-garcia-color-background",
      },
      {
        src: "..//content-11.png",
        bgClass: "bg-avatar-user-squareisla-allison-color-background",
      },
    ],
    readerCount: "+2468 étudiants",
    buttonText: "Regarder 􀄫",
  },
];

export const MoreInfoSection () {
  return (
    <section className="w-full bg-greys-00 py-[99px]">
      <div className="max-w-[1136px] mx-auto px-4">
        <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mb-[118px]">
          Autres ressources
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col w-full bg-[#f9f9f9] rounded-[32px] border-0 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-center justify-end p-4 bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9]">
                  <div className="flex flex-col h-60 items-center justify-center gap-2.5 px-[34px] py-0 w-full bg-white relative">
                    <div className="flex flex-col items-start gap-[6.98px] w-full">
                      <div className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
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

                <div className="flex flex-col items-start gap-3 px-[46px] py-4">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <h3 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                      {project.title}
                    </h3>

                    <div className="flex items-start gap-1.5 px-2 py-1 w-full bg-white rounded-lg overflow-hidden">
                      <Badge className="justify-center gap-2.5 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] border-0">
                        <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                          {project.primaryTag}
                        </span>
                      </Badge>

                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-[#f5f5f599] justify-center gap-2.5 px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] border-0"
                        >
                          <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                            {tag}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col items-start justify-center gap-4 w-full">
                      <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl tracking-[0.02px] leading-[28.8px]">
                        {project.description}
                      </p>

                      <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-base tracking-[0.01px] leading-[19.2px] whitespace-pre-line">
                        {project.details}
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-1 py-0.5 bg-white rounded-[5px]">
                        <div className="inline-flex items-start">
                          {project.avatars.map((avatar, index) => (
                            <div
                              key={index}
                              className={`relative w-[18px] h-[18px] rounded-[25px] ${
                                index > 0 ? "-ml-0.5" : ""
                              }`}
                            >
                              <div
                                className={`w-[19px] h-[19px] rounded-[25px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_0.5px_0.75px_-0.25px_#0a0d120d,0px_1.5px_2px_-0.5px_#0a0d121a] [background:url(${avatar.src})_50%_50%_/_cover,linear-gradient(0deg,rgba(221,192,206,1)_0%,rgba(221,192,206,1)_100%)] ${avatar.bgClass}`}
                              >
                                <div className="w-[18px] h-[18px] rounded-[25px] border-[0.12px] border-solid border-[#181d27] opacity-[0.08]" />
                              </div>
                            </div>
                          ))}
                        </div>

                        <span className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[10px] tracking-[0.01px] leading-[12.0px] whitespace-nowrap">
                          {project.readerCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="px-4 py-2 bg-greys-08 rounded-xl overflow-hidden h-auto border-0 hover:bg-greys-08/90">
                    <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] text-text-iconsdark-high-emphasis leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
                      {project.buttonText}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
