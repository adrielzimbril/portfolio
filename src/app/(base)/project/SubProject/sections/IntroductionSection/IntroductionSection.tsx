import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const IntroductionSection () {
  const points = [
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
  ];

  return (
    <section className="relative w-full bg-greys-00 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mb-4">
            Aperçus
          </h1>
          <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl tracking-[0.02px] leading-[28.8px] max-w-[342px]">
            Notez ce que vous avez appris de la recherche utilisateur.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          <Card className="flex-shrink-0">
            <CardContent className="flex items-center justify-center w-96 h-96 p-12 bg-[#f5f5f599] rounded-[48px]">
              <div className="w-[84px] h-[84px] bg-[url(/image-989-1.png)] bg-cover bg-center" />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 flex-1">
            {points.map((point, index) => (
              <div key={index} className="flex flex-col gap-1">
                <h3 className="font-title-03-28 font-[number:var(--title-03-28-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--title-03-28-font-size)] tracking-[var(--title-03-28-letter-spacing)] leading-[var(--title-03-28-line-height)] [font-style:var(--title-03-28-font-style)]">
                  {point.title}
                </h3>
                <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px] max-w-[414px]">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
