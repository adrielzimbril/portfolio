import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";

import { useScrollPercentage } from "react-scroll-percentage";

const SmoothScroll = ({
  phoneData,
  images,
}: {
  phoneData: { hardwareButtons: string; showInnerFrame: boolean }[];
  images: string[];
}) => {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  const scrollPerc = useMotionValue(0);

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useViewportScroll();

  const [containerRef, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0.1,
  });

  useEffect(() => {
    scrollPerc.set(percentage);
  }, [percentage, scrollPerc]);

  const transform = useTransform(
    scrollPerc,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <div ref={containerRef}>
      <div className="scroll-container">
        {percentage}

        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container relative max-w-max flex items-center overflow-hidden h-dvh"
        >
          <div className="thumbnails relative flex gap-4">
            {phoneData.map((phone, index) => (
              <Card
                key={index}
                index={index}
                hardwareButtons={phone.hardwareButtons}
                showInnerFrame={phone.showInnerFrame}
              />
            ))}
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </div>
  );
};

const Card: React.FC<{
  src?: string;
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

export default SmoothScroll;
