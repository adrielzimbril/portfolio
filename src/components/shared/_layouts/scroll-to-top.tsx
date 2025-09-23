"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpOne } from "@aurthle/icons";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const ticking = useRef(false);
  const targetProgress = useRef(0); // The true value we want to reach
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      targetProgress.current = (scrollTop / docHeight) * 100;
      setIsVisible(scrollTop > 300);

      if (!ticking.current) {
        ticking.current = true;
        animateProgress();
      }
    };

    const animateProgress = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress.current - prev;
        const step = diff * 0.2; // 0.2 = speed of catchup (20%)
        const next =
          Math.abs(step) < 0.1 ? targetProgress.current : prev + step;
        if (next !== targetProgress.current) {
          animationFrame.current = requestAnimationFrame(animateProgress);
        } else {
          ticking.current = false;
        }
        return next;
      });
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-40 transition-all duration-300 ease-in-out transform">
          <Button
            onClick={scrollToTop}
            className="relative rounded-full p-3 transition-all duration-200 group active:scale-95"
            variant="outline"
            asIcon
            style={{
              width: size + "px",
              height: size + "px",
            }}
          >
            {/* Progress Circle */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                className="stroke-b-base-accent"
              />
              {/* Progress Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="stroke-b-white-invert-sec"
                strokeLinecap="round"
              />
            </svg>

            {/* Arrow Icon */}
            <div className="flex items-center justify-center relative z-10">
              <ArrowUpOne />
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
