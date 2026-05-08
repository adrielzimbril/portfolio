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
  name: "Adriel Zimbril",
  description: "Adriel Zimbril - Product designer & Problem Solver for SaaS 🦄",
  seoDescription:
    "J'aide les entrepreneurs et les entreprises à transformer leurs idées en SaaS utiles.",
  url: BASE_URL,
  languagePrimary: "fr_FR",
  keywords: [
    "design produit SaaS, SaaS Adriel Zimbril, Product Designer SaaS, création SaaS, UX UI SaaS",
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
    id: "adrielzimbril",
    username: "@adrielzimbril",
    name: "Adriel Zimbril",
    nameShared:
      "Adriel Zimbril - Product designer & Problem Solver for SaaS 🦄",
    hook: "Let's chat about your next project 👋",
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
