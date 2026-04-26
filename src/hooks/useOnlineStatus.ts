"use client";
import { useEffect, useState } from "react";

function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}

/**
 * Returns the online status of the browser
 *
 * @returns {boolean} The online status of the browser
 *
 * @example
 * const onlineStatus = useOnlineStatus();
 * // returns true or false
 */
export function useOnlineStatus(): boolean {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  useEffect(() => {
    function goOnline() {
      setOnlineStatus(true);
    }
    function goOffline() {
      setOnlineStatus(false);
    }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
}
