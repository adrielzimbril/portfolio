import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tags = [
  {
    text: "SaaS 🦄",
    bgColor: "bg-[#afffad]",
  },
  {
    text: "Go To Market 🎯",
    bgColor: "bg-[#ffe9ad]",
  },
  {
    text: "Web Application 📝",
    bgColor: "bg-[#ade9ff]",
  },
  {
    text: "Design 🎨",
    bgColor: "bg-[#f9f9f9]",
  },
  {
    text: "Mobile App 📱",
    bgColor: "bg-[#e2e4ff]",
  },
];

export const HeaderSection () {
  return (
    <section className="relative w-full bg-greys-00 py-10">
      <div className="flex flex-col max-w-[1136px] mx-auto items-start justify-center gap-4 p-8 bg-[#f9f9f9] rounded-[64px] overflow-hidden">
        <Card className="relative w-full bg-[#f9f9f9] rounded-[48px] overflow-hidden border-[16px] border-solid border-white">
          <CardContent className="flex flex-col h-[380px] items-center justify-center gap-2.5 px-[34px] py-0">
            <div className="inline-flex flex-col items-start gap-[11.44px]">
              <h1 className="mt-[-1.43px] [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#000000de] text-[48.6px] text-center tracking-[0.20px] leading-[58.3px]">
                😎
                <br />I made you looked.
              </h1>

              <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-[39.3px] text-center tracking-[0.03px] leading-[47.2px]">
                You can have the rest of the empty space here.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-start gap-6 w-full">
          <h2 className="mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
            Design System × Product Thinking
          </h2>

          <div className="flex flex-wrap items-start gap-[6px_6px] p-4 w-full bg-white rounded-2xl overflow-hidden">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${tag.bgColor} inline-flex items-center justify-center gap-2.5 px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] border-0 hover:${tag.bgColor}`}
              >
                <span className="mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                  {tag.text}
                </span>
              </Badge>
            ))}
          </div>

          <Button className="flex justify-center p-6 w-full rounded-3xl items-center bg-greys-08 hover:bg-greys-08/90 h-auto">
            <span className="mt-[-1.00px] [font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-2xl tracking-[0.10px] text-text-iconsdark-high-emphasis leading-[22px] whitespace-nowrap">
              Obtenir 🚀
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
