import { routes } from "@/data/routes";
import * as AurthleIcons from "@aurthle/icons";
import { getBaseUrl, getImageUrl } from "@/utils";

const BASE_URL = getBaseUrl();

export const siteConfig = {
  name: "Adriel Zimbril",
  description: "Adriel Zimbril - Product designer & Problem Solver for SaaS 🦄",
  seoDescription:
    "J'aide les entrepreneurs et les entreprises à transformer leurs idées en SaaS utiles.",
  url: BASE_URL,
  languagePrimary: "fr_FR",
  languagesArray: ["fr_FR", "en_US", "cn_CN"],
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
    avatar: getImageUrl(routes.avatar.link),
    avatarReal: getImageUrl(routes.avatarReal.link),
  },
  links: {
    navbar: [
      // {
      //   href: routes.home.link,
      //   icon: AuthleIcons.House,
      //   label: routes.home.name,
      // },
      {
        href: routes.contact.link,
        icon: AurthleIcons.User,
        label: routes.contact.name,
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
          icon: AurthleIcons.Mail,
          navbar: false,
          available: true,
        },
        linkedin: {
          name: "LinkedIn",
          key: "linkedin",
          url: "https://go.adrielzimbril.com/link",
          icon: AurthleIcons.Linkedin,
          navbar: true,
          available: true,
        },
        instagram: {
          name: "Instagram",
          key: "instagram",
          url: "https://go.adrielzimbril.com/in",
          icon: AurthleIcons.Instagram,
          navbar: true,
          available: true,
        },
        github: {
          name: "GitHub",
          key: "github",
          url: "https://go.adrielzimbril.com/gh",
          icon: AurthleIcons.Github,
          navbar: true,
          available: true,
        },
        producthunt: {
          name: "Product Hunt",
          key: "product-hunt",
          url: "https://go.adrielzimbril.com/ph",
          icon: "",
          navbar: false,
          available: false,
        },
        peerlist: {
          name: "Peerlist",
          key: "peerlist",
          url: "https://go.adrielzimbril.com/pl",
          icon: "",
          navbar: false,
          available: false,
        },
        layers: {
          name: "Layers",
          key: "layers",
          url: "https://go.adrielzimbril.com/ly",
          icon: AurthleIcons.Layersto,
          navbar: false,
          available: false,
        },
        dribbble: {
          name: "Dribbble",
          key: "dribbble",
          url: "https://go.adrielzimbril.com/db",
          icon: AurthleIcons.Dribbble,
          navbar: true,
          available: false,
        },
        x: {
          name: "X",
          key: "x",
          url: "https://go.adrielzimbril.com/x",
          icon: AurthleIcons.Xtwitter,
          navbar: false,
          available: false,
        },
        youtube: {
          name: "Youtube",
          key: "youtube",
          url: "https://go.adrielzimbril.com/yt",
          icon: AurthleIcons.Youtube,
          navbar: false,
          available: true,
        },
        figma: {
          name: "Figma",
          key: "figma",
          url: "https://go.adrielzimbril.com/fg",
          icon: AurthleIcons.Figma,
          navbar: false,
          available: false,
        },
        tiktok: {
          name: "Tiktok",
          key: "tiktok",
          url: "https://go.adrielzimbril.com/tt",
          icon: AurthleIcons.Tiktok,
          navbar: false,
          available: false,
        },
      },
      socialConcept: {
        youtube: {
          shirosaasLab: {
            name: "Youtube",
            key: "youtube",
            url: "https://go.adrielzimbril.com/yt",
            icon: AurthleIcons.Youtube,
            navbar: false,
            available: true,
          },
        },
      },
    },
  },
  home: {
    sections: {
      showed: {
        talks: true,
        quests: true,
        resources: true,
        projects: true,
        testimonials: true,
        thoughts: true,
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;
