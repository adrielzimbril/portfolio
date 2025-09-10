import { getUserLocale } from "@i18n/lib/locale-cookie";
import { routing } from "@i18n/routing";
import { appConfig } from "@data/app-config";
import { getMessagesForLocale } from "@i18n/hooks/get-message-from-local";
import { getRequestConfig as getRequestConfigOriginal } from "next-intl/server";
import logger from "@/utils/logger";

const getRequestConfig = getRequestConfigOriginal(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = await getUserLocale();
    logger.info(`Step 1: User locale: ${locale}`);
  } else {
    logger.info(`Step 1: Locale found: ${locale}`);
  }

  if (!(routing.locales.includes(locale) && appConfig.i18n.enabled)) {
    locale = routing.defaultLocale;
    logger.info(`Step 2: Locale not found, using default locale: ${locale}`);
  }

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});

export default getRequestConfig;