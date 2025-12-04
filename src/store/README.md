# Redux Authentication Implementation

This directory contains the Redux store configuration for authentication state management.

## Structure

```
src/store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed Redux hooks
└── slices/
    └── authSlice.ts      # Authentication slice
```

## Usage

### 1. Login

```tsx
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

const dispatch = useAppDispatch();

const handleLogin = async () => {
  const result = await dispatch(login({ 
    email: "example@football.com", 
    password: "wT$s8pGJHNVd6c9PrKg" 
  }));
  
  if (login.fulfilled.match(result)) {
    // Login successful
  }
};
```

### 2. Logout

```tsx
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

const dispatch = useAppDispatch();

const handleLogout = async () => {
  await dispatch(logout());
};
```

### 3. Access Auth State

```tsx
import { useAppSelector } from "@/store/hooks";

const { user, isAuthenticated, isLoading, error } = useAppSelector(
  (state) => state.auth
);
```

### 4. Use Auth Hook (Shorthand)

```tsx
import { useAuth } from "@/hooks/useAuth";

// Shorthand for useAppSelector((state) => state.auth)
const { user, isAuthenticated, isLoading, error } = useAuth();
```

## Components

- `LoginForm` - Ready-to-use login form component
- `LogoutButton` - Logout button component
- `AuthGuard` - Protect routes that require authentication

## API Endpoints

- `POST /api/auth/login` - Login endpoint
- `POST /api/auth/logout` - Logout endpoint
- `GET /api/auth/me` - Get current user

## State Shape

```typescript
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  }
}
```
