"use client";
import logger from "@/utils/logger";
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
export const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

/**
 * Returns a boolean indicating whether the current window is on iOS.
 *
 * @returns A boolean indicating whether the current window is on iOS.
 *
 * @example
 * const isIOS = useIsIOS(); // true if the current window is on iOS
 */
export const useIsIOS = (): boolean => {
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

/**
 * Returns the major version of iOS.
 *
 * @returns The major version of iOS.
 *
 * @example
 * const iosVersion = getIOSMajorVersion(); // 17, 18, etc.
 */
export const getIOSMajorVersion = (): number => {
  const isIOS =
    /iP(hone|od|ad)/.test(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  if (!isIOS || !navigator) return 20;

  const match = navigator.appVersion.match(/OS (\d+)_?\d*/);

  logger.info("Your iOS version match", match);

  if (!match) return 0;

  return parseInt(match[1] || "0", 10);
};

/**
 * Compare iOS version.
 *
 * @param {number} version - Version to compare
 * @param {'equals' | 'sup' | 'sup-eq' | 'inf' | 'inf-eq'} type - Comparison type
 * @returns {boolean} - true/false if iOS
 *
 * @example
 * compareIOSVersion(17, "equals"); // true if iOS 17
 */
export const useCompareIOSVersion = (
  version: number = 17,
  type: "equals" | "sup" | "sup-eq" | "inf" | "inf-eq" = "inf"
): boolean => {
  const iosVersion = getIOSMajorVersion();

  if (iosVersion < 17) logger.warn("Your iOS version Is Outdated", iosVersion);
  else logger.info("Your iOS version is supported", iosVersion);

  if (iosVersion === 0) return false;

  switch (type) {
    case "equals":
      return iosVersion === version;
    case "sup":
      return iosVersion > version;
    case "sup-eq":
      return iosVersion >= version;
    case "inf":
      return iosVersion < version;
    case "inf-eq":
      return iosVersion <= version;
    default:
      return false;
  }
}; 
