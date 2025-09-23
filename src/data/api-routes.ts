enum requestType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const apiRoutes = {
  submit: {
    key: "submit",
    link: "api/submit",
    accept: [requestType.POST],
  },
  health: {
    key: "health",
    link: "api/health/check-rmd",
    accept: [requestType.GET],
  },
  healthMgo: {
    key: "health-mgo",
    link: "api/health/check-mgo",
    accept: [requestType.GET],
  },
  ipLookup: {
    key: "ip-lookup",
    link: "api/ip-lookup",
    accept: [requestType.GET],
  },
  imageProxy: {
    key: "image-proxy",
    link: "api/image-proxy",
    accept: [requestType.GET],
  },
  hubValidate: {
    key: "hub-validate",
    link: "api/hub/validate",
    accept: [requestType.POST],
  },
  jsonData: {
    key: "json-data",
    link: "api/json-data",
    accept: [requestType.GET],
  },
  og: {
    key: "og",
    link: "api/og",
    accept: [requestType.GET],
  },
  subscribe: {
    key: "subscribe",
    link: "api/subscribe",
    accept: [requestType.POST],
  },
  sign: {
    key: "sign",
    link: "api/sign",
    accept: [requestType.POST],
  },
  views: {
    key: "views",
    link: "api/views",
    accept: [requestType.GET],
  },
  statsSubscribers: {
    key: "stats-subscribers",
    link: "api/stats/subscribers",
    accept: [requestType.GET],
  },
  statsViews: {
    key: "stats-views",
    link: "api/stats/views",
    accept: [requestType.GET],
  },
};
