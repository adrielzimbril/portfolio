import { routes } from "@/data/routes";
import * as AurthleIcons from "@aurthle/icons";
import { getBaseUrl, getImageUrl } from "@/utils";

const BASE_URL = getBaseUrl();

export const siteConfig = {
  name: "Adriel Zimbril",
  description: "Adriel Zimbril - Product designer & Problem Solver for SaaS 🦄",
  url: BASE_URL,
  languagePrimary: "fr_FR",
  languagesArray: ["fr_FR", "en_US", "cn_CN"],
  keywords: [
    "Product designer",
    "UI/UX",
    "Freelancer",
    "UI/UX",
    "Developer",
    "React Template",
    "Next.js Template",
    "Tailwind",
    "Shadcn",
    "Tailwind V4",
    "Time Management",
  ],
  seo: {
    ogImage: {
      original: getImageUrl("/og-image.png"),
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
          url: "https://dub.sh/adrielzimbril-linkedin",
          icon: AurthleIcons.Linkedin,
          navbar: true,
          available: true,
        },
        instagram: {
          name: "Instagram",
          key: "instagram",
          url: "https://dub.sh/adrielzimbril-instagram",
          icon: AurthleIcons.Instagram,
          navbar: true,
          available: true,
        },
        github: {
          name: "GitHub",
          key: "github",
          url: "https://dub.sh/adrielzimbril-github",
          icon: AurthleIcons.Github,
          navbar: true,
          available: true,
        },
        producthunt: {
          name: "Product Hunt",
          key: "product-hunt",
          url: "https://dub.sh/adrielzimbril-producthunt",
          icon: "",
          navbar: false,
          available: true,
        },
        peerlist: {
          name: "Peerlist",
          key: "peerlist",
          url: "https://dub.sh/adrielzimbril-peerlist",
          icon: "",
          navbar: false,
          available: true,
        },
        dribbble: {
          name: "Dribbble",
          key: "dribbble",
          url: "https://dub.sh/adrielzimbril-dribbble",
          icon: AurthleIcons.Dribbble,
          navbar: true,
          available: true,
        },
        x: {
          name: "X",
          key: "x",
          url: "https://dub.sh/adrielzimbril-x",
          icon: AurthleIcons.Xtwitter,
          navbar: false,
          available: true,
        },
        youtube: {
          name: "Youtube",
          key: "youtube",
          url: "https://dub.sh/adrielzimbril-youtube",
          icon: AurthleIcons.Youtube,
          navbar: true,
          available: true,
        },
        figma: {
          name: "Figma",
          key: "figma",
          url: "https://dub.sh/adrielzimbril-figma",
          icon: AurthleIcons.Figma,
          navbar: false,
          available: false,
        },
      },
    },
  },
  faqSection: {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about SkyAgent and its features. If you have any other questions, please don't hesitate to contact us.",
    faQitems: [
      {
        id: 1,
        question: "What is an AI Agent?",
        answer:
          "An AI Agent is an intelligent software program that can perform tasks autonomously, learn from interactions, and make decisions to help achieve specific goals. It combines artificial intelligence and machine learning to provide personalized assistance and automation.",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
