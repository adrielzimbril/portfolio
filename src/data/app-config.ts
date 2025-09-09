import type { Config } from "@/data/app-config-types";

export const appConfig = {
  // Internationalization
  i18n: {
    // Whether internationalization should be enabled (if disabled, you still need to define the locale you want to use below and set it as the default locale)
    enabled: true,
    // Define all locales here that should be available in the app
    // You need to define a label that is shown in the language selector and a currency that should be used for pricing with this locale
    locales: {
      en: {
        currency: "USD",
        label: "English",
      },
      fr: {
        currency: "EUR",
        label: "Français",
      },
    },
    // The default locale is used if no locale is provided
    defaultLocale: "fr",
    // The default currency is used for pricing if no currency is provided
    defaultCurrency: "EUR",
    // The name of the cookie that is used to determine the locale
    localeCookieName: "NEXT_LOCALE",
  },
  // Users
  users: {
    // Whether billing should be enabled for users (above you can enable it for organizations instead)
    enableBilling: true,
    // Whether you want the user to go through an onboarding form after signup (can be defined in the OnboardingForm.tsx)
    enableOnboarding: true,
  },
  // Authentication
  auth: {
    // Whether users should be able to create accounts (otherwise users can only be by admins)
    enableSignup: true,
    // Whether users should be able to sign in with a magic link
    enableMagicLink: true,
    // Whether users should be able to sign in with a social provider
    enableSocialLogin: true,
    // Whether users should be able to sign in with a passkey
    enablePasskeys: true,
    // Whether users should be able to sign in with a password
    enablePasswordLogin: true,
    // Whether users should be activate two factor authentication
    enableTwoFactor: true,
    // where users should be redirected after the sign in
    redirectAfterSignIn: "/app",
    // where users should be redirected after logout
    redirectAfterLogout: "/",
    // how long a session should be valid
    sessionCookieMaxAge: 60 * 60 * 24 * 30,
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
