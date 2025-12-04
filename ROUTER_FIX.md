# Router Push Fix

## Issue

The `router.push()` was not working in signin/signup pages because `FOOTBALL_STATS_URL` was set to an empty string.

## Root Cause

```typescript
// src/constants/site.ts
export const FOOTBALL_STATS_URL = ""; // Empty string!
```

This caused the router to push to:
```typescript
router.push(`${FOOTBALL_STATS_URL}/welcome`); // Results in "/welcome"
```

But the concatenation with an empty string was causing issues.

## Solution

Changed to use direct paths instead of concatenating with `FOOTBALL_STATS_URL`:

### Before
```typescript
router.push(`${FOOTBALL_STATS_URL}/welcome`);
```

### After
```typescript
router.push("/welcome");
```

## Files Updated

1. **`src/app/auth/signin/page.tsx`**
   - Changed redirect from `${FOOTBALL_STATS_URL}/welcome` to `/welcome`
   - Removed unnecessary setTimeout delay

2. **`src/app/auth/signup/page.tsx`**
   - Changed redirect from `${FOOTBALL_STATS_URL}/welcome` to `/welcome`

## Why FOOTBALL_STATS_URL Exists

The `FOOTBALL_STATS_URL` constant is used throughout the app for:
- Navigation links
- Breadcrumbs
- Dynamic routing

It's set to empty string for development, but in production it might be set to a subdirectory or different base path.

## Recommendation

If you need to support different base paths:

### Option 1: Use Next.js basePath
```javascript
// next.config.js
module.exports = {
  basePath: '/football-stats',
}
```

### Option 2: Keep using FOOTBALL_STATS_URL
Update `src/constants/site.ts`:
```typescript
export const FOOTBALL_STATS_URL = process.env.NEXT_PUBLIC_BASE_PATH || "";
```

Then in `.env.local`:
```env
NEXT_PUBLIC_BASE_PATH=
```

And in production:
```env
NEXT_PUBLIC_BASE_PATH=/football-stats
```

## Current Behavior

✅ **Signin**: Redirects to `/welcome` after successful login
✅ **Signup**: Redirects to `/welcome` after successful registration
✅ **Toast**: Shows success message before redirect
✅ **Router**: Works correctly with direct paths

## Testing

1. Visit `/auth/signin`
2. Enter credentials
3. Submit form
4. Should see toast and redirect to `/welcome`

Same for signup at `/auth/signup`.

---

**Status:** ✅ Router push fixed
**Date:** December 4, 2025
