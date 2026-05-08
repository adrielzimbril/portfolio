export type Config = {
  i18n: {
    enabled: boolean;
    locales: {
      [locale: string]: {
        code: string;
        label: string;
        currency: string;
        icon: string;
        url: string;
      };
    };
    defaultLocale: string;
    defaultCurrency: string;
    localeCookieName: string;
  };
};

const BASE_URL = "https://shop.adrielzimbril.com";

export const appConfig = {
  // Internationalization
  i18n: {
    // Whether internationalization should be enabled (if disabled, you still need to define the locale you want to use below and set it as the default locale)
    enabled: true,
    // Define all locales here that should be available in the app
    // You need to define a label that is shown in the language selector and a currency that should be used for pricing with this locale
    locales: {
      fr: {
        code: "fr_FR",
        label: "Français",
        currency: "XOF",
        icon: "FRFlag",
        url: BASE_URL,
      },
    },
    // The default locale is used if no locale is provided
    defaultLocale: "fr",
    // The default currency is used for pricing if no currency is provided
    defaultCurrency: "XOF",
    // The name of the cookie that is used to determine the locale
    localeCookieName: "NEXT_LOCALE",
  },
} as const satisfies Config;
