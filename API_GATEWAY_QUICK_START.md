# API Gateway Quick Start

Quick reference for using the external API gateway in your football game app.

## Setup (1 minute)

1. **Update `.env.local`:**
   ```env
   NEXT_PUBLIC_EXTERNAL_API_URL=https://your-api-gateway.com
   NEXT_PUBLIC_API_GATEWAY_KEY=your-api-key
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

## Usage Patterns

### Pattern 1: Simple API Call

```typescript
import { externalApi } from "@/lib/externalApi";

const { data, ok } = await externalApi.get("players");
if (ok) {
  console.log(data);
}
```

### Pattern 2: In React Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { externalApi } from "@/lib/externalApi";

export function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    externalApi.get("players").then(({ data, ok }) => {
      if (ok) setPlayers(data.players);
    });
  }, []);

  return <div>{/* render players */}</div>;
}
```

### Pattern 3: In Redux Slice

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import { externalApi } from "@/lib/externalApi";

export const fetchPlayers = createAsyncThunk(
  "players/fetch",
  async (_, { rejectWithValue }) => {
    const { data, ok } = await externalApi.get("players");
    if (!ok) return rejectWithValue("Failed");
    return data;
  }
);
```

### Pattern 4: With TypeScript

```typescript
import { externalApi } from "@/lib/externalApi";

interface Player {
  id: string;
  name: string;
}

const { data, ok } = await externalApi.get<{ players: Player[] }>("players");
```

## API Methods

```typescript
// GET
await externalApi.get("endpoint");

// POST
await externalApi.post("endpoint", { data });

// PUT
await externalApi.put("endpoint", { data });

// PATCH
await externalApi.patch("endpoint", { data });

// DELETE
await externalApi.delete("endpoint");
```

## Response Format

```typescript
{
  data: any,      // Response data
  ok: boolean,    // Success status
  status: number  // HTTP status code
}
```

## Common Endpoints (Example)

```typescript
// Players
await externalApi.get("players");
await externalApi.get("players/123");
await externalApi.post("players", playerData);
await externalApi.put("players/123", updates);
await externalApi.delete("players/123");

// Teams
await externalApi.get("teams");
await externalApi.get("teams/456");

// Matches
await externalApi.get("matches");
await externalApi.post("matches", matchData);

// Leagues
await externalApi.get("leagues");
await externalApi.get("leagues/789/standings");
```

## Authentication

Token is automatically included from cookies:
```
Authorization: Bearer <token-from-cookie>
```

API key is automatically included:
```
X-API-Key: <your-api-gateway-key>
```

## Error Handling

```typescript
const { data, ok, status } = await externalApi.get("players");

if (!ok) {
  if (status === 404) console.error("Not found");
  else if (status === 401) console.error("Unauthorized");
  else console.error("Error");
}
```

## Two API Types

| Type | File | Use For | Example |
|------|------|---------|---------|
| **Internal** | `src/lib/api.ts` | Next.js routes | `/api/auth/login` |
| **External** | `src/lib/externalApi.ts` | API Gateway | `https://api.example.com/players` |

## Examples in Your App

See these files for complete examples:
- `src/store/slices/playersSlice.example.ts` - Redux with external API
- `src/lib/api/index.ts` - Combined API service
- `EXTERNAL_API_GUIDE.md` - Detailed documentation

## Need Help?

- Full guide: `EXTERNAL_API_GUIDE.md`
- Environment setup: `ENV_SETUP.md`
- Redux auth: `REDUX_AUTH_USAGE.md`
