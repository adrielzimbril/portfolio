import { getApiUrl } from "@/utils/base-url";

enum requestType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const apiRoutes = {
  submit: {
    key: "submit",
    link: getApiUrl("submit"),
    accept: [requestType.POST],
  },
  health: {
    key: "health",
    link: getApiUrl("health/check-rmd"),
    accept: [requestType.GET],
  },
  imageProxy: {
    key: "image-proxy",
    link: getApiUrl("image-proxy"),
    accept: [requestType.GET],
  },
  subscribe: {
    key: "subscribe",
    link: getApiUrl("subscribe"),
    accept: [requestType.POST],
  },
  sign: {
    key: "sign",
    link: getApiUrl("sign"),
    accept: [requestType.POST],
  },
  views: {
    key: "views",
    link: getApiUrl("views"),
    accept: [requestType.GET],
  },
  statsSubscribers: {
    key: "stats-subscribers",
    link: getApiUrl("stats/subscribers"),
    accept: [requestType.GET],
  },
  questsRegister: (slug: string) => ({
    key: "quests-register",
    link: getApiUrl(`quests/${slug}/register`),
    accept: [requestType.POST],
  }),
  questsSubmit: (slug: string) => ({
    key: "quests-submit",
    link: getApiUrl(`quests/${slug}/submit`),
    accept: [requestType.POST],
  }),
  questsParticipants: (slug: string) => ({
    key: "quests-participants",
    link: getApiUrl(`quests/${slug}/participants`),
    accept: [requestType.GET],
  }),
};
