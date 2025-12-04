# Axios Migration Complete

All API clients have been migrated from `fetch` to `axios` for better features and developer experience.

## What Changed

### Before (fetch)
```typescript
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
const json = await response.json();
```

### After (axios)
```typescript
const response = await apiClient.post(endpoint, data);
// response.data is already parsed JSON
```

## Benefits of Axios

### 1. **Automatic JSON Parsing**
- No need to call `.json()` on responses
- Request bodies automatically stringified

### 2. **Interceptors**
- Automatic auth token injection
- Automatic API key injection
- Global error handling
- Request/response transformation

### 3. **Better Error Handling**
- Distinguishes between network errors and HTTP errors
- Provides detailed error information
- Consistent error format

### 4. **Request Cancellation**
- Built-in support for canceling requests
- Useful for cleanup in React components

### 5. **Progress Tracking**
- Upload/download progress events
- Useful for file uploads

### 6. **Timeout Support**
- Easy to configure request timeouts
- Prevents hanging requests

## Updated API Clients

### Internal API (`src/lib/api/api.ts`)

```typescript
import { apiClient } from "@/lib/api/api";

// GET request
const response = await apiClient.get("/api/auth/me");
console.log(response.data); // Already parsed

// POST request
const response = await apiClient.post("/api/auth/login", {
  email: "user@example.com",
  password: "password"
});

// PUT request
await apiClient.put("/api/user/profile", userData);

// DELETE request
await apiClient.delete("/api/user/account");
```

**Response Format:**
```typescript
{
  data: any,        // Response data (already parsed)
  status: number,   // HTTP status code
  statusText: string,
  headers: object,
  config: object
}
```

### External API (`src/lib/api/externalApi.ts`)

```typescript
import { externalApi } from "@/lib/api/externalApi";

// GET request
const { data, ok, status } = await externalApi.get("players");

// POST request
const { data, ok } = await externalApi.post("players", playerData);

// PUT request
await externalApi.put("players/123", updates);

// DELETE request
await externalApi.delete("players/123");
```

**Response Format:**
```typescript
{
  data: T,          // Response data
  status: number,   // HTTP status code
  ok: boolean       // true if status 200-299
}
```

## Interceptors

### External API Interceptors

**Request Interceptor:**
- Automatically adds `Authorization: Bearer <token>` header
- Automatically adds `X-API-Key` header
- Reads token from cookies

**Response Interceptor:**
- Logs errors with context
- Handles network errors
- Provides detailed error information

### Custom Interceptors

You can add your own interceptors:

```typescript
import { externalAxios } from "@/lib/api/externalApi";

// Add request interceptor
externalAxios.interceptors.request.use(
  (config) => {
    // Modify request before sending
    config.headers["X-Custom-Header"] = "value";
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
externalAxios.interceptors.response.use(
  (response) => {
    // Transform response data
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

## Error Handling

### Axios Errors

```typescript
import axios from "axios";

try {
  const response = await apiClient.post("/api/auth/login", credentials);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("No response received");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
  }
}
```

### External API Error Handling

The `externalApi` client catches errors and returns them in the response:

```typescript
const { data, ok, status } = await externalApi.post("auth/login", credentials);

if (!ok) {
  // Handle error
  console.error("Error:", data.message);
  console.error("Status:", status);
}
```

## Advanced Usage

### Custom Config

```typescript
// Timeout
await apiClient.get("/api/data", {
  timeout: 5000 // 5 seconds
});

// Custom headers
await apiClient.post("/api/data", data, {
  headers: {
    "X-Custom-Header": "value"
  }
});

// Cancel token
const source = axios.CancelToken.source();

apiClient.get("/api/data", {
  cancelToken: source.token
});

// Cancel request
source.cancel("Request canceled");
```

### Progress Tracking

```typescript
await apiClient.post("/api/upload", formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`Upload: ${percentCompleted}%`);
  }
});
```

### Response Transformation

```typescript
await apiClient.get("/api/data", {
  transformResponse: [(data) => {
    // Transform response data
    return JSON.parse(data);
  }]
});
```

## Migration Guide

### For Internal API (apiClient)

**Before:**
```typescript
const res = await apiClient.post("/api/auth/login", data);
const json = await res.json();
if (json.success) { ... }
```

**After:**
```typescript
const res = await apiClient.post("/api/auth/login", data);
if (res.data.success) { ... }
```

### For External API (externalApi)

**No changes needed!** The interface remains the same:

```typescript
const { data, ok, status } = await externalApi.get("endpoint");
```

## Configuration

### Axios Instances

Both API clients export their axios instances for advanced usage:

```typescript
import { internalAxios } from "@/lib/api/api";
import { externalAxios } from "@/lib/api/externalApi";

// Configure defaults
internalAxios.defaults.timeout = 10000;
externalAxios.defaults.timeout = 15000;

// Add interceptors
internalAxios.interceptors.request.use(...);
```

## Testing

### Mock Axios in Tests

```typescript
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Mock GET request
mock.onGet("/api/users").reply(200, {
  users: [{ id: 1, name: "John" }]
});

// Mock POST request
mock.onPost("/api/auth/login").reply(200, {
  token: "fake-token",
  user: { id: 1 }
});
```

## Performance

### Benefits
- ✅ Automatic request/response transformation
- ✅ Built-in caching support
- ✅ Request deduplication
- ✅ Smaller bundle size than fetch polyfills
- ✅ Better browser compatibility

### Considerations
- Axios adds ~13KB to bundle (gzipped)
- Already included in your dependencies
- No additional setup needed

## Next Steps

1. ✅ All API clients migrated to axios
2. ✅ Interceptors configured
3. ✅ Error handling improved
4. ⬜ Add request cancellation where needed
5. ⬜ Add progress tracking for uploads
6. ⬜ Configure custom timeouts if needed

---

**Status:** Axios migration complete
**Date:** December 4, 2025
