# Environment Configuration Guide

This project uses environment variables to configure API URLs for different environments.

## Environment Files

- `.env.local` - Local development (not committed to git)
- `.env.example` - Example configuration for development
- `.env.production.example` - Example configuration for production

## Setup

### Development

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your local API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Production

For production deployment, set the environment variable in your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-production-domain.com`

**Other Platforms:**
Create a `.env.production.local` file:
```env
NEXT_PUBLIC_API_URL=https://your-production-domain.com
```

## API Client Usage

The project includes a centralized API client (`src/lib/api.ts`) that automatically uses the configured API URL.

### Basic Usage

```typescript
import { apiClient } from "@/lib/api";

// GET request
const response = await apiClient.get("/api/auth/me");
const data = await response.json();

// POST request
const response = await apiClient.post("/api/auth/login", {
  email: "user@example.com",
  password: "password"
});

// PUT request
const response = await apiClient.put("/api/user/profile", {
  name: "New Name"
});

// DELETE request
const response = await apiClient.delete("/api/user/account");
```

### Get API URL

```typescript
import { getApiUrl } from "@/lib/api";

const fullUrl = getApiUrl("/api/auth/login");
// Returns: http://localhost:3000/api/auth/login (dev)
// Returns: https://your-domain.com/api/auth/login (prod)
```

## Environment Variables

### NEXT_PUBLIC_API_URL

- **Required:** Yes
- **Default:** `http://localhost:3000`
- **Description:** Base URL for all API requests
- **Note:** Must start with `NEXT_PUBLIC_` to be accessible in the browser

## Current Implementation

The following components/files use the API client:

- `src/store/slices/authSlice.ts` - Login/logout actions
- `src/components/providers/AuthInitializer.tsx` - Auth verification
- All future API calls should use `apiClient` from `@/lib/api`

## Migration from Direct Fetch/Axios

If you have existing code using `fetch` or `axios` directly:

**Before:**
```typescript
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(credentials)
});
```

**After:**
```typescript
import { apiClient } from "@/lib/api";

const response = await apiClient.post("/api/auth/login", credentials);
```

## Testing Different Environments

### Test with Local Backend
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Test with Staging Backend
```env
NEXT_PUBLIC_API_URL=https://staging.your-domain.com
```

### Test with Production Backend
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Troubleshooting

### API calls not working
1. Check if `.env.local` exists
2. Verify `NEXT_PUBLIC_API_URL` is set correctly
3. Restart the development server after changing env variables

### Environment variable not updating
- Restart the Next.js dev server (`npm run dev`)
- Clear `.next` folder: `rm -rf .next`

### CORS issues in production
- Ensure your production API allows requests from your frontend domain
- Check API CORS configuration
