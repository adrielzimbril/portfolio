import { getPathUrl } from "@/utils";

enum requestType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const apiRoutes = {
  submit: {
    key: "submit",
    link: getPathUrl("/api/submit"),
    accept: [requestType.POST],
  },
  health: {
    key: "health",
    link: getPathUrl("/api/health/check-rmd"),
    accept: [requestType.GET],
  },
  imageProxy: {
    key: "image-proxy",
    link: getPathUrl("/api/image-proxy"),
    accept: [requestType.GET],
  },
  subscribe: {
    key: "subscribe",
    link: getPathUrl("/api/subscribe"),
    accept: [requestType.POST],
  },
  sign: {
    key: "sign",
    link: getPathUrl("/api/sign"),
    accept: [requestType.POST],
  },
  views: {
    key: "views",
    link: getPathUrl("/api/views"),
    accept: [requestType.GET],
  },
  statsSubscribers: {
    key: "stats-subscribers",
    link: getPathUrl("/api/stats/subscribers"),
    accept: [requestType.GET],
  },
  questsRegister: (slug: string) => ({
    key: "quests-register",
    link: getPathUrl(`/api/quests/${slug}/register`),
    accept: [requestType.POST],
  }),
  questsSubmit: (slug: string) => ({
    key: "quests-submit",
    link: getPathUrl(`/api/quests/${slug}/submit`),
    accept: [requestType.POST],
  }),
  questsParticipants: (slug: string) => ({
    key: "quests-participants",
    link: getPathUrl(`/api/quests/${slug}/participants`),
    accept: [requestType.GET],
  }),
};
