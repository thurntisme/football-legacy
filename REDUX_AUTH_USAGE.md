# Redux Authentication - Usage Guide

Redux authentication has been successfully implemented in your Next.js app.

## What's Been Added

1. **Redux Store** (`src/store/`)
   - Store configuration with auth slice
   - Typed hooks for TypeScript support
   - Auth slice with login/logout actions

2. **Components** (`src/components/auth/`)
   - `LoginForm` - Complete login form with Redux integration
   - `LogoutButton` - Logout button component
   - `AuthGuard` - Route protection component
   - `UserProfile` - Display current user info

3. **Providers** (`src/components/providers/`)
   - `ReduxProvider` - Redux store provider
   - `AuthInitializer` - Auto-checks authentication on app load

4. **Hooks** (`src/hooks/`)
   - `useAuth` - Custom hook to access auth state and auto-check authentication

5. **API Routes** (Updated)
   - `POST /api/auth/login` - Login endpoint (returns user without password)
   - `GET /api/auth/me` - Verify authentication and get current user (without password)
   - `POST /api/auth/logout` - Logout endpoint

6. **Root Layout** (Updated)
   - Redux Provider added
   - AuthInitializer automatically checks authentication on app load

## Quick Start

### Using the Login Form

Replace your existing login form with the Redux-powered one:

```tsx
import { LoginForm } from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <LoginForm />
    </div>
  );
}
```

### Using the Logout Button

Add logout functionality anywhere:

```tsx
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Header() {
  return (
    <nav>
      <LogoutButton />
    </nav>
  );
}
```

### Protecting Routes

Wrap protected pages with AuthGuard:

```tsx
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>Protected Dashboard Content</div>
    </AuthGuard>
  );
}
```

### Accessing User Data

Use Redux selector to access user state anywhere:

```tsx
"use client";

import { useAppSelector } from "@/store/hooks";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user?.fullname}</h1>
      <p>Email: {user?.email}</p>
      <p>Budget: ${user?.budget?.toLocaleString()}</p>
      <p>Coins: {user?.coin}</p>
    </div>
  );
}
```

Or use the pre-built UserProfile component:

```tsx
import { UserProfile } from "@/components/auth/UserProfile";

export default function Header() {
  return (
    <nav>
      <UserProfile />
    </nav>
  );
}
```

### Manual Login/Logout

Use Redux actions directly:

```tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, logout } from "@/store/slices/authSlice";

export default function CustomAuth() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    await dispatch(login({
      email: "example@football.com",
      password: "wT$s8pGJHNVd6c9PrKg"
    }));
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.fullname}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

## Test Credentials

- Email: `example@football.com`
- Password: `wT$s8pGJHNVd6c9PrKg`

## State Management

The auth state is globally available and includes:

```typescript
{
  user: User | null,           // Current user data
  isAuthenticated: boolean,    // Authentication status
  isLoading: boolean,          // Loading state for async operations
  error: string | null         // Error messages
}
```

## Next Steps

1. Replace your existing login pages with the new `LoginForm` component
2. Add `LogoutButton` to your navigation/header
3. Wrap protected routes with `AuthGuard`
4. Use `useAuth()` hook to access user data throughout your app
5. Extend the auth slice with additional actions (register, update profile, etc.)
