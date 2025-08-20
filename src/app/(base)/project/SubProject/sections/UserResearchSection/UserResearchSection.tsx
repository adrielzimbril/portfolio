import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const UserResearchSection () {
  return (
    <section className="h-[720px] relative w-full bg-greys-00 flex items-center justify-center">
      <Card className="w-[1094px] bg-white rounded-[64px] border-[16px] border-solid border-[#f5f5f599] p-0">
        <CardContent className="p-12 flex items-center justify-between">
          <div className="flex flex-col w-[415px] items-start gap-8">
            <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Objectif?
            </h2>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[28px] tracking-[0.02px] leading-[33.6px]">
              Après avoir expliqué le problème, il serait bon de définir
              l&#39;objectif et les indicateurs de réussite.
            </p>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-normal text-transparent text-[17px] tracking-[0.01px] leading-[20.4px]">
              <span className="font-medium text-[#00000099] tracking-[0]">
                Il peut s&#39;agir d&#39;un simple chiffre. Par exemple, en
                résolvant ce problème, nous sommes en mesure d&#39;augmenter le
                nombre d&#39;utilisateurs actifs de{" "}
              </span>
              <span className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black tracking-[0]">
                20%
              </span>
              <span className="font-medium text-[#00000099] tracking-[0]">
                {" "}
                🎉
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center p-10 bg-white rounded-full border-[16px] border-solid border-[#f5f5f599] backdrop-blur-[75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(75px)_brightness(100%)]">
            <Avatar className="w-[88px] h-[88px]">
              <AvatarImage
                src="/image-1310-2.png"
                alt="User avatar"
                className="object-cover"
              />
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
