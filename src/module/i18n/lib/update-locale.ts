"use server";

import { setLocaleCookie } from "@i18n/lib/locale-cookie";
import type { Locale } from "@i18n/types";
import { clearCache } from "@/utils/cache";

export async function updateLocale(locale: Locale) {
  await setLocaleCookie(locale);
  clearCache();
}
