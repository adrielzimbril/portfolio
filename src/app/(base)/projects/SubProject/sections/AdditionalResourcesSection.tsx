import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projectsData = [
  {
    id: 1,
    title: "Project title",
    previewText: "😎\nI made you looked.",
    description: "You can have the rest of the empty space here.",
    outcomeText:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos 􀄫",
    topTags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    categoryTags: [
      { text: "SaaS 🦄", color: "bg-[#afffad]" },
      { text: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
      { text: "Web Application 📝", color: "bg-[#ade9ff]" },
      { text: "Design 🎨", color: "bg-[#f9f9f9]" },
      { text: "Mobile App 📱", color: "bg-[#e2e4ff]" },
    ],
  },
  {
    id: 2,
    title: "Project title",
    previewText: "😎\nI made you looked.",
    description: "You can have the rest of the empty space here.",
    outcomeText:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos 􀄫",
    topTags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    categoryTags: [
      { text: "SaaS 🦄", color: "bg-[#afffad]" },
      { text: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
      { text: "Web Application 📝", color: "bg-[#ade9ff]" },
      { text: "Design 🎨", color: "bg-[#f9f9f9]" },
      { text: "Mobile App 📱", color: "bg-[#e2e4ff]" },
    ],
  },
  {
    id: 3,
    title: "Project title",
    previewText: "😎\nI made you looked.",
    description: "You can have the rest of the empty space here.",
    outcomeText:
      "You can add what outcomes has this project brought after your design! For example",
    buttonText: "Plus d'infos 􀄫",
    topTags: [
      "Stratégie de mise sur le marché",
      "Planification de la feuille de route",
      "Planification de la feuille de route",
    ],
    categoryTags: [
      { text: "SaaS 🦄", color: "bg-[#afffad]" },
      { text: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
      { text: "Web Application 📝", color: "bg-[#ade9ff]" },
      { text: "Design 🎨", color: "bg-[#f9f9f9]" },
      { text: "Mobile App 📱", color: "bg-[#e2e4ff]" },
    ],
  },
];

export function AdditionalResourcesSection() {
  return (
    <section className="w-full bg-greys-00 py-[99px]">
      <div className="max-w-[1136px] mx-auto px-4">
        <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mb-[118px]">
          More works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <Card
              key={project.id}
              className="bg-[#f9f9f9] border-0 rounded-[32px] overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col h-[268px] items-center justify-end p-4 bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9]">
                  <div className="flex flex-col items-center justify-center gap-2.5 px-[34px] py-0 flex-1 w-full bg-greys-00 rounded-[22px] overflow-hidden">
                    <div className="flex flex-col items-start gap-[6.98px] w-full">
                      <div className="w-full [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px] whitespace-pre-line">
                        {project.previewText}
                      </div>
                      <div className="w-full [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-6 px-[46px] py-8">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <div className="flex flex-wrap items-start gap-2 w-full">
                      {project.topTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-white rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
                        >
                          <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                            {tag}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <h3 className="w-full font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap items-start gap-[6px] px-2 py-1 w-full bg-white rounded-lg overflow-hidden">
                      {project.categoryTags.map((tag, index) => (
                        <Badge
                          key={index}
                          className={`${tag.color} rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] hover:${tag.color}`}
                        >
                          <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                            {tag.text}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <div className="inline-flex items-center justify-center gap-2.5">
                      <p className="w-[344px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl tracking-[0.02px] leading-[28.8px]">
                        {project.outcomeText}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    className="px-4 py-2 bg-white rounded-xl overflow-hidden backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] h-auto hover:bg-white"
                  >
                    <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
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
}
