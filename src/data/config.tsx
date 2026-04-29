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
} from "@aurthle/icons";

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
      //   icon: House,
      //   label: routes.home.name,
      // },
      {
        href: routes.contact.link,
        icon: User,
        label: "Contact",
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
        linkedin: {
          name: "LinkedIn",
          key: "linkedin",
          url: "https://go.adrielzimbril.com/link",
          icon: Linkedin,
          navbar: true,
          available: true,
        },
        x: {
          name: "X",
          key: "x",
          url: "https://go.adrielzimbril.com/x",
          icon: Xtwitter,
          navbar: false,
          available: false,
        },
        
        github: {
          name: "GitHub",
          key: "github",
          url: "https://go.adrielzimbril.com/gh",
          icon: Github,
          navbar: true,
          available: true,
        },
        githubRepo: {
          name: "GitHub Repository",
          key: "github-repo",
          url: "https://go.adrielzimbril.com/ghr",
          icon: Github,
          navbar: false,
          available: false,
        },
        figma: {
          name: "Figma",
          key: "figma",
          url: "https://go.adrielzimbril.com/fg",
          icon: Figma,
          navbar: true,
          available: true,
        },
        producthunt: {
          name: "Product Hunt",
          key: "product-hunt",
          url: "https://go.adrielzimbril.com/ph",
          icon: "",
          navbar: false,
          available: true,
        },
        youtube: {
          name: "Youtube",
          key: "youtube",
          url: "https://go.adrielzimbril.com/yt",
          icon: Youtube,
          navbar: false,
          available: true,
        },
        tiktok: {
          name: "Tiktok",
          key: "tiktok",
          url: "https://go.adrielzimbril.com/tt",
          icon: Tiktok,
          navbar: false,
          available: false,
        },
        instagram: {
          name: "Instagram",
          key: "instagram",
          url: "https://go.adrielzimbril.com/in",
          icon: Instagram,
          navbar: true,
          available: true,
        },
        peerlist: {
          name: "Peerlist",
          key: "peerlist",
          url: "https://go.adrielzimbril.com/pl",
          icon: "",
          navbar: false,
          available: false,
        },
        dribbble: {
          name: "Dribbble",
          key: "dribbble",
          url: "https://go.adrielzimbril.com/db",
          icon: Dribbble,
          navbar: true,
          available: false,
        },
        layers: {
          name: "Layers",
          key: "layers",
          url: "https://go.adrielzimbril.com/ly",
          icon: Layersto,
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
            icon: Youtube,
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
        talks: false,
        quests: false,
        resources: true,
        projects: true,
        testimonials: true,
        thoughts: false,
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;
