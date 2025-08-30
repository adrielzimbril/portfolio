import React from "react";
import { HorizontalScrollCarousel } from "./horizontal-scroll-carousel";
import SmoothScroll from "./horizontal-scroll-carousel copy";
import { SectionLayout } from "@/components/shared/sections/layout";

export function InsightsSection() {
  const phoneData = [
    {
      hardwareButtons: "/hardware-buttons-1.png",
      showInnerFrame: true,
    },
    {
      hardwareButtons: "/hardware-buttons-2.png",
      showInnerFrame: true,
    },
    {
      hardwareButtons: "/hardware-buttons-3.png",
      showInnerFrame: true,
    },
    {
      hardwareButtons: "/hardware-buttons-4.png",
      showInnerFrame: false,
    },
  ];

  return (
    <>
      <SectionLayout
        title="Idéation"
        description="Vous pouvez poser quelques concepts initiaux."
        //className="p-0"
        contentClassName="lg:max-w-[80%] items-start"
        isFlex
      >
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 mx-auto">
          {phoneData.map((phone, index) => (
            <div key={index} className="relative w-[368px] h-[742.98px]">
              <div className="h-[743px]">
                <div className="relative w-[368px] h-[743px]">
                  <img
                    className="absolute w-[362px] h-[743px] top-0 left-[3px]"
                    alt="Iphone shape"
                    src="/iphone-shape.svg"
                  />

                  <img
                    className={`absolute ${
                      index === 3 ? "w-[9px]" : "w-[368px]"
                    } h-[180px] top-[118px] left-0`}
                    alt="Hardware buttons"
                    src={phone.hardwareButtons}
                  />

                  <div className="absolute w-[327px] h-[708px] top-[17px] left-[21px] bg-greys-00 rounded-[20.93px] overflow-hidden">
                    <div className="flex flex-col w-[271px] items-start gap-[6.98px] relative top-[290px] left-7">
                      <div className="relative self-stretch mt-[-0.87px] font-SF-pro-title-02-34 font-[number:var(--SF-pro-title-02-34-font-weight)] text-[#000000de] text-[length:var(--SF-pro-title-02-34-font-size)] tracking-[var(--SF-pro-title-02-34-letter-spacing)] leading-[var(--SF-pro-title-02-34-line-height)] [font-style:var(--SF-pro-title-02-34-font-style)]">
                        😎
                        <br />I made you looked.
                      </div>

                      <div className="relative self-stretch [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                        You can have the rest of the empty space here.
                      </div>
                    </div>
                  </div>

                  {phone.showInnerFrame && (
                    <img
                      className="absolute w-[350px] h-[731px] top-1.5 left-[9px]"
                      alt="Inner screen frame w"
                      src="/inner-screen-frame-w--notch.svg"
                    />
                  )}

                  <div className="absolute w-[60px] h-[7px] top-6 left-[164px]">
                    <div className="absolute w-[41px] h-[7px] top-0 left-0 bg-greys-02 rounded-[53.78px]" />
                    <div className="absolute w-[7px] h-[7px] top-0 left-[53px] bg-greys-02 rounded-[3.37px]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute w-full pointer-events-none h-[249px] bottom-0 left-0 bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
      </SectionLayout>
    </>
  );
}
