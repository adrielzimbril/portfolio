import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ProjectsSection () {
  const emojiItems = [
    {
      type: "emoji",
      bgImage: "bg-[url(/emoji-false.png)]",
      position: "left",
    },
    {
      type: "card",
      position: "center",
    },
    {
      type: "emoji",
      bgImage: "bg-[url(/emoji-true.png)]",
      position: "right",
    },
  ];

  return (
    <section className="relative w-full h-[772px] bg-greys-00">
      <div className="flex flex-wrap w-[1136px] items-center justify-between gap-[24px_24px] absolute top-[298px] left-[152px]">
        {emojiItems.map((item, index) => {
          if (item.type === "emoji") {
            return (
              <div
                key={index}
                className="inline-flex items-center p-6 relative flex-[0_0_auto] bg-[#f9f9f9] rounded-[120px] overflow-hidden"
              >
                <div
                  className={`${item.bgImage} relative w-[88px] h-[88px] bg-cover bg-[50%_50%]`}
                />
              </div>
            );
          } else {
            return (
              <Card
                key={index}
                className="flex flex-col w-[542px] items-center justify-end p-4 relative bg-greys-01 rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f9f9f9]"
              >
                <CardContent className="flex flex-col h-60 items-center justify-center gap-2.5 px-[34px] py-0 relative w-full bg-white p-0">
                  <div className="flex flex-col items-start gap-[6.98px] relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-0.87px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                      😎
                      <br />I made you looked.
                    </div>

                    <div className="relative self-stretch [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                      You can have the rest of the empty space here.
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 p-[9.6px] absolute top-2 left-[461px] bg-[#f9f9f9] rounded-[120px] overflow-hidden">
                    <img
                      className="relative w-6 h-6"
                      alt="Bold duotone school"
                      src="/bold-duotone---school---book.svg"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>

      <Button className="px-6 py-[13px] absolute top-[630px] left-[582px] bg-greys-08 inline-flex items-center rounded-xl overflow-hidden h-auto">
        <div className="relative w-fit mt-[-1.00px] font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
          Montre-moi tout 🦄
        </div>
      </Button>

      <header className="inline-flex flex-col items-center gap-4 absolute top-[104px] left-[376px]">
        <h1 className="relative w-fit mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] whitespace-nowrap [font-style:var(--SF-pro-title-01-64-font-style)]">
          4 faits amusants sur moi
        </h1>

        <p className="w-[654px] text-text-iconslight-medium-emphasis text-[34px] text-center tracking-[0.02px] leading-[40.8px] relative [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium">
          L&#39;un d&#39;eux est un mensonge. 😋
        </p>
      </header>
    </section>
  );
};
