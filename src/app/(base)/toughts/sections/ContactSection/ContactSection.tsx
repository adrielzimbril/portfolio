import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContactSection = (): JSX.Element => {
  return (
    <section className="min-h-[720px] relative w-full bg-greys-00 flex items-center justify-center">
      <Card className="w-full max-w-[1094px] mx-auto bg-[#f9f9f9] rounded-[64px] border-none shadow-none">
        <CardContent className="p-12 flex items-center justify-between gap-8">
          <div className="flex flex-col items-start gap-8 flex-1 max-w-[557px]">
            <h1 className="w-full font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Discutons de votre prochain projet !
            </h1>

            <p className="max-w-[508px] text-2xl tracking-[0.02px] leading-[28.8px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de]">
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
              <Button
                variant="outline"
                className="h-auto px-4 py-[13px] bg-white rounded-xl border-2 border-[#f9f9f9] hover:bg-white"
              >
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-disabled text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  😏 vous voulez recevoir des cadeaux ?
                </span>
              </Button>

              <Button className="h-auto px-4 py-[13px] bg-greys-08 rounded-xl hover:bg-greys-08/90">
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  Recevoir !
                </span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center p-10 bg-white rounded-full backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <div className="w-[88px] h-[88px] bg-[url(/image-1001.png)] bg-cover bg-center rounded-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
