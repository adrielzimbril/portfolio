import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ProjectSection = (): JSX.Element => {
  const projectsData = [
    {
      id: 1,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      buttonText: "Lire 􀄫",
    },
    {
      id: 2,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      buttonText: "Lire 􀄫",
    },
    {
      id: 3,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      buttonText: "Lire 􀄫",
    },
    {
      id: 4,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      buttonText: "Lire 􀄫",
    },
  ];

  return (
    <section className="w-full py-12 bg-greys-00">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Card
              key={project.id}
              className="bg-[#f9f9f9] border-[16px] border-solid rounded-[32px] p-6 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
            >
              <CardContent className="flex flex-col gap-8 p-0">
                <div className="flex-1 bg-white rounded-[32px] border-[16px] border-solid overflow-hidden flex items-center justify-center min-h-[300px]">
                  <div className="w-[88px] h-[88px] bg-[url(/image-989-3.png)] bg-cover bg-center" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-1.5 p-2 bg-white rounded-2xl overflow-hidden">
                    <Badge className="bg-[#e2e4ff] text-[#000000de] hover:bg-[#e2e4ff] px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                      <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4">
                        {project.date}
                      </span>
                    </Badge>

                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#f5f5f599] text-[#000000de] hover:bg-[#f5f5f599] px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
                      >
                        <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4">
                          {tag}
                        </span>
                      </Badge>
                    ))}
                  </div>

                  <h3 className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px]">
                    {project.title}
                  </h3>

                  <p className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[17px] tracking-[0.07px] leading-[22px]">
                    {project.description}
                  </p>

                  <Button className="w-fit px-4 py-2 bg-greys-08 hover:bg-greys-08 text-text-iconsdark-high-emphasis rounded-xl h-auto font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)]">
                    {project.buttonText}
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
