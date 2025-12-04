# Import Guide

Quick reference for importing API clients in your code.

## File Structure

```
src/lib/
├── api/
│   ├── api.ts           # Internal API client
│   ├── internal.ts      # Backward compatible alias (internalApi)
│   ├── externalApi.ts   # External API client
│   └── index.ts         # Combined exports
└── index.ts             # Main lib exports
```

## Import Options

### Option 1: Direct Imports (Recommended)

```typescript
// Internal API
import { apiClient } from "@/lib/api/api";

// Internal API (backward compatible - used in existing code)
import { internalApi } from "@/lib/api/internal";

// External API
import { externalApi } from "@/lib/api/externalApi";

// Note: apiClient and internalApi are the same thing
```

### Option 2: From API Index

```typescript
// Both APIs from one import
import { apiClient, externalApi } from "@/lib/api";
```

### Option 3: From Main Lib Index

```typescript
// From main lib index
import { apiClient, externalApi } from "@/lib";
```

### Option 4: Combined API Service

```typescript
// Structured API service
import { api } from "@/lib/api";

// Usage
await api.internal.auth.login(credentials);
await api.external.players.list();
```

## Current Usage in Project

### Authentication (Internal API)

```typescript
// src/store/slices/authSlice.ts
import { apiClient } from "@/lib/api/api";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const response = await apiClient.post("/api/auth/login", credentials);
    // ...
  }
);
```

### Auth Initializer (Internal API)

```typescript
// src/components/providers/AuthInitializer.tsx
import { apiClient } from "@/lib/api/api";

const response = await apiClient.get("/api/auth/me");
```

### External API Usage (Example)

```typescript
// For external API calls
import { externalApi } from "@/lib/api/externalApi";

const { data, ok } = await externalApi.get("players");
```

## Quick Reference

| What You Need | Import Statement |
|---------------|------------------|
| Internal API only | `import { apiClient } from "@/lib/api/api";` |
| Internal API (legacy) | `import { internalApi } from "@/lib/api/internal";` |
| External API only | `import { externalApi } from "@/lib/api/externalApi";` |
| Both APIs | `import { apiClient, externalApi } from "@/lib/api";` |
| Combined service | `import { api } from "@/lib/api";` |
| Everything | `import { apiClient, externalApi, api } from "@/lib";` |

## TypeScript Types

```typescript
// Import types if needed
import type { ExternalApiClient } from "@/lib/api/externalApi";

// Create custom instance
const customApi = new ExternalApiClient("https://custom-api.com", "api-key");
```

## Best Practices

1. **Use direct imports** for better tree-shaking
2. **Import only what you need** to reduce bundle size
3. **Use the combined API service** for organized code
4. **Keep imports consistent** across your project

## Migration

If you see import errors after the file reorganization:

**Old:**
```typescript
import { apiClient } from "@/lib/api";
import { externalApi } from "@/lib/externalApi";
```

**New:**
```typescript
import { apiClient } from "@/lib/api/api";
import { externalApi } from "@/lib/api/externalApi";
```

Or use the index:
```typescript
import { apiClient, externalApi } from "@/lib/api";
```
