import { createInternalApiClient } from "./internalClient";

export const internalApi = createInternalApiClient({
  baseURL:
    process.env.NEXT_INTERNAL_API_BASE_URL || "http://localhost:3000/api",
});
