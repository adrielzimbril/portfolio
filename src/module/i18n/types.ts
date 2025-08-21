import type { appConfig } from "@data/config";
import type messages from "./translations/en.json";

export type Messages = typeof messages;

export type Locale = keyof (typeof appConfig)["i18n"]["locales"];
