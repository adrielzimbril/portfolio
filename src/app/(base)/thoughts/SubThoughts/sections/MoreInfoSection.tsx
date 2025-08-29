import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function MoreInfoSection() {
  const articles = [
    {
      id: 1,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      imageUrl: "/image-989-2.png",
    },
    {
      id: 2,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      imageUrl: "/image-989-2.png",
    },
    {
      id: 3,
      date: "🗓 18, Jul 2024",
      tags: ["SaaS", "Design", "Conseils"],
      title: "Project Title",
      description:
        "Fill your project brief here. It can be the outcome of the project, or some success metrics, or a cheesy tagline.",
      imageUrl: "/image-989-2.png",
    },
  ];

  return (
    <section className="w-full bg-greys-00 py-[99px] px-[152px]">
      <h2 className="mb-[118px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
        Autres articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1136px]">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="flex flex-col h-[597px] p-6 bg-[#f9f9f9] rounded-[32px] border-[16px] border-solid backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
          >
            <CardContent className="flex flex-col h-full p-0 gap-8">
              <div className="flex-1 bg-white rounded-[32px] overflow-hidden border-[16px] border-solid flex items-center justify-center">
                <div
                  className="w-[88px] h-[88px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${article.imageUrl})` }}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-1.5 p-2 bg-white rounded-2xl overflow-hidden flex-wrap">
                  <Badge className="bg-[#e2e4ff] text-[#000000de] hover:bg-[#e2e4ff] px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                    <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4 whitespace-nowrap">
                      {article.date}
                    </span>
                  </Badge>

                  {article.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-[#f5f5f599] text-[#000000de] hover:bg-[#f5f5f599] px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
                    >
                      <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-xs tracking-[0] leading-4 whitespace-nowrap">
                        {tag}
                      </span>
                    </Badge>
                  ))}
                </div>

                <h3 className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px]">
                  {article.title}
                </h3>

                <p className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.07px] leading-[22px]">
                  {article.description}
                </p>

                <Button className="h-auto px-4 py-2 bg-greys-08 hover:bg-greys-06 rounded-xl self-start">
                  <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)]">
                    Lire 􀄫
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
