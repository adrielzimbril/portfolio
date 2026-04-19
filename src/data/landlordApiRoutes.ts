import { getApiUrl } from "@/utils";

export const landlordApiRoutes = {
  community: {
    messages: getApiUrl("landlord/community/messages"),
    messageById: (id: string) => getApiUrl(`landlord/community/messages/${id}`),
  },
  data: {
    table: getApiUrl("landlord/data"),
  },
  quests: {
    participants: getApiUrl("landlord/quests/participants"),
    participantById: (id: string) =>
      getApiUrl(`landlord/quests/participants/${id}`),
  },
};
