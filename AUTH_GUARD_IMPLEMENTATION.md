# Auth Guard Implementation

## Overview
Implemented automatic redirect to `/auth/signin` for unauthenticated users trying to access protected pages.

## How It Works

### Public Pages (No Authentication Required)
- `/` - Home page
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

### Protected Pages (Authentication Required)
All other pages require authentication. If a user tries to access a protected page without being authenticated, they will be automatically redirected to `/auth/signin`.

## Implementation Details

### 1. AuthInitializer Component
**File**: `src/components/providers/AuthInitializer.tsx`

**Features**:
- Checks authentication status on every route change
- Fetches user data from `/api/auth/me` if not already loaded
- Redirects to `/auth/signin` if user is not authenticated on protected pages
- Shows loading spinner while checking authentication
- Prevents flash of protected content before redirect

**Flow**:
```
1. User navigates to a page
2. Check if page is public
   - If public: Allow access immediately
   - If protected: Continue to step 3
3. Check if user is already in Redux store
   - If yes: Allow access
   - If no: Continue to step 4
4. Fetch user data from API
   - If successful: Store user in Redux and allow access
   - If failed: Redirect to /auth/signin
```

### 2. useAuthGuard Hook (Optional)
**File**: `src/hooks/useAuthGuard.ts`

A reusable hook that can be used in individual components for additional protection:

```typescript
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ProtectedPage() {
  const { user, isAuthenticated } = useAuthGuard();
  
  // Component will auto-redirect if not authenticated
  return <div>Protected content</div>;
}
```

## Redux Integration

### Auth State
The authentication state is managed in Redux:

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### Checking Authentication Status
```typescript
import { useAppSelector } from "@/store/hooks";

const { user, isAuthenticated } = useAppSelector((state) => state.auth);
```

## Adding New Public Pages

To add a new public page that doesn't require authentication:

1. Open `src/components/providers/AuthInitializer.tsx`
2. Add the page path to the `PUBLIC_PAGES` array:

```typescript
const PUBLIC_PAGES = [
  "/", 
  "/auth/signin", 
  "/auth/signup",
  "/your-new-public-page", // Add here
];
```

## User Experience

### Protected Page Access Flow
1. **Unauthenticated user visits protected page**:
   - Shows loading spinner briefly
   - Redirects to `/auth/signin`
   - After login, user can navigate back to desired page

2. **Authenticated user visits protected page**:
   - Page loads immediately (user already in Redux)
   - No loading spinner or redirect

3. **User logs out**:
   - Redux state cleared
   - Next protected page access triggers redirect

### Loading State
Protected pages show a centered loading spinner while checking authentication:
```
┌─────────────────────┐
│                     │
│    ⟳ Loading...     │
│                     │
└─────────────────────┘
```

## Security Benefits

1. **Server-side validation**: Token stored in httpOnly cookie (XSS-safe)
2. **Client-side guard**: Immediate redirect for better UX
3. **Redux state**: Prevents unnecessary API calls
4. **No flash of content**: Loading state prevents showing protected content before redirect

## Testing

### Test Protected Page Access
1. Logout (clear token)
2. Try to access `/welcome` or any protected page
3. Should redirect to `/auth/signin`

### Test Public Page Access
1. Logout (clear token)
2. Visit `/` or `/auth/signin`
3. Should load without redirect

### Test Authenticated Access
1. Login successfully
2. Navigate to `/welcome` or any protected page
3. Should load without redirect

## Troubleshooting

### Infinite Redirect Loop
If you experience infinite redirects:
- Check that `/auth/signin` is in the `PUBLIC_PAGES` array
- Verify the API route `/api/auth/me` is working correctly
- Check browser console for errors

### User Not Redirected
If unauthenticated users can access protected pages:
- Verify `AuthInitializer` is wrapping your app in `layout.tsx`
- Check that the page path is not in `PUBLIC_PAGES`
- Verify Redux store is properly configured

### Loading Spinner Stuck
If the loading spinner never disappears:
- Check `/api/auth/me` endpoint is responding
- Verify token cookie is being sent with requests
- Check browser network tab for failed requests
