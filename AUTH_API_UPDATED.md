# Auth API Updated with External API

The authentication API routes have been updated to use the external API gateway.

## Updated Routes

### 1. POST `/api/auth/login`

**Now uses:** `externalApi.post("auth/login", { email, password })`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected External API Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name"
  },
  "message": "Login successful"
}
```

**What it does:**
1. Validates email and password are provided
2. Calls external API `/auth/login`
3. Sets token as httpOnly cookie
4. Returns user data to client

### 2. GET `/api/auth/me`

**Now uses:** `externalApi.get("auth/me")`

**Headers:**
```
Authorization: Bearer <token-from-cookie>
```

**Expected External API Response:**
```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**What it does:**
1. Gets token from cookie
2. Calls external API `/auth/me` with token
3. Returns user data

### 3. POST `/api/auth/logout`

**Now uses:** `externalApi.post("auth/logout")`

**What it does:**
1. Gets token from cookie
2. Calls external API `/auth/logout` to invalidate token
3. Deletes local cookie
4. Returns success

## Fallback Option

If you want to support both external API and local guest user, use:

**Route:** `/api/auth/login-with-fallback`

This route:
1. Tries external API first
2. Falls back to guest user if external API is unavailable
3. Useful for development/testing

## Environment Setup

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_EXTERNAL_API_URL=https://your-api-gateway.com
```

## External API Requirements

Your backend API should implement these endpoints:

### POST `/auth/login`
```typescript
Request: { email: string, password: string }
Response: { 
  token: string,
  user: object,
  message?: string 
}
```

### GET `/auth/me`
```typescript
Headers: { Authorization: "Bearer <token>" }
Response: { 
  user: object 
}
```

### POST `/auth/logout`
```typescript
Headers: { Authorization: "Bearer <token>" }
Response: { 
  message: string 
}
```

## Security Features

✅ **httpOnly cookies** - Token not accessible via JavaScript
✅ **Secure flag** - HTTPS only in production
✅ **SameSite** - CSRF protection
✅ **Server-side proxy** - API URL not exposed to client
✅ **Token in Authorization header** - Standard Bearer token format

## Migration from Guest User

### Before (Guest User)
```typescript
// Used GUEST_USER constant
// Token created locally with createGuestToken()
// No external API calls
```

### After (External API)
```typescript
// Calls external API
// Token from backend
// Real authentication
```

## Testing

### Test with External API
```bash
# Set your API URL
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.example.com

# Start dev server
npm run dev

# Try logging in
```

### Test with Fallback (Development)
```bash
# Use fallback route for development
# Change signin page to use: /api/auth/login-with-fallback
```

## Client-Side Usage

No changes needed! The signin page already works:

```typescript
const res = await internalApi.post("/api/auth/login", {
  email,
  password,
});

const data = await res.json();

if (data.success) {
  // Login successful
}
```

## Redux Integration

Redux auth slice automatically works with the updated API:

```typescript
import { login } from "@/store/slices/authSlice";

const result = await dispatch(login({ email, password }));

if (login.fulfilled.match(result)) {
  // Success
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error message here",
  "success": false
}
```

Status codes:
- `400` - Bad request (missing fields)
- `401` - Unauthorized (invalid credentials)
- `500` - Server error

## Next Steps

1. ✅ Auth API routes updated
2. ⬜ Configure your external API URL
3. ⬜ Implement backend auth endpoints
4. ⬜ Test login flow
5. ⬜ Optional: Use fallback route for development

---

**Status:** Auth API ready for external API integration
**Date:** December 4, 2025
