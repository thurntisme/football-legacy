import axios, { AxiosRequestConfig, AxiosError } from "axios";

// External API Gateway configuration
export const EXTERNAL_API_URL =
  process.env.NEXT_PUBLIC_EXTERNAL_API_URL || "https://api.example.com";

export const API_GATEWAY_KEY = process.env.NEXT_PUBLIC_API_GATEWAY_KEY || "";

// Get auth token from cookies (client-side)
function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((c) => c.trim().startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

// Create axios instance for external API
const externalAxios = axios.create({
  baseURL: EXTERNAL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token and API key
externalAxios.interceptors.request.use(
  (config) => {
    // Add API Gateway key if available
    if (API_GATEWAY_KEY) {
      config.headers["X-API-Key"] = API_GATEWAY_KEY;
    }

    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
externalAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error(
        `API Error [${error.config?.url}]:`,
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

// Helper function to build external API endpoint URLs
export function getExternalApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${EXTERNAL_API_URL}/${cleanEndpoint}`;
}

// External API client for API Gateway
export const externalApi = {
  get: async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; status: number; ok: boolean }> => {
    try {
      const response = await externalAxios.get<T>(endpoint, config);
      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          ok: false,
        };
      }
      throw error;
    }
  },

  post: async <T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; status: number; ok: boolean }> => {
    try {
      const response = await externalAxios.post<T>(endpoint, body, config);
      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          ok: false,
        };
      }
      throw error;
    }
  },

  put: async <T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; status: number; ok: boolean }> => {
    try {
      const response = await externalAxios.put<T>(endpoint, body, config);
      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          ok: false,
        };
      }
      throw error;
    }
  },

  patch: async <T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; status: number; ok: boolean }> => {
    try {
      const response = await externalAxios.patch<T>(endpoint, body, config);
      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          ok: false,
        };
      }
      throw error;
    }
  },

  delete: async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; status: number; ok: boolean }> => {
    try {
      const response = await externalAxios.delete<T>(endpoint, config);
      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          ok: false,
        };
      }
      throw error;
    }
  },
};

// Typed API client with error handling (class-based)
export class ExternalApiClient {
  private axios;

  constructor(baseUrl?: string, apiKey?: string) {
    this.axios = axios.create({
      baseURL: baseUrl || EXTERNAL_API_URL,
      headers: {
        "Content-Type": "application/json",
        ...(apiKey || API_GATEWAY_KEY
          ? { "X-API-Key": apiKey || API_GATEWAY_KEY }
          : {}),
      },
      withCredentials: true,
    });

    // Add token interceptor
    this.axios.interceptors.request.use((config) => {
      const token = getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.get<T>(endpoint, config);
    return response.data;
  }

  async post<T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.post<T>(endpoint, body, config);
    return response.data;
  }

  async put<T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.put<T>(endpoint, body, config);
    return response.data;
  }

  async patch<T = any>(
    endpoint: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.patch<T>(endpoint, body, config);
    return response.data;
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.delete<T>(endpoint, config);
    return response.data;
  }
}

// Default instance
export const externalApiClient = new ExternalApiClient();

// Export axios instance for advanced usage
export { externalAxios };