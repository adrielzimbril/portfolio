import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ContactSection () {
  return (
    <section className="min-h-[720px] flex items-center justify-center w-full bg-greys-00 py-32">
      <Card className="w-full max-w-[1094px] mx-auto bg-[#f9f9f9] rounded-[64px] border-0">
        <CardContent className="flex items-center justify-between p-12">
          <div className="flex flex-col items-start gap-8 flex-1 max-w-[557px]">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Discutons de votre prochain projet !
            </h1>

            <p className="max-w-[508px] text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium">
              Que ce soit pour concevoir un produit, améliorer une expérience ou
              lancer une innovation, je suis là pour transformer vos idées en
              résultats concrets.
            </p>

            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2.5 px-4 py-[13px] bg-white rounded-xl border-2 border-[#f9f9f9]">
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-disabled text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  😏 vous voulez recevoir des cadeaux ?
                </span>
              </div>

              <Button className="px-4 py-[13px] h-auto bg-greys-08 hover:bg-greys-06 rounded-xl">
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  Recevoir !
                </span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center p-40 bg-white rounded-full backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <div className="bg-[url(/image-1001.png)] w-[88px] h-[88px] bg-cover bg-center rounded-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
