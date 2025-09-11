import type { appConfig } from "@data/app-config";

import type messages from "@module/i18n/translations/fr.json";

export type Messages = typeof messages; 

export type Locale = keyof (typeof appConfig)["i18n"]["locales"];
