import { cn } from "@/utils/utils";
import { routes } from "./route";
import * as AurthleIcons from "@aurthle/icons";
import { getBaseUrl } from "@/utils";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "p-1 py-0.5 font-medium dark:font-semibold text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
};

export const BLUR_FADE_DELAY = 0.15;

const BASE_URL = getBaseUrl();

export const siteConfig = {
  name: "Adriel Zimbril",
  description: "Adriel Zimbril - Product designer & Problem Solver for SaaS 🦄",
  url: BASE_URL,
  languages: [
    {
      code: "en",
      name: "English",
      href: "/",
    },
    {
      code: "fr",
      name: "Français",
      href: "/fr",
    },
  ],
  languagePrimary: "en_US",
  languagesArray: ["en_US", "fr_FR"],
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
      original: `${BASE_URL}/og-image.png`,
    },
    robots: {
      index: true,
      follow: true,
    },
    languages: {
      en: { name: "English", alternateUrl: BASE_URL },
      fr: { name: "Français", alternateUrl: BASE_URL },
      cn: { name: "中文", alternateUrl: BASE_URL },
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
    twitter: "https://twitter.com/adrielzimbril",
    discord: "https://discord.gg/adrielzimbril",
    github: "https://github.com/adrielzimbril",
    instagram: "https://instagram.com/adrielzimbril",
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
        github: {
          name: "GitHub",
          url: "https://dub.sh/adrielzimbril-github",
          icon: AurthleIcons.Github,
          navbar: true,
        },
        linkedin: {
          name: "LinkedIn",
          url: "https://dub.sh/adrielzimbril-linkedin",
          icon: AurthleIcons.Linkedin,
          navbar: true,
        },
        x: {
          name: "X",
          url: "https://dub.sh/adrielzimbril-x",
          icon: AurthleIcons.X,
          navbar: true,
        },
        youtube: {
          name: "Youtube",
          url: "https://dub.sh/adrielzimbril-youtube",
          icon: AurthleIcons.Youtube,
          navbar: true,
        },
        producthunt: {
          name: "Product Hunt",
          url: "https://dub.sh/adrielzimbril-producthunt",
          icon: AurthleIcons.Layersto,
          navbar: true,
        },
        dribbble: {
          name: "Dribbble",
          url: "https://dub.sh/adrielzimbril-dribbble",
          icon: AurthleIcons.Dribbble,
          navbar: true,
        },
        email: {
          name: "Send Email",
          url: "#",
          icon: AurthleIcons.Mail,

          navbar: false,
        },
      },
    },
  },
  testimonials: [
    {
      id: "1",
      name: "Alex Rivera",
      role: "CTO at InnovateTech",
      img: "https://randomuser.me/api/portraits/men/91.jpg",
      description: (
        <p>
          The AI-driven analytics from #QuantumInsights have revolutionized our
          product development cycle.
          <Highlight>
            Insights are now more accurate and faster than ever.
          </Highlight>{" "}
          A game-changer for tech companies.
        </p>
      ),
    },
    {
      id: "2",
      name: "Samantha Lee",
      role: "Marketing Director at NextGen Solutions",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description: (
        <p>
          Implementing #AIStream&apos;s customer prediction model has
          drastically improved our targeting strategy.
          <Highlight>Seeing a 50% increase in conversion rates!</Highlight>{" "}
          Highly recommend their solutions.
        </p>
      ),
    },
    {
      id: "3",
      name: "Raj Patel",
      role: "Founder & CEO at StartUp Grid",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description: (
        <p>
          As a startup, we need to move fast and stay ahead. #CodeAI&apos;s
          automated coding assistant helps us do just that.
          <Highlight>Our development speed has doubled.</Highlight> Essential
          tool for any startup.
        </p>
      ),
    },
    {
      id: "4",
      name: "Emily Chen",
      role: "Product Manager at Digital Wave",
      img: "https://randomuser.me/api/portraits/women/83.jpg",
      description: (
        <p>
          #VoiceGen&apos;s AI-driven voice synthesis has made creating global
          products a breeze.
          <Highlight>Localization is now seamless and efficient.</Highlight> A
          must-have for global product teams.
        </p>
      ),
    },
    {
      id: "5",
      name: "Michael Brown",
      role: "Data Scientist at FinTech Innovations",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      description: (
        <p>
          Leveraging #DataCrunch&apos;s AI for our financial models has given us
          an edge in predictive accuracy.
          <Highlight>
            Our investment strategies are now powered by real-time data
            analytics.
          </Highlight>{" "}
          Transformative for the finance industry.
        </p>
      ),
    },
    {
      id: "6",
      name: "Linda Wu",
      role: "VP of Operations at LogiChain Solutions",
      img: "https://randomuser.me/api/portraits/women/5.jpg",
      description: (
        <p>
          #LogiTech&apos;s supply chain optimization tools have drastically
          reduced our operational costs.
          <Highlight>
            Efficiency and accuracy in logistics have never been better.
          </Highlight>{" "}
        </p>
      ),
    },
    {
      id: "7",
      name: "Carlos Gomez",
      role: "Head of R&D at EcoInnovate",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      description: (
        <p>
          By integrating #GreenTech&apos;s sustainable energy solutions,
          we&apos;ve seen a significant reduction in carbon footprint.
          <Highlight>
            Leading the way in eco-friendly business practices.
          </Highlight>{" "}
          Pioneering change in the industry.
        </p>
      ),
    },
    {
      id: "8",
      name: "Aisha Khan",
      role: "Chief Marketing Officer at Fashion Forward",
      img: "https://randomuser.me/api/portraits/women/56.jpg",
      description: (
        <p>
          #TrendSetter&apos;s market analysis AI has transformed how we approach
          fashion trends.
          <Highlight>
            Our campaigns are now data-driven with higher customer engagement.
          </Highlight>{" "}
          Revolutionizing fashion marketing.
        </p>
      ),
    },
    {
      id: "9",
      name: "Tom Chen",
      role: "Director of IT at HealthTech Solutions",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
      description: (
        <p>
          Implementing #MediCareAI in our patient care systems has improved
          patient outcomes significantly.
          <Highlight>
            Technology and healthcare working hand in hand for better health.
          </Highlight>{" "}
          A milestone in medical technology.
        </p>
      ),
    },
    {
      id: "10",
      name: "Sofia Patel",
      role: "CEO at EduTech Innovations",
      img: "https://randomuser.me/api/portraits/women/73.jpg",
      description: (
        <p>
          #LearnSmart&apos;s AI-driven personalized learning plans have doubled
          student performance metrics.
          <Highlight>
            Education tailored to every learner&apos;s needs.
          </Highlight>{" "}
          Transforming the educational landscape.
        </p>
      ),
    },
    {
      id: "11",
      name: "Jake Morrison",
      role: "CTO at SecureNet Tech",
      img: "https://randomuser.me/api/portraits/men/25.jpg",
      description: (
        <p>
          With #CyberShield&apos;s AI-powered security systems, our data
          protection levels are unmatched.
          <Highlight>
            Ensuring safety and trust in digital spaces.
          </Highlight>{" "}
          Redefining cybersecurity standards.
        </p>
      ),
    },
    {
      id: "12",
      name: "Nadia Ali",
      role: "Product Manager at Creative Solutions",
      img: "https://randomuser.me/api/portraits/women/78.jpg",
      description: (
        <p>
          #DesignPro&apos;s AI has streamlined our creative process, enhancing
          productivity and innovation.
          <Highlight>Bringing creativity and technology together.</Highlight> A
          game-changer for creative industries.
        </p>
      ),
    },
    {
      id: "13",
      name: "Omar Farooq",
      role: "Founder at Startup Hub",
      img: "https://randomuser.me/api/portraits/men/54.jpg",
      description: (
        <p>
          #VentureAI&apos;s insights into startup ecosystems have been
          invaluable for our growth and funding strategies.
          <Highlight>
            Empowering startups with data-driven decisions.
          </Highlight>{" "}
          A catalyst for startup success.
        </p>
      ),
    },
  ],
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
      {
        id: 2,
        question: "How does SkyAgent work?",
        answer:
          "SkyAgent works by analyzing your requirements, leveraging advanced AI algorithms to understand context, and executing tasks based on your instructions. It can integrate with your workflow, learn from feedback, and continuously improve its performance.",
      },
      {
        id: 3,
        question: "How secure is my data?",
        answer:
          "We implement enterprise-grade security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is protected according to industry best practices and compliance standards.",
      },
      {
        id: 4,
        question: "Can I integrate my existing tools?",
        answer:
          "Yes, SkyAgent is designed to be highly compatible with popular tools and platforms. We offer APIs and pre-built integrations for seamless connection with your existing workflow tools and systems.",
      },
      {
        id: 5,
        question: "Is there a free trial available?",
        answer:
          "Yes, we offer a 14-day free trial that gives you full access to all features. No credit card is required to start your trial, and you can upgrade or cancel at any time.",
      },
      {
        id: 6,
        question: "How does SkyAgent save me time?",
        answer:
          "SkyAgent automates repetitive tasks, streamlines workflows, and provides quick solutions to common challenges. This automation and efficiency can save hours of manual work, allowing you to focus on more strategic activities.",
      },
    ],
  },
  footerLinks: [
    {
      title: "Company",
      links: [
        { id: 1, title: "About", url: "#" },
        { id: 2, title: "Contact", url: "#" },
        { id: 3, title: "Blog", url: "#" },
        { id: 4, title: "Story", url: "#" },
      ],
    },
    {
      title: "Products",
      links: [
        { id: 5, title: "Company", url: "#" },
        { id: 6, title: "Product", url: "#" },
        { id: 7, title: "Press", url: "#" },
        { id: 8, title: "More", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: 9, title: "Press", url: "#" },
        { id: 10, title: "Careers", url: "#" },
        { id: 11, title: "Newsletters", url: "#" },
        { id: 12, title: "More", url: "#" },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
