import { ConnectionItem } from "@/types/personalData";

export const connections: ConnectionItem[] = [
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/adrielzimbril",
    icon: "/icons/github.svg",
    description: "Where I host my open-source projects.",
    active: true,
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/adriel-zimbril",
    icon: "/icons/linkedin.svg",
    description: "Professional networking and detailed background.",
    active: true,
  },
  {
    id: "x",
    platform: "X / Twitter",
    url: "https://x.com/adrielzimbril",
    icon: "/icons/x.svg",
    description: "Daily dev thoughts and tech news.",
    active: true,
  },
  {
    id: "polywork",
    platform: "Polywork",
    url: "https://polywork.com/adrielzimbril",
    icon: "/icons/polywork.svg",
    description: "Professional timeline and collaboration.",
    active: true,
  },
];
