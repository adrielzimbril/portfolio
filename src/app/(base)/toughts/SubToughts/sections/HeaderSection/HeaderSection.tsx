import { CalendarIcon, ClockIcon, EyeIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const metadataItems = [
  {
    icon: CalendarIcon,
    text: "18, Jul 2024",
  },
  {
    icon: ClockIcon,
    text: "08 min read",
  },
  {
    icon: EyeIcon,
    text: "90K reads",
  },
];

const topicTags = [
  "SaaS 🦄",
  "Go To Market 🎯",
  "Web Application 📝",
  "Design 🎨",
  "Mobile App 📱",
];

export const HeaderSection () {
  return (
    <section className="min-h-[797px] w-full bg-greys-00 flex items-center justify-center p-8">
      <div className="w-full max-w-[1136px] flex flex-col justify-center gap-4 p-8 bg-[#f9f9f9] rounded-[64px] overflow-hidden">
        <Card className="bg-[#f9f9f9] rounded-[48px] border-[16px] border-white overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center p-4 min-h-[380px]">
            <div className="flex flex-col gap-[11.44px] items-center text-center px-[34px]">
              <h1 className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#000000de] text-[48.6px] tracking-[0.20px] leading-[58.3px] mt-[-1.43px]">
                💡
                <br />I made you looked.
              </h1>
              <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-[39.3px] tracking-[0.03px] leading-[47.2px]">
                You can have the rest of the empty space here.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 w-full">
          <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mt-[-1.00px]">
            My Evolved Blogfolio in 2025
          </h2>

          <div className="flex flex-wrap items-start gap-[6px] rounded-2xl">
            {metadataItems.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="justify-center gap-1 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] h-auto"
              >
                <item.icon className="w-4 h-4" />
                <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap mt-[-1.00px]">
                  {item.text}
                </span>
              </Badge>
            ))}
          </div>

          <Card className="bg-white rounded-2xl overflow-hidden">
            <CardContent className="flex flex-wrap gap-[6px] p-4">
              {topicTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${
                    index === 3 ? "bg-[#f9f9f9]" : "bg-[#f5f5f599]"
                  } inline-flex items-center justify-center gap-2.5 px-3 py-1.5 rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] h-auto`}
                >
                  <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap mt-[-1.00px]">
                    {tag}
                  </span>
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
