"use client";

import { useState, useCallback } from "react";

export interface CookieOptions {
  days?: number;
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

/**
 * Builds the cookie attributes string from the options.
 */
function buildCookieAttributes(options: CookieOptions): string {
  const parts: string[] = [];

  if (options.expires instanceof Date) {
    parts.push(`expires=${options.expires.toUTCString()}`);
  } else if (typeof options.days === "number") {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    parts.push(`expires=${date.toUTCString()}`);
  }

  if (typeof options.maxAge === "number") {
    parts.push(`max-age=${options.maxAge}`);
  }

  parts.push(`path=${options.path ?? "/"}`);

  if (options.domain) {
    parts.push(`domain=${options.domain}`);
  }

  if (options.secure) {
    parts.push("secure");
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.length > 0 ? `; ${parts.join("; ")}` : "";
}

/**
 * Sets a cookie with the given name, value, and options.
 */
function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  // Prevent server-side execution (Node/SSR):
  if (typeof document === "undefined") {
    return;
  }

  const encodedValue = encodeURIComponent(value);
  const attributes = buildCookieAttributes(options);
  document.cookie = `${name}=${encodedValue}${attributes}`;
}

/**
 * Gets the value of a cookie with the given name.
 */
function getCookie(name: string): string | null {
  // Prevent server-side execution (Node/SSR):
  if (typeof document === "undefined") {
    return null;
  }

  const nameEq = `${name}=`;
  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nameEq) === 0) {
      return decodeURIComponent(c.substring(nameEq.length));
    }
  }
  return null;
}

/**
 * Deletes a cookie with the given name.
 */
function deleteCookie(name: string, options: CookieOptions = {}): void {
  // Prevent server-side execution (Node/SSR):
  if (typeof document === "undefined") {
    return;
  }

  // Ensure the same path/domain so that the deletion matches the existing cookie.
  setCookie(name, "", {
    ...options,
    days: -1,
  });
}

/**
 * A universal React hook for managing a single cookie **as JSON**.
 *
 * @param {string} cookieName - The name of the cookie
 * @param {T | undefined} defaultValue - The default value of the cookie
 * @param {CookieOptions} options - The options for the cookie
 *
 * @returns {[T, (value: T, overrideOptions?: CookieOptions) => void, () => void]} A tuple containing the current value, a function to update it, and a function to remove it
 *
 * @example
 * const [value, setValue, removeValue] = useCookie("key", initialValue);
 * // Use the value
 *
 * const [consentCookieValue, setConsentCookieValue, removeCookieConsent] =
 *   useCookie("consent_cookie", defaultConsent, {
 *     days: 365,
 *     sameSite: "lax",
 *     secure: true,
 *   });
 *
 * // Get the cookie
 * console.log(consentCookieValue);
 *
 * // Update the cookie
 * setConsentCookieValue({ accepted: true });
 *
 * // Remove the cookie
 * removeCookieConsent();
 */
export function useCookie<T = unknown>(
  cookieName: string,
  defaultValue?: T,
  options: CookieOptions = {}
): [T, (value: T, overrideOptions?: CookieOptions) => void, () => void] {
  const [cookieValue, setCookieValue] = useState<T>(() => {
    // Note: On the server (SSR), getCookie() returns null anyway due to the guard above.
    const rawCookie = getCookie(cookieName);
    if (rawCookie !== null) {
      try {
        return JSON.parse(rawCookie) as T;
      } catch {
        return defaultValue as T;
      }
    }
    return defaultValue as T;
  });

  const updateCookie = useCallback(
    (value: T, overrideOptions: CookieOptions = {}) => {
      const mergedOptions = { ...options, ...overrideOptions };
      const stringifiedValue = JSON.stringify(value);
      setCookie(cookieName, stringifiedValue, mergedOptions);
      setCookieValue(value);
    },
    [cookieName, options]
  );

  const removeCookie = useCallback(() => {
    deleteCookie(cookieName, options);
    setCookieValue(defaultValue as T);
  }, [cookieName, defaultValue, options]);

  return [cookieValue, updateCookie, removeCookie];
}

export default useCookie;
