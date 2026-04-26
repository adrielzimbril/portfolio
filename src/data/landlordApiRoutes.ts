import { getApiUrl } from "@/utils";

export const landlordApiRoutes = {
  community: {
    messages: getApiUrl("landlord/community/messages"),
    messageById: (id: string) => getApiUrl(`landlord/community/messages/${id}`),
  },
  quests: {
    registrations: getApiUrl("landlord/quests/registrations"),
    registrationById: (id: string) => getApiUrl(`landlord/quests/registrations/${id}`),
    submissions: getApiUrl("landlord/quests/submissions"),
    submissionById: (id: string) => getApiUrl(`landlord/quests/submissions/${id}`),
  },
  hub: {
    requests: getApiUrl("landlord/hub/requests"),
    productLinks: getApiUrl("landlord/hub/product-links"),
  },
  data: {
    newsletter: getApiUrl("landlord/newsletter"),
    users: getApiUrl("landlord/users"),
    submissions: getApiUrl("landlord/submissions"),
    reactions: getApiUrl("landlord/reactions"),
  },
};
