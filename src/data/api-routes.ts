import { getApiUrl } from "@/utils/base-url";

enum requestType {
  GET,
  POST,
  PUT,
  DELETE,
}

export const apiRoutes = {
  health: {
    key: "health",
    link: getApiUrl("health/check-rmd"),
    accept: [requestType.GET],
  },
};
