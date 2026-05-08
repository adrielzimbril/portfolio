import { routes } from "@/data/routes";
import { getBaseUrl, getImageUrl } from "@/utils";
import {
  User,
  House,
  Mail,
  Linkedin,
  Instagram,
  Github,
  Layersto,
  Dribbble,
  Xtwitter,
  Youtube,
  Figma,
  Tiktok,
  Whatsapp,
  Facebook,
} from "@aurthle/icons";

const BASE_URL = getBaseUrl();

export const siteConfig = {
  name: "Le dealer d'abonnement",
  description:
    "Le dealer d'abonnement - Abonnements à prix réduits pour vos outils préférés : ChatGPT, Gemini, Claude, CapCut, Figma, Canva et plus encore",
  seoDescription:
    "Profitez d'abonnements à prix réduits pour les meilleurs outils : ChatGPT, Gemini, Claude, CapCut, Figma, Canva, Midjourney et bien d'autres. Économisez sur vos abonnements préférés.",
  url: BASE_URL,
  languagePrimary: "fr_FR",
  keywords: [
    "abonnements prix réduits, ChatGPT pas cher, Gemini discount, Claude AI promo, CapCut abonnement, Figma discount, Canva promo, abonnements outils, abonnements SaaS",
  ],
  seo: {
    ogImage: {
      original: getImageUrl("opengraph-image.png"),
    },
    robots: {
      index: true,
      follow: true,
    },
  },
  details: {
    id: "le-dealer-abonnement",
    username: "@ledealerabonnement",
    name: "Le dealer d'abonnement",
    nameShared:
      "Le dealer d'abonnement - Abonnements à prix réduits pour vos outils préférés",
    hook: "Économisez sur vos abonnements préférés �",
    avatar: getImageUrl("/img/me/avatar.png"),
    avatarReal: getImageUrl("/img/me/avatar-real.png"),
  },
  links: {
    navbar: [
      {
        href: routes.shop.link,
        icon: House,
        label: "Shop",
      },
    ],
    contact: {
      email: "hello@adrielzimbril.com",
      tel: "+123456789",
      social: {
        email: {
          name: "hello@adrielzimbril.com",
          key: "email",
          url: "mailto:hello@adrielzimbril.com",
          icon: Mail,
          navbar: false,
          available: true,
        },
        whatsapp: {
          name: "Whatsapp",
          key: "whatsapp",
          url: "https://go.adrielzimbril.com/swh",
          icon: Whatsapp,
          navbar: false,
          available: true,
        },
        facebook: {
          name: "Youtube",
          key: "youtube",
          url: "https://go.adrielzimbril.com/syt",
          icon: Facebook,
          navbar: false,
          available: true,
        },
        tiktok: {
          name: "Tiktok",
          key: "tiktok",
          url: "https://go.adrielzimbril.com/stt",
          icon: Tiktok,
          navbar: false,
          available: false,
        },
        instagram: {
          name: "Instagram",
          key: "instagram",
          url: "https://go.adrielzimbril.com/sin",
          icon: Instagram,
          navbar: true,
          available: true,
        },
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;
