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
  healthMgo: {
    key: "health-mgo",
    link: getPathUrl("/api/health/check-mgo"),
    accept: [requestType.GET],
  },
  ipLookup: {
    key: "ip-lookup",
    link: getPathUrl("/api/ip-lookup"),
    accept: [requestType.GET],
  },
  imageProxy: {
    key: "image-proxy",
    link: getPathUrl("/api/image-proxy"),
    accept: [requestType.GET],
  },
  hubValidate: {
    key: "hub-validate",
    link: getPathUrl("/api/hub/validate"),
    accept: [requestType.POST],
  },
  jsonData: {
    key: "json-data",
    link: getPathUrl("/api/json-data"),
    accept: [requestType.GET],
  },
  og: {
    key: "og",
    link: getPathUrl("/api/og"),
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
  statsViews: {
    key: "stats-views",
    link: getPathUrl("/api/stats/views"),
    accept: [requestType.GET],
  },
};
