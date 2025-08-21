import "server-only";

import { appConfig } from "@data/config";
import { cookies } from "next/headers";
import type { Locale } from "@i18n/types";

export async function getUserLocale() {
  const cookie = (await cookies()).get(appConfig.i18n.localeCookieName);
  return cookie?.value ?? appConfig.i18n.defaultLocale;
}

export async function setLocaleCookie(locale: Locale) {
  (await cookies()).set(appConfig.i18n.localeCookieName, locale);
}
