export type Config = {
  i18n: {
    enabled: boolean;
    locales: {
      [locale: string]: {
        currency: string;
        label: string;
        icon: React.ReactNode;
        iconMobile: React.ReactNode;
      };
    };
    defaultLocale: string;
    defaultCurrency: string;
    localeCookieName: string;
  };
  users: {
    enableBilling: boolean;
    enableOnboarding: boolean;
  };
  auth: {
    enableSignup: boolean;
    enableMagicLink: boolean;
    enableSocialLogin: boolean;
    enablePasskeys: boolean;
    enablePasswordLogin: boolean;
    enableTwoFactor: boolean;
    redirectAfterSignIn: string;
    redirectAfterLogout: string;
    sessionCookieMaxAge: number;
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
