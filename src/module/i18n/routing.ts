import { appConfig } from "@data/app-config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: Object.keys(appConfig.i18n.locales),
  defaultLocale: appConfig.i18n.defaultLocale,
  localeCookie: {
    name: appConfig.i18n.localeCookieName,
  },
  localePrefix: "never",
  localeDetection: appConfig.i18n.enabled,
  alternateLinks: appConfig.i18n.enabled,
});

export const {
  Link: LocaleLink,
  redirect: localeRedirect,
  usePathname: useLocalePathname,
  useRouter: useLocaleRouter,
} = createNavigation(routing);
