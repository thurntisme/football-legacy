# HttpOnly Cookie Fix - Token Authentication

## Problem
`getAuthToken()` was returning `null` because it tried to read the token from `document.cookie`, but the cookie was set with `httpOnly: true` flag, which prevents client-side JavaScript from accessing it.

## Root Cause
In `src/app/api/auth/login/route.tsx`, the token cookie was set with:
```typescript
cookies().set("token", data.data.token, {
  httpOnly: true,  // ← This prevents document.cookie from reading it
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
});
```

## Solution
Removed manual token reading from cookies in client-side code since:
1. **HttpOnly cookies are more secure** - they prevent XSS attacks
2. **Cookies are sent automatically** - with `withCredentials: true`, axios automatically includes cookies in requests
3. **Server-side routes handle token forwarding** - API routes read the token from cookies and pass it to external API

## Changes Made

### 1. `src/lib/api/api.ts`
- ✅ Removed `getAuthToken()` function
- ✅ Removed request interceptor that tried to add token manually
- ✅ Kept `withCredentials: true` so cookies are sent automatically to Next.js API routes

### 2. `src/lib/api/externalApi.ts`
- ✅ Removed `getAuthToken()` function
- ✅ Removed token injection from request interceptor
- ✅ Kept API Gateway key injection
- ✅ Updated `ExternalApiClient` class to remove token interceptor

### 3. `src/app/api/auth/me/route.tsx`
- ✅ Added explicit token forwarding to external API:
```typescript
const { data, ok, status } = await externalApi.get("me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### 4. `src/app/api/auth/logout/route.tsx`
- ✅ Added explicit token forwarding to external API logout call

## How It Works Now

### Client → Next.js API Routes
1. Client makes request to `/api/auth/me`
2. Browser automatically includes httpOnly cookie (no JavaScript needed)
3. Next.js API route reads token from `cookies().get("token")`

### Next.js API Routes → External API
1. API route extracts token from cookie
2. API route forwards token to external API in Authorization header
3. External API validates token and returns user data

## Security Benefits
- ✅ Token cannot be stolen via XSS attacks
- ✅ Token cannot be read by malicious scripts
- ✅ Token is only accessible to server-side code
- ✅ Automatic cookie handling by browser

## Testing
To verify the fix works:
1. Login via `/auth/signin`
2. Check browser DevTools → Application → Cookies → `token` should exist
3. Navigate to a protected page
4. `AuthInitializer` should successfully fetch user data from `/api/auth/me`
5. User should be authenticated without errors
