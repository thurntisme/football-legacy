# API Quick Reference Card

## Import Cheat Sheet

```typescript
// Internal API (Next.js routes)
import { apiClient } from "@/lib/api/api";
import { internalApi } from "@/lib/api/internal";  // Same as apiClient

// External API (Gateway)
import { externalApi } from "@/lib/api/externalApi";
import { externalApi } from "@/lib/api/external";  // Alias

// Both from one import
import { apiClient, externalApi } from "@/lib/api";
```

## Usage Examples

### Internal API
```typescript
// Login
await apiClient.post("/api/auth/login", { email, password });

// Get user
await apiClient.get("/api/auth/me");

// Logout
await apiClient.post("/api/auth/logout");
```

### External API
```typescript
// GET
const { data, ok } = await externalApi.get("players");

// POST
await externalApi.post("players", playerData);

// PUT
await externalApi.put("players/123", updates);

// DELETE
await externalApi.delete("players/123");
```

## File Locations

```
src/lib/api/
├── api.ts          → apiClient
├── internal.ts     → internalApi (alias)
├── externalApi.ts  → externalApi
├── external.ts     → alias for externalApi
└── index.ts        → all exports
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.example.com
NEXT_PUBLIC_API_GATEWAY_KEY=your-key
```

## Quick Tips

- `apiClient` = `internalApi` (same thing)
- Internal API returns `Response` object
- External API returns `{ data, ok, status }`
- Auth token automatically included
- API key automatically included

## Documentation

- Full guide: `API_SETUP_COMPLETE.md`
- Migration: `API_MIGRATION_COMPLETE.md`
- Imports: `IMPORT_GUIDE.md`
- External API: `EXTERNAL_API_GUIDE.md`
