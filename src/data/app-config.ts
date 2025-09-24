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
  mails: {
    from: string;
    replyTo: string;
  };
  storage: {
    bucketNames: {
      avatars: string;
    };
  };
  contactForm: {
    enabled: boolean;
    to: string;
    subject: string;
  };
};

const BASE_URL = "https://www.adrielzimbril.com";

export const appConfig = {
  // Internationalization
  i18n: {
    // Whether internationalization should be enabled (if disabled, you still need to define the locale you want to use below and set it as the default locale)
    enabled: true,
    // Define all locales here that should be available in the app
    // You need to define a label that is shown in the language selector and a currency that should be used for pricing with this locale
    locales: {
      en: {
        code: "en_US",
        label: "English",
        currency: "USD",
        icon: "USFlag",
        url: BASE_URL,
      },
      fr: {
        code: "fr_FR",
        label: "Français",
        currency: "EUR",
        icon: "FRFlag",
        url: BASE_URL,
      },
      zh_CN: {
        code: "zh_CN",
        label: "中文",
        currency: "RMB",
        icon: "CNFlag",
        url: BASE_URL,
      },
    },
    // The default locale is used if no locale is provided
    defaultLocale: "fr",
    // The default currency is used for pricing if no currency is provided
    defaultCurrency: "EUR",
    // The name of the cookie that is used to determine the locale
    localeCookieName: "NEXT_LOCALE",
  },
  // Mails
  mails: {
    // the from address for mails
    from: "hello@adrielzimbril.com",
    replyTo: "hello@adrielzimbril.com",
  },
  // Storage
  storage: {
    // define the name of the buckets for the different types of files
    bucketNames: {
      avatars: process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME ?? "avatars",
    },
  },
  contactForm: {
    // whether the contact form should be enabled
    enabled: true,
    // the email to which the contact form messages should be sent
    to: "hello@adrielzimbril.com",
    // the subject of the email
    subject: "Contact form message",
  },
} as const satisfies Config;
