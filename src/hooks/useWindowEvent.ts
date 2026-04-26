"use client";

import { useEffect } from "react";

export function useWindowEvent(eventName: string, handler: () => void) {
  useEffect(() => {
    const handleEvent = () => {
      handler();
    };

    window.addEventListener(eventName, handleEvent);

    return () => {
      window.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, handler]);
}

export function dispatchWindowEvent(eventName: string) {
  window.dispatchEvent(new CustomEvent(eventName));
}
