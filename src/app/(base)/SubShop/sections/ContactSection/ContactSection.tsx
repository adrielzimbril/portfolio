import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ContactSection () {
  return (
    <section className="h-[720px] relative w-full bg-greys-00 flex items-center justify-center">
      <Card className="w-[1094px] bg-[#f9f9f9] rounded-[64px] border-0 shadow-none">
        <CardContent className="flex items-center justify-between p-12">
          <div className="flex flex-col items-start gap-8 flex-[0_0_auto]">
            <h2 className="w-[557px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Envie de parler de SaaS ?
            </h2>

            <p className="w-[508px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px]">
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

            <div className="flex items-start gap-4">
              <Button className="h-auto px-4 py-[13px] rounded-xl bg-greys-08 hover:bg-greys-08/90 text-text-iconsdark-high-emphasis [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px]">
                Parler de SaaS 🦄
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center p-40 bg-white rounded-[1000px] overflow-hidden backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <div className="w-[88px] h-[88px] bg-[url(/image-1001-1.png)] bg-cover bg-[50%_50%]" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
