import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const ContactFormSection () {
  return (
    <section className="h-[720px] w-full bg-greys-00 flex items-center justify-center">
      <Card className="w-[1094px] bg-[#f9f9f9] rounded-[64px] border-none shadow-none">
        <CardContent className="p-12 flex items-center justify-between">
          <div className="flex flex-col items-start gap-8 flex-1 max-w-[557px]">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Envie de parler de SaaS ?
            </h1>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px] max-w-[508px]">
              <span className="tracking-[0]">
                Je partage régulièrement mes réflexions, retours
                d&apos;expérience et conseils sur mon{" "}
              </span>
              <span className="tracking-[0] underline">Blog</span>
              <span className="tracking-[0]"> et sur </span>
              <span className="tracking-[0] underline">Linkedin</span>
              <span className="tracking-[0]">
                . Que ce soit pour discuter design, produit ou innovation,
                n&apos;hésitez pas à me contacter.
              </span>
            </p>

            <Badge className="px-4 py-[13px] bg-greys-08 text-text-iconsdark-high-emphasis rounded-xl hover:bg-greys-08 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] h-auto">
              Parler de SaaS 🦄
            </Badge>
          </div>

          <div className="flex items-center justify-center p-10 bg-white rounded-full backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <div className="w-[88px] h-[88px] bg-[url(/image-1001-2.png)] bg-cover bg-center rounded-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
