import { getApiUrl } from "@/utils/base-url";

enum requestType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const apiRoutes = {
  auth: {
    login: {
      key: "auth-login",
      link: getApiUrl("auth/login"),
      accept: [requestType.POST],
    },
    callback: {
      key: "auth-callback",
      link: getApiUrl("auth/callback"),
      accept: [requestType.GET],
    },
    all: {
      key: "auth-all",
      link: getApiUrl("auth/[...all]"),
      accept: [requestType.GET],
    },
  },
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
  stats: {
    subscribers: {
      key: "stats-subscribers",
      link: getApiUrl("stats/subscribers"),
      accept: [requestType.GET],
    },
  },
  quests: {
    register: (slug: string) => ({
      key: "quests-register",
      link: getApiUrl(`quests/${slug}/register`),
      accept: [requestType.POST],
    }),
    submit: (slug: string) => ({
      key: "quests-submit",
      link: getApiUrl(`quests/${slug}/submit`),
      accept: [requestType.POST],
    }),
    participants: (slug: string) => ({
      key: "quests-participants",
      link: getApiUrl(`quests/${slug}/participants`),
      accept: [requestType.GET],
    }),
  },
  reactions: {
    main: {
      key: "reactions",
      link: getApiUrl("reactions"),
      accept: [requestType.GET, requestType.POST],
    },
    status: {
      key: "reactions-status",
      link: getApiUrl("reactions/status"),
      accept: [requestType.GET],
    },
    sync: {
      key: "reactions-sync",
      link: getApiUrl("reactions/sync"),
      accept: [requestType.POST],
    },
  },
  community: {
    guestbook: {
      key: "guestbook",
      link: getApiUrl("community/guestbook"),
      accept: [requestType.POST],
    },
    messages: {
      key: "community-messages",
      link: getApiUrl("community/messages"),
      accept: [requestType.GET],
    },
  },
};
