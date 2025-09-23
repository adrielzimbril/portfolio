"use client";
import { useEffect, useState } from "react";

/**
 * Returns a boolean indicating whether the current window width is less than the specified breakpoint.
 * 
 * @param breakpoint - The breakpoint to use for determining if the current window width is mobile.
 * 
 * @returns A boolean indicating whether the current window width is less than the specified breakpoint.
 * 
 * @example
 * const isMobile = useIsMobile();
 */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkIOS = () =>
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      );
    checkIOS();
  }, []);

  return isIOS;
};

