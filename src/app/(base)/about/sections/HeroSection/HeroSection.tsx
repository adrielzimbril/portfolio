import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection () {
  return (
    <section className="h-[689px] relative w-full bg-greys-00">
      <div className="flex justify-center pt-12">
        <Card className="w-[1136px] bg-[#f9f9f9] rounded-[64px] border-0">
          <CardContent className="flex items-center justify-between p-16">
            <div className="flex flex-col items-start gap-6 flex-1 pr-12">
              <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                Bonjour, je suis Adriel Zimbril - Product designer
              </h1>

              <p className="text-[#000000de] text-[28px] tracking-[0] leading-[33.6px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium">
                Donnez à votre entreprise les moyens d&#39;une conception
                centrée sur l&#39;utilisateur et de l&#39;IA pour offrir des
                expériences client fluides et accélérer la croissance.
              </p>

              <Button
                variant="secondary"
                className="h-auto px-4 py-[13px] bg-[#ffffff80] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl border-0 hover:bg-[#ffffff90]"
              >
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  Voir mes projets 􀄩
                </span>
              </Button>
            </div>

            <div className="relative w-[464px] h-[464px] bg-white rounded-full overflow-hidden flex-shrink-0">
              <div className="absolute w-[88px] h-[88px] top-[188px] left-[188px] bg-[url(/portrait.png)] bg-cover bg-center rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
