# Register API Documentation

Registration API has been implemented with external API integration.

## API Route

### POST `/api/auth/register`

Registers a new user account.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Validation:**
- ✅ Full name is required
- ✅ Email is required and must be valid format
- ✅ Password is required and must be at least 8 characters
- ✅ All fields are trimmed and validated

**Success Response (200):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "123",
    "full_name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-04T..."
  },
  "success": true
}
```

**Error Responses:**

**400 - Missing Fields:**
```json
{
  "message": "Full name, email and password are required.",
  "success": false
}
```

**400 - Invalid Email:**
```json
{
  "message": "Invalid email format.",
  "success": false
}
```

**400 - Weak Password:**
```json
{
  "message": "Password must be at least 8 characters long.",
  "success": false
}
```

**409 - Email Already Exists:**
```json
{
  "message": "Email already registered.",
  "success": false
}
```

**500 - Server Error:**
```json
{
  "message": "Something went wrong.",
  "success": false
}
```

## External API Integration

The route calls your external API:

**Endpoint:** `${EXTERNAL_API_URL}/auth/register`

**Expected Backend Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "full_name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-04T..."
  },
  "message": "Registration successful"
}
```

**What the route does:**
1. Validates input data
2. Calls external API `/auth/register`
3. Sets token as httpOnly cookie (if provided)
4. Returns user data to client

## Signup Page Implementation

The signup page (`src/app/auth/signup/page.tsx`) has been updated to use the API.

**Features:**
- ✅ Client-side validation
- ✅ Password confirmation check
- ✅ Terms acceptance required
- ✅ Loading states
- ✅ Error handling
- ✅ Success redirect to welcome page

**Usage:**
```typescript
const res = await internalApi.post("/api/auth/register", {
  full_name: fullName,
  email,
  password,
});

if (res.data.success) {
  // Registration successful
  router.push("/welcome");
}
```

## Fallback Option

### POST `/api/auth/register-with-fallback`

For development/testing, this route:
1. Tries external API first
2. Falls back to guest user creation if API unavailable
3. Useful when backend is not ready

**Usage:**
Change the signup page to use:
```typescript
await internalApi.post("/api/auth/register-with-fallback", data);
```

## Security Features

✅ **Password Validation** - Minimum 8 characters
✅ **Email Validation** - Regex pattern check
✅ **httpOnly Cookies** - Token not accessible via JavaScript
✅ **Secure Flag** - HTTPS only in production
✅ **SameSite** - CSRF protection
✅ **Server-side Validation** - All validation on server
✅ **No Password in Response** - Password never returned

## Client-Side Validation

The signup form validates:
- All fields are filled
- Email format is valid
- Password is at least 8 characters
- Passwords match
- Terms are accepted

## Backend Requirements

Your external API should implement:

### POST `/auth/register`

**Request:**
```typescript
{
  full_name: string,
  email: string,
  password: string
}
```

**Response:**
```typescript
{
  token: string,        // JWT token
  user: {
    id: string,
    full_name: string,
    email: string,
    createdAt: string,
    // ... other user fields
  },
  message?: string
}
```

**Error Response:**
```typescript
{
  message: string,
  success: false
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error
- `409` - Email already exists
- `500` - Server error

## Testing

### Test Registration

```bash
# Start dev server
npm run dev

# Visit signup page
open http://localhost:3000/auth/signup

# Fill in form:
# - Name: Test User
# - Email: test@example.com
# - Password: password123
# - Confirm Password: password123
# - Accept Terms: ✓

# Submit form
```

### Test with cURL

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Redux Integration

You can also create a Redux action for registration:

```typescript
// src/store/slices/authSlice.ts
export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { full_name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/api/auth/register", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
```

**Usage in component:**
```typescript
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/slices/authSlice";

const dispatch = useAppDispatch();

const handleSignUp = async () => {
  const result = await dispatch(register({ full_name: fullName, email, password }));
  
  if (register.fulfilled.match(result)) {
    // Success
    router.push("/welcome");
  }
};
```

## Flow Diagram

```
User fills form
    ↓
Client validation
    ↓
POST /api/auth/register
    ↓
Server validation
    ↓
POST ${EXTERNAL_API_URL}/auth/register
    ↓
Backend creates user
    ↓
Returns token + user
    ↓
Set httpOnly cookie
    ↓
Return user to client
    ↓
Redirect to welcome page
```

## Error Handling

```typescript
try {
  const res = await internalApi.post("/api/auth/register", data);
  
  if (res.data.success) {
    // Success
  } else {
    // Show error message
    setError(res.data.message);
  }
} catch (error) {
  // Network or unexpected error
  setError("An error occurred during registration");
}
```

## Next Steps

1. ✅ Register API created
2. ✅ Signup page updated
3. ✅ Validation implemented
4. ⬜ Configure external API URL
5. ⬜ Implement backend `/auth/register` endpoint
6. ⬜ Test registration flow
7. ⬜ Optional: Add email verification
8. ⬜ Optional: Add Redux action

---

**Status:** Registration API ready
**Date:** December 4, 2025
