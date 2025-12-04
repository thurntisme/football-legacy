# API Architecture Summary

Complete overview of the dual API architecture implemented in your football game app.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Client                        │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌──────────────────┐
│  Internal API │         │   External API   │
│  (Next.js)    │         │   (Gateway)      │
└───────────────┘         └──────────────────┘
        │                         │
        ▼                         ▼
┌───────────────┐         ┌──────────────────┐
│ /api/auth/*   │         │ Backend Services │
│ /api/user/*   │         │ - Players        │
│ (Server-side) │         │ - Teams          │
└───────────────┘         │ - Matches        │
                          │ - Leagues        │
                          └──────────────────┘
```

## Two API Systems

### 1. Internal API (Next.js API Routes)

**Purpose:** Server-side operations, authentication, SSR data

**File:** `src/lib/api.ts`

**Base URL:** `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:3000`)

**Usage:**
```typescript
import { apiClient } from "@/lib/api";
await apiClient.post("/api/auth/login", credentials);
```

**Use Cases:**
- Authentication (login, logout, session)
- Server-side rendering data
- Proxying requests
- Cookie management
- Server-only operations

### 2. External API (API Gateway)

**Purpose:** Business logic, data operations, backend services

**File:** `src/lib/externalApi.ts`

**Base URL:** `NEXT_PUBLIC_EXTERNAL_API_URL` (e.g., `https://api.example.com`)

**Usage:**
```typescript
import { externalApi } from "@/lib/externalApi";
await externalApi.get("players");
```

**Use Cases:**
- CRUD operations (players, teams, matches)
- Business logic
- Data fetching
- Third-party integrations
- Microservices communication

## File Structure

```
src/
├── lib/
│   ├── api.ts                    # Internal API client
│   ├── externalApi.ts            # External API client
│   └── api/
│       └── index.ts              # Combined API service
├── store/
│   └── slices/
│       ├── authSlice.ts          # Uses internal API
│       └── playersSlice.example.ts # Uses external API
└── components/
    └── providers/
        └── AuthInitializer.tsx   # Uses internal API
```

## Environment Variables

```env
# Internal API (Next.js routes)
NEXT_PUBLIC_API_URL=http://localhost:3000

# External API (Gateway)
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.example.com
NEXT_PUBLIC_API_GATEWAY_KEY=your-api-key
```

## Features

### Internal API Client
- ✅ Simple fetch wrapper
- ✅ Automatic URL building
- ✅ Cookie-based auth
- ✅ GET, POST, PUT, DELETE methods

### External API Client
- ✅ Automatic auth token injection
- ✅ API gateway key support
- ✅ TypeScript generics
- ✅ Error handling
- ✅ Response status checking
- ✅ GET, POST, PUT, PATCH, DELETE methods
- ✅ Class-based and functional APIs

## Quick Reference

### Internal API

```typescript
import { apiClient } from "@/lib/api";

// Authentication
await apiClient.post("/api/auth/login", { email, password });
await apiClient.post("/api/auth/logout");
await apiClient.get("/api/auth/me");
```

### External API

```typescript
import { externalApi } from "@/lib/externalApi";

// Players
const { data, ok } = await externalApi.get("players");
await externalApi.post("players", playerData);
await externalApi.put("players/123", updates);
await externalApi.delete("players/123");

// Teams
await externalApi.get("teams");
await externalApi.get("teams/456");

// Matches
await externalApi.get("matches");
await externalApi.post("matches", matchData);
```

### Combined API Service

```typescript
import { api } from "@/lib/api";

// Internal
await api.internal.auth.login(credentials);
await api.internal.auth.logout();

// External
await api.external.players.list();
await api.external.players.get("123");
await api.external.teams.list();
```

## When to Use Which?

| Scenario | Use | Reason |
|----------|-----|--------|
| User login/logout | Internal API | Cookie management, session |
| Fetch players list | External API | Business data from backend |
| Check auth status | Internal API | Server-side verification |
| Create new team | External API | Backend database operation |
| SSR data fetching | Internal API | Server-side rendering |
| Client-side CRUD | External API | Direct backend communication |

## Authentication Flow

```
1. User logs in
   └─> Internal API: POST /api/auth/login
       └─> Sets cookie with token

2. User makes request
   └─> External API: GET /players
       └─> Reads token from cookie
       └─> Adds: Authorization: Bearer <token>
       └─> Adds: X-API-Key: <gateway-key>
       └─> Sends to API Gateway
```

## Benefits

1. **Separation of Concerns**
   - Internal: Server-side operations
   - External: Business logic

2. **Security**
   - Tokens managed server-side
   - API keys not exposed in client code
   - Gateway provides additional security layer

3. **Flexibility**
   - Easy to switch backends
   - Can use different auth strategies
   - Supports microservices

4. **Type Safety**
   - TypeScript support
   - Generic types for responses
   - Compile-time checking

5. **Developer Experience**
   - Simple, consistent API
   - Automatic header management
   - Clear separation of concerns

## Migration Path

### From Direct Fetch

**Before:**
```typescript
const res = await fetch("https://api.example.com/players");
const data = await res.json();
```

**After:**
```typescript
import { externalApi } from "@/lib/externalApi";
const { data, ok } = await externalApi.get("players");
```

### From Axios

**Before:**
```typescript
const { data } = await axios.get("https://api.example.com/players");
```

**After:**
```typescript
import { externalApi } from "@/lib/externalApi";
const { data, ok } = await externalApi.get("players");
```

## Documentation

- **Quick Start:** `API_GATEWAY_QUICK_START.md`
- **Detailed Guide:** `EXTERNAL_API_GUIDE.md`
- **Environment Setup:** `ENV_SETUP.md`
- **Redux Auth:** `REDUX_AUTH_USAGE.md`
- **API Config:** `API_CONFIG_SUMMARY.md`

## Next Steps

1. ✅ Set up environment variables
2. ✅ Configure API gateway URL
3. ✅ Add API gateway key
4. ⬜ Create Redux slices for your entities
5. ⬜ Replace direct fetch calls with API clients
6. ⬜ Add error handling
7. ⬜ Implement loading states
8. ⬜ Add request caching (React Query/SWR)

## Support

For issues or questions:
1. Check the documentation files
2. Review example files in `src/store/slices/`
3. Verify environment variables
4. Check browser console for errors
