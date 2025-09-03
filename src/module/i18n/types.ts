import type { appConfig } from "@data/app-config";
import type messages from "@i18n/translations/en.json";

export type Messages = typeof messages;

export type Locale = keyof (typeof appConfig)["i18n"]["locales"];
