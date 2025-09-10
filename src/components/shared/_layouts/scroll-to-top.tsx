"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpOne } from "@aurthle/icons";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Correct calculation for the SVG
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
                className="stroke-zinc-200"
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
                className="transition-all duration-300 ease-out stroke-blue-400"
                strokeLinecap="round"
              />
            </svg>

            {/* Arrow Icon with subtle animation */}
            <div className="flex items-center justify-center relative z-10">
              <ArrowUpOne />
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
