import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContactSection = (): JSX.Element => {
  return (
    <section className="h-[720px] relative w-full bg-greys-00">
      <Card className="w-[1094px] relative top-32 left-[173px] bg-[#f9f9f9] rounded-[64px] border-none shadow-none">
        <CardContent className="flex items-center justify-between p-12">
          <div className="inline-flex flex-col items-start gap-8 relative flex-[0_0_auto]">
            <h2 className="relative w-[557px] mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Discutons de votre prochain projet !
            </h2>

            <p className="relative w-[508px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-2xl tracking-[0.02px] leading-[28.8px]">
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

            <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
              <div className="inline-flex items-start gap-2.5 px-4 py-[13px] relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] bg-white rounded-xl overflow-hidden border-2 border-solid border-[#f9f9f9]">
                <span className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-disabled text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  😏 vous voulez recevoir des cadeaux ?
                </span>
              </div>

              <Button className="px-4 py-[13px] h-auto bg-greys-08 rounded-xl hover:bg-greys-08/90">
                <span className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  Recevoir !
                </span>
              </Button>
            </div>
          </div>

          <div className="inline-flex items-center gap-2.5 p-40 relative flex-[0_0_auto] bg-white rounded-[1000px] overflow-hidden backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <div className="relative w-[88px] h-[88px] bg-[url(/image-1001.png)] bg-cover bg-[50%_50%]" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
