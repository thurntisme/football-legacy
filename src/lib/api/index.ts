// Re-export both API clients for convenience
export { apiClient, getInternalApiUrl, INTERNAL_API_URL } from "./api";
export {
  externalApi,
  externalApiClient,
  ExternalApiClient,
  getExternalApiUrl,
  EXTERNAL_API_URL,
  API_GATEWAY_KEY,
} from "./externalApi";

// Example: Combined API service
export const api = {
  // Internal APIs (Next.js routes)
  internal: {
    auth: {
      login: async (credentials: { email: string; password: string }) => {
        const { apiClient } = await import("./api");
        return apiClient.post("/api/auth/login", credentials);
      },
      logout: async () => {
        const { apiClient } = await import("./api");
        return apiClient.post("/api/auth/logout");
      },
      me: async () => {
        const { apiClient } = await import("./api");
        return apiClient.get("/api/auth/me");
      },
    },
  },

  // External APIs (API Gateway)
  external: {
    users: {
      getProfile: async (userId: string) => {
        const { externalApi } = await import("./externalApi");
        return externalApi.get(`users/${userId}`);
      },
      updateProfile: async (userId: string, data: any) => {
        const { externalApi } = await import("./externalApi");
        return externalApi.put(`users/${userId}`, data);
      },
    },
    players: {
      list: async () => {
        const { externalApi } = await import("./externalApi");
        return externalApi.get("players");
      },
      get: async (playerId: string) => {
        const { externalApi } = await import("./externalApi");
        return externalApi.get(`players/${playerId}`);
      },
      create: async (data: any) => {
        const { externalApi } = await import("./externalApi");
        return externalApi.post("players", data);
      },
    },
    teams: {
      list: async () => {
        const { externalApi } = await import("./externalApi");
        return externalApi.get("teams");
      },
      get: async (teamId: string) => {
        const { externalApi } = await import("./externalApi");
        return externalApi.get(`teams/${teamId}`);
      },
    },
  },
};
