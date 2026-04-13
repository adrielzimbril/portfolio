import { ChangelogItem } from "@/types/personalData";

export const changelog: ChangelogItem[] = [
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
];
