"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import Image from "next/image";

interface HorizontalScrollCarouselProps {
  images?: string[];
  data: { hardwareButtons: string; showInnerFrame: boolean }[];
}

export const HorizontalScrollCarousel: React.FC<
  HorizontalScrollCarouselProps
> = ({ images = [], data }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data.map((phone, index) => (
            <Card
              src={images[index]}
              index={index}
              key={images[index]}
              hardwareButtons={phone.hardwareButtons}
              showInnerFrame={phone.showInnerFrame}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card: React.FC<{
  src: string;
  index: number;
  hardwareButtons: string;
  showInnerFrame: boolean;
}> = ({ src, index, hardwareButtons, showInnerFrame }) => {
  return (
    <div className="relative w-[368px] h-[742.98px]">
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
            src={hardwareButtons}
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

          {showInnerFrame && (
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
  );
};
