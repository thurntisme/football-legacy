# External API Gateway Guide

This guide explains how to use the external API client for connecting to your backend API gateway.

## Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Browser   │─────▶│  Next.js App     │─────▶│  API Gateway    │
│  (Client)   │      │  (Frontend)      │      │  (Backend)      │
└─────────────┘      └──────────────────┘      └─────────────────┘
                            │
                            │ Internal API Routes
                            ▼
                     ┌──────────────────┐
                     │  /api/auth/*     │
                     │  /api/user/*     │
                     └──────────────────┘
```

## Two API Clients

### 1. Internal API Client (`src/lib/api.ts`)
For Next.js API routes (authentication, server-side operations)

```typescript
import { apiClient } from "@/lib/api";

// Calls: http://localhost:3000/api/auth/login
const response = await apiClient.post("/api/auth/login", credentials);
```

### 2. External API Client (`src/lib/externalApi.ts`)
For your backend API gateway (business logic, data operations)

```typescript
import { externalApi } from "@/lib/externalApi";

// Calls: https://api.example.com/users/profile
const { data, ok } = await externalApi.get("users/profile");
```

## Environment Variables

Add to your `.env.local`:

```env
# Internal API (Next.js routes)
NEXT_PUBLIC_API_URL=http://localhost:3000

# External API Gateway
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.example.com
NEXT_PUBLIC_API_GATEWAY_KEY=your-api-key-here
```

## Usage Examples

### Basic Usage

```typescript
import { externalApi } from "@/lib/externalApi";

// GET request
const { data, ok, status } = await externalApi.get("users/123");
if (ok) {
  console.log(data);
}

// POST request
const { data, ok } = await externalApi.post("users", {
  name: "John Doe",
  email: "john@example.com"
});

// PUT request
const { data, ok } = await externalApi.put("users/123", {
  name: "Jane Doe"
});

// PATCH request
const { data, ok } = await externalApi.patch("users/123", {
  email: "jane@example.com"
});

// DELETE request
const { data, ok } = await externalApi.delete("users/123");
```

### With TypeScript Types

```typescript
import { externalApi } from "@/lib/externalApi";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersResponse {
  users: User[];
  total: number;
}

// Type-safe request
const { data, ok } = await externalApi.get<UsersResponse>("users");
if (ok) {
  console.log(data.users); // Typed as User[]
}
```

### Using the Class-Based Client

```typescript
import { ExternalApiClient } from "@/lib/externalApi";

// Create custom instance
const apiClient = new ExternalApiClient(
  "https://custom-api.com",
  "custom-api-key"
);

// Use with automatic error handling
try {
  const user = await apiClient.get<User>("users/123");
  console.log(user);
} catch (error) {
  console.error("Failed to fetch user:", error);
}
```

### In Redux Actions

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import { externalApi } from "@/lib/externalApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, ok } = await externalApi.get(`users/${userId}`);
      if (!ok) {
        return rejectWithValue("Failed to fetch profile");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
```

### In React Components

```typescript
"use client";

import { useEffect, useState } from "react";
import { externalApi } from "@/lib/externalApi";

interface Player {
  id: string;
  name: string;
  position: string;
}

export function PlayersList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, ok } = await externalApi.get<{ players: Player[] }>(
          "players"
        );
        if (ok) {
          setPlayers(data.players);
        }
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
}
```

## Authentication

The external API client automatically includes:

1. **Authorization Header**: Reads token from cookies and adds `Bearer ${token}`
2. **API Gateway Key**: Adds `X-API-Key` header if configured

```typescript
// Automatic headers added:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token-from-cookie>",
  "X-API-Key": "<your-api-gateway-key>"
}
```

## Custom Headers

```typescript
import { externalApi } from "@/lib/externalApi";

const { data } = await externalApi.get("users", {
  headers: {
    "X-Custom-Header": "custom-value",
    "Accept-Language": "en-US"
  }
});
```

## Error Handling

### Simple Error Handling

```typescript
const { data, ok, status } = await externalApi.get("users/123");

if (!ok) {
  if (status === 404) {
    console.error("User not found");
  } else if (status === 401) {
    console.error("Unauthorized");
  } else {
    console.error("Request failed");
  }
}
```

### With Try-Catch (Class-Based Client)

```typescript
import { externalApiClient } from "@/lib/externalApi";

try {
  const user = await externalApiClient.get("users/123");
  console.log(user);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

## API Gateway Integration Examples

### AWS API Gateway

```env
NEXT_PUBLIC_EXTERNAL_API_URL=https://abc123.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_API_GATEWAY_KEY=your-aws-api-key
```

### Azure API Management

```env
NEXT_PUBLIC_EXTERNAL_API_URL=https://your-api.azure-api.net
NEXT_PUBLIC_API_GATEWAY_KEY=your-azure-subscription-key
```

### Google Cloud API Gateway

```env
NEXT_PUBLIC_EXTERNAL_API_URL=https://your-api-gateway-id.uc.gateway.dev
NEXT_PUBLIC_API_GATEWAY_KEY=your-google-api-key
```

### Custom Backend

```env
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_GATEWAY_KEY=your-custom-api-key
```

## Best Practices

1. **Use Type Definitions**: Always define TypeScript interfaces for API responses
2. **Error Handling**: Always check the `ok` status before using data
3. **Loading States**: Show loading indicators during API calls
4. **Environment Variables**: Never commit API keys to git
5. **Retry Logic**: Implement retry logic for critical operations
6. **Caching**: Use React Query or SWR for data caching and revalidation

## Migration from Direct Fetch

**Before:**
```typescript
const response = await fetch("https://api.example.com/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "X-API-Key": apiKey
  }
});
const data = await response.json();
```

**After:**
```typescript
import { externalApi } from "@/lib/externalApi";

const { data, ok } = await externalApi.get("users");
// Token and API key automatically included
```

## Testing

### Mock External API in Tests

```typescript
import { externalApi } from "@/lib/externalApi";

// Mock the API
jest.mock("@/lib/externalApi", () => ({
  externalApi: {
    get: jest.fn(),
    post: jest.fn(),
  }
}));

// In your test
(externalApi.get as jest.Mock).mockResolvedValue({
  data: { users: [] },
  ok: true,
  status: 200
});
```

## Troubleshooting

### CORS Issues
- Ensure your API gateway allows requests from your frontend domain
- Check CORS headers in API gateway configuration

### Authentication Errors
- Verify token is being set correctly in cookies
- Check token format matches what your API expects

### API Key Issues
- Verify `NEXT_PUBLIC_API_GATEWAY_KEY` is set correctly
- Check if your API gateway requires specific header name

### Network Errors
- Verify `NEXT_PUBLIC_EXTERNAL_API_URL` is correct
- Check if API gateway is accessible from your network
