import { FRFlag } from "@/components/icons/flags/FRFlag";
import { USFlag } from "@/components/icons/flags/USFlag";
import { USFlagRound } from "@/components/icons/flags/USFlagRound";
import { FRFlagRound } from "@/components/icons/flags/FRFlagRound";

export let languageMenu = [
  {
    id: "en",
    name: "English",
    value: "en",
    icon: <USFlag width="20px" height="15px" />,
    iconMobile: <USFlagRound />,
  },
  {
    id: "fr",
    name: "Francais",
    value: "fr",
    icon: <FRFlag width="28px" height="28px" />,
    iconMobile: <FRFlagRound />,
  },
];
