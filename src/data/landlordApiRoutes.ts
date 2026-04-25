import { getApiUrl } from "@/utils";

export const landlordApiRoutes = {
  community: {
    messages: getApiUrl("landlord/community/messages"),
    messageById: (id: string) => getApiUrl(`landlord/community/messages/${id}`),
  },
  quests: {
    participants: getApiUrl("landlord/quests/participants"),
    participantById: (id: string) => getApiUrl(`landlord/quests/participants/${id}`),
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
