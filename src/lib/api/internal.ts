// Internal API client (alias for backward compatibility)
// This file provides the 'internalApi' export that many components are using

import { apiClient, getInternalApiUrl, INTERNAL_API_URL } from "./api";

// Export as internalApi for backward compatibility
export const internalApi = apiClient;

// Re-export other utilities
export { getInternalApiUrl, INTERNAL_API_URL };
