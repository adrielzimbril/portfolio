export const landlordApiRoutes = {
  community: {
    messages: "/api/landlord/community/messages",
    messageById: (id: string) => `/api/landlord/community/messages/${id}`,
  },
  quests: {
    participants: "/api/landlord/quests/participants",
    participantById: (id: string) => `/api/landlord/quests/participants/${id}`,
  },
};
