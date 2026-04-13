import { getUserLocale } from "@/integrations/i18n/lib/locale-cookie";
import { routing } from "@/integrations/i18n/routing";
import { appConfig } from "@data/app-config";
import { getMessagesForLocale } from "@/integrations/i18n/hooks/get-message-from-local";
import { getRequestConfig as getRequestConfigOriginal } from "next-intl/server";

const getRequestConfig = getRequestConfigOriginal(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = await getUserLocale();
  }

  if (!(routing.locales.includes(locale) && appConfig.i18n.enabled)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});

export default getRequestConfig;
