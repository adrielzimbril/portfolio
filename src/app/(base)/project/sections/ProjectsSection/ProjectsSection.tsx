import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const strategyTags = [
  "Stratégie de mise sur le marché",
  "Planification de la feuille de route",
  "Planification de la feuille de route",
];

const categoryBadges = [
  { text: "SaaS 🦄", color: "bg-[#afffad]" },
  { text: "Go To Market 🎯", color: "bg-[#ffe9ad]" },
  { text: "Web Application 📝", color: "bg-[#ade9ff]" },
  { text: "Design 🎨", color: "bg-[#f9f9f9]" },
  { text: "Mobile App 📱", color: "bg-[#e2e4ff]" },
];

const projects = [
  {
    id: 1,
    isLarge: true,
    strategyTags,
    title: "Project title",
    categoryBadges,
    description:
      "You can add what outcomes has this project brought after your design! For example",
  },
  {
    id: 2,
    isLarge: false,
    strategyTags,
    title: "Project title",
    categoryBadges,
    description:
      "You can add what outcomes has this project brought after your design! For example",
  },
  {
    id: 3,
    isLarge: false,
    strategyTags,
    title: "Project title",
    categoryBadges,
    description:
      "You can add what outcomes has this project brought after your design! For example",
  },
];

export const ProjectsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-greys-00 py-[101px] px-[152px]">
      <div className="flex flex-wrap items-start justify-center gap-6 max-w-[1136px] mx-auto">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`${
              project.isLarge ? "w-full" : "w-[474px]"
            } bg-[#f9f9f9] rounded-[32px] border-0 overflow-hidden`}
          >
            <CardContent className="p-0">
              <div
                className={`flex ${project.isLarge ? "flex-row" : "flex-col"} gap-4 p-4`}
              >
                <div
                  className={`${
                    project.isLarge ? "flex-1" : "w-full h-[268px]"
                  } bg-greys-01 rounded-[48px] p-4 border-[16px] border-[#f9f9f9] flex flex-col justify-end`}
                >
                  <div className="flex-1 bg-greys-00 rounded-[22px] px-[34px] py-0 flex flex-col justify-center">
                    <div className="flex flex-col gap-[6.98px]">
                      <div className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px] mt-[-0.87px]">
                        😎<br />I made you looked.
                      </div>
                      <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                        You can have the rest of the empty space here.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    project.isLarge ? "flex-1" : "w-full"
                  } flex flex-col gap-6 px-[46px] py-8`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.strategyTags.map((tag, index) => (
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

                    <h3 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-[6px] p-2 bg-white rounded-lg overflow-hidden">
                      {project.categoryBadges.map((badge, index) => (
                        <Badge
                          key={index}
                          className={`${badge.color} rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]`}
                        >
                          <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                            {badge.text}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <p
                        className={`${
                          project.isLarge ? "w-[344px]" : "w-full"
                        } [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-medium-emphasis text-2xl tracking-[0.02px] leading-[28.8px] mt-[-1.00px]`}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    className="h-auto px-4 py-2 bg-white backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl overflow-hidden w-fit"
                  >
                    <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap mt-[-0.50px]">
                      Plus d&apos;infos 􀄫
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
