export const adminApiRoutes = {
  community: {
    messages: "/api/admin/community/messages",
    messageById: (id: string) => `/api/admin/community/messages/${id}`,
  },
  quests: {
    participants: "/api/admin/quests/participants",
    participantById: (id: string) => `/api/admin/quests/participants/${id}`,
  },
};
