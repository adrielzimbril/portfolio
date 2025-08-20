import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projectData = [
  {
    id: 1,
    emoji: "😎",
    message: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    tags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    title: "Project title",
    categories: [
      { name: "SaaS 🦄", color: "bg-[#afffad]" },
      { name: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
      { name: "Web Application 📝", color: "bg-[#ade9ff]" },
      { name: "Design 🎨", color: "bg-[#f9f9f9]" },
      { name: "Mobile App 📱", color: "bg-[#e2e4ff]" },
    ],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos 􀄫",
  },
  {
    id: 2,
    emoji: "😎",
    message: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    tags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    title: "Project title",
    categories: [
      { name: "SaaS 🦄", color: "bg-[#afffad]" },
      { name: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
      { name: "Web Application 📝", color: "bg-[#ade9ff]" },
      { name: "Design 🎨", color: "bg-[#f9f9f9]" },
      { name: "Mobile App 📱", color: "bg-[#e2e4ff]" },
    ],
    description:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos 􀄫",
  },
];

export function ResourcesSection() {
  return (
    <section className="relative w-full bg-greys-00 py-[104px]">
      <div className="relative max-w-[1440px] mx-auto px-[152px]">
        <header className="flex flex-col items-center gap-4 mb-[272px]">
          <Badge className="px-3 py-1.5">Tag</Badge>

          <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
            Projets
          </h1>

          <p className="w-[654px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl text-center tracking-[0.02px] leading-[28.8px]">
            Chaque projet est une opportunité de transformer une idée en
            expérience réelle, avec un design qui séduit et une stratégie qui
            fonctionne.
          </p>

          <Button className="h-auto px-4 py-[13px] bg-[#ffffff80] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl text-[#000000de] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] hover:bg-[#ffffff90]">
            Voir plus 􀄫
          </Button>
        </header>

        <div className="flex flex-col gap-6 max-w-[1136px] mx-auto">
          {projectData.map((project) => (
            <Card
              key={project.id}
              className="flex items-center justify-center gap-4 pt-0 pb-4 px-0 bg-[#f9f9f9] rounded-[32px] overflow-hidden border-0"
            >
              <CardContent className="flex p-0 w-full">
                <div className="flex flex-col items-center justify-end p-4 flex-1 bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9]">
                  <div className="flex flex-col items-center justify-center gap-2.5 px-[34px] py-0 flex-1 w-full bg-greys-00 rounded-[22px] overflow-hidden">
                    <div className="flex flex-col items-start gap-[6.98px] w-full">
                      <div className="mt-[-0.87px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                        {project.emoji}
                        <br />
                        {project.message}
                      </div>
                      <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                        {project.subtitle}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-6 px-[46px] py-8 flex-1">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <div className="flex flex-wrap items-start gap-[8px_8px] w-full">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-white rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] text-[#000000de] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                      {project.title}
                    </h2>

                    <div className="flex flex-wrap items-start gap-[6px_6px] px-2 py-1 w-full bg-white rounded-lg overflow-hidden">
                      {project.categories.map((category, index) => (
                        <Badge
                          key={index}
                          className={`${category.color} rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] text-[#000000de] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4`}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center">
                      <p className="w-[344px] mt-[-1.00px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl tracking-[0.02px] leading-[28.8px]">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <Button className="h-auto px-4 py-2 bg-white backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl overflow-hidden text-[#000000de] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] hover:bg-gray-50">
                    {project.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="absolute w-full h-[249px] bottom-0 left-0 bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
      </div>
    </section>
  );
}
