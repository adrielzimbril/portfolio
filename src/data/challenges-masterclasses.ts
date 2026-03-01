export type MasterclassRole = "panel" | "author" | "speaker" | "mentor";

export type MasterclassItem = {
  slug: string;
  title: string;
  date: string;
  role: MasterclassRole;
  posterLabel: string;
  description: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
};

export type ChallengeParticipant = {
  name: string;
  role?: string;
  projectTitle: string;
  portfolioUrl?: string;
  figmaUrl?: string;
  projectUrl?: string;
  posterLabel?: string;
  winnerRank?: 1 | 2 | 3;
};

export type ChallengeItem = {
  slug: string;
  title: string;
  tagline: string;
  posterLabel: string;
  details: string;
  startDate: string;
  submissionDeadline: string;
  endDate: string;
  rewards: string[];
  participants: ChallengeParticipant[];
};

export const masterclasses: MasterclassItem[] = [
  {
    slug: "ux-strategy-saas-2025",
    title: "UX Strategy pour SaaS B2B",
    date: "2025-09-14",
    role: "speaker",
    posterLabel: "UX Strategy Live",
    description:
      "Masterclass sur la priorisation UX, les parcours critiques et la conversion produit.",
    links: [
      { label: "Replay", href: "https://go.adrielzimbril.com/yt" },
      { label: "Slides", href: "https://go.adrielzimbril.com/fg" },
    ],
  },
  {
    slug: "design-systems-croissance-2025",
    title: "Design Systems orientés croissance",
    date: "2025-11-21",
    role: "panel",
    posterLabel: "Design Systems Panel",
    description:
      "Discussion orientée exécution sur les systèmes de design qui accélèrent les équipes produit.",
  },
  {
    slug: "audit-ux-atelier-2026",
    title: "Atelier d'audit UX en direct",
    date: "2026-01-18",
    role: "author",
    posterLabel: "UX Audit Workshop",
    description:
      "Session pratique autour de l'analyse heuristique et du plan d'amélioration UX en 60 minutes.",
  },
];

export const challenges: ChallengeItem[] = [
  {
    slug: "saas-landing-breakdown",
    title: "SaaS Landing Breakdown Challenge",
    tagline: "Déconstruire et reconstruire une landing qui convertit.",
    posterLabel: "Landing Challenge",
    details:
      "Pendant ce challenge, chaque participant doit proposer une refonte argumentée d'une landing SaaS existante.",
    startDate: "2026-03-04T00:00:00.000Z",
    submissionDeadline: "2026-03-28T23:59:59.000Z",
    endDate: "2026-04-01T23:59:59.000Z",
    rewards: [
      "Coaching 1:1 de 45 minutes",
      "Mise en avant sur la newsletter",
      "Feedback vidéo détaillé",
    ],
    participants: [
      {
        name: "Clara M.",
        projectTitle: "Refonte Stripe-like onboarding",
        portfolioUrl: "https://example.com/clara",
        figmaUrl: "https://figma.com",
        winnerRank: 1,
      },
      {
        name: "Yanis A.",
        projectTitle: "Landing orientée cas d'usage",
        projectUrl: "https://example.com/yanis",
        winnerRank: 2,
      },
      {
        name: "Fatou K.",
        projectTitle: "Audit + redesign mobile-first",
        portfolioUrl: "https://example.com/fatou",
        winnerRank: 3,
      },
      {
        name: "Leo R.",
        projectTitle: "Version interactive Framer + Figma",
        figmaUrl: "https://figma.com",
      },
    ],
  },
  {
    slug: "dashboard-clarity-sprint",
    title: "Dashboard Clarity Sprint",
    tagline: "Rendre les dashboards produits lisibles et actionnables.",
    posterLabel: "Dashboard Sprint",
    details:
      "Objectif: repenser un dashboard analytics pour réduire la charge cognitive et accélérer la prise de décision.",
    startDate: "2026-04-08T00:00:00.000Z",
    submissionDeadline: "2026-04-24T23:59:59.000Z",
    endDate: "2026-04-30T23:59:59.000Z",
    rewards: [
      "Review publique en live",
      "Badge vainqueur + mention portfolio",
      "Accès prioritaire à la prochaine masterclass",
    ],
    participants: [],
  },
];

export function getMasterclassRoleLabel(role: MasterclassRole): string {
  switch (role) {
    case "panel":
      return "Panel";
    case "author":
      return "Auteur";
    case "speaker":
      return "Speaker";
    case "mentor":
      return "Mentor";
    default:
      return role;
  }
}

export function getChallengeBySlug(slug: string): ChallengeItem | undefined {
  return challenges.find((challenge) => challenge.slug === slug);
}

export function isSubmissionClosed(challenge: ChallengeItem): boolean {
  const now = Date.now();
  const submissionDeadline = new Date(challenge.submissionDeadline).getTime();
  const challengeEnd = new Date(challenge.endDate).getTime();
  return now > submissionDeadline || now > challengeEnd;
}

