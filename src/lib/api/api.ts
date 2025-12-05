import axios, { AxiosRequestConfig } from "axios";

// Internal API configuration (Next.js API routes)
export const INTERNAL_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Create axios instance for internal API
const internalAxios = axios.create({
  baseURL: INTERNAL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies - they will be sent automatically
});

// Helper function to build internal API endpoint URLs
export function getInternalApiUrl(endpoint: string): string {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${INTERNAL_API_URL}${cleanEndpoint}`;
}

// For internal Next.js API routes
export const apiClient = {
  get: async (endpoint: string, config?: AxiosRequestConfig) => {
    return internalAxios.get(endpoint, config);
  },

  post: async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    return internalAxios.post(endpoint, data, config);
  },

  put: async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    return internalAxios.put(endpoint, data, config);
  },

  patch: async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    return internalAxios.patch(endpoint, data, config);
  },

  delete: async (endpoint: string, config?: AxiosRequestConfig) => {
    return internalAxios.delete(endpoint, config);
  },
};

// Export axios instance for advanced usage
export { internalAxios };
