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
  data: {
    newsletter: getApiUrl("landlord/newsletter"),
    users: getApiUrl("landlord/users"),
    submissions: getApiUrl("landlord/submissions"),
    hubRequests: getApiUrl("landlord/hub-requests"),
    reactions: getApiUrl("landlord/reactions"),
  },
};
