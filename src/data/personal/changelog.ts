import { ChangelogItem } from "@/types/personalData";

export const changelog: ChangelogItem[] = [
  {
    id: "v3.1.0",
    version: "3.1.0",
    date: "2026-04-15",
    type: "feature",
    changes: [
      "Added reaction system with like, heart, celebrate, and insightful reactions.",
      "Integrated reactions into thoughts, projects, hub, and quests inner pages.",
      "Added ReactionBar component with real-time reaction counts.",
      "Created Supabase migration for reaction tables with RLS policies.",
      "Updated stats page to show top viewed and reacted thoughts.",
    ],
  },
  {
    id: "v3.0.0",
    version: "3.0.0",
    date: "2024-04-13",
    type: "milestone",
    changes: [
      "Major UI refactor for a more premium feel.",
      "Added Community Wall with Supabase & GitHub Auth.",
      "New Stats, Toolbox, and Setup pages.",
    ],
  },
  {
    id: "v2.5.0",
    version: "2.5.0",
    date: "2024-03-20",
    type: "feature",
    changes: [
      "Integrated Trigger.dev for background tasks.",
      "Improved mobile responsiveness across all pages.",
    ],
  },
  {
    id: "v2.4.0",
    version: "2.4.0",
    date: "2024-02-15",
    type: "feature",
    changes: [
      "Added dark mode toggle with system preference detection.",
      "Implemented lazy loading for images and components.",
      "New blog post layout with improved typography.",
    ],
  },
  {
    id: "v2.3.0",
    version: "2.3.0",
    date: "2024-01-10",
    type: "improvement",
    changes: [
      "Optimized bundle size by 40% with code splitting.",
      "Improved SEO metadata and structured data.",
      "Added loading skeletons for better perceived performance.",
    ],
  },
  {
    id: "v2.2.0",
    version: "2.2.0",
    date: "2023-12-05",
    type: "feature",
    changes: [
      "Added newsletter subscription form.",
      "Integrated social sharing buttons.",
      "New project showcase with filtering capabilities.",
    ],
  },
  {
    id: "v2.1.0",
    version: "2.1.0",
    date: "2023-11-01",
    type: "improvement",
    changes: [
      "Redesigned navigation with better mobile menu.",
      "Improved color contrast for accessibility.",
      "Added smooth scroll behavior.",
    ],
  },
  {
    id: "v2.0.0",
    version: "2.0.0",
    date: "2023-10-01",
    type: "milestone",
    changes: [
      "Complete rewrite using Next.js 14 and React 18.",
      "Migrated to TypeScript for better type safety.",
      "New design system with shadcn/ui components.",
    ],
  },
  {
    id: "v1.5.0",
    version: "1.5.0",
    date: "2023-09-01",
    type: "feature",
    changes: [
      "Added contact form with email notifications.",
      "Implemented analytics tracking.",
      "New about section with skills visualization.",
    ],
  },
  {
    id: "v1.4.0",
    version: "1.4.0",
    date: "2023-08-01",
    type: "fix",
    changes: [
      "Fixed navigation menu z-index issues.",
      "Resolved image loading errors on slow connections.",
      "Fixed footer alignment on mobile devices.",
    ],
  },
  {
    id: "v1.3.0",
    version: "1.3.0",
    date: "2023-07-01",
    type: "improvement",
    changes: [
      "Improved page load times by optimizing images.",
      "Added meta tags for better social sharing.",
      "Enhanced keyboard navigation support.",
    ],
  },
  {
    id: "v1.2.0",
    version: "1.2.0",
    date: "2023-06-01",
    type: "feature",
    changes: [
      "Added projects gallery with filtering.",
      "Implemented theme switcher.",
      "New footer with social links.",
    ],
  },
  {
    id: "v1.1.0",
    version: "1.1.0",
    date: "2023-05-01",
    type: "improvement",
    changes: [
      "Improved responsive design for tablets.",
      "Added smooth transitions and animations.",
      "Better error handling for API calls.",
    ],
  },
  {
    id: "v1.0.0",
    version: "1.0.0",
    date: "2023-04-01",
    type: "milestone",
    changes: [
      "Initial release of portfolio website.",
      "Basic project showcase.",
      "Contact information and links.",
    ],
  },
];
