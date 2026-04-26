"use server";

import { setLocaleCookie } from "@/integrations/i18n/lib/locale-cookie";
import type { Locale } from "@/integrations/i18n/types";
import { clearCache } from "@/utils";

export async function updateLocale(locale: Locale) {
  await setLocaleCookie(locale);
  clearCache();
}
