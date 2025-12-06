# Conditional Ads Implementation

## Overview
Implemented conditional rendering of AdProvider based on user's plan features. Users with "no_ads" feature in their plan will not see advertisements.

## Files Modified

### 1. User Type
**File**: `src/types/user.ts`

**Changes**:
Added `plan_features` field to User type:

```typescript
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  plan: string;
  plan_features?: string[];  // NEW - Array of feature strings
  createdAt: Date;
  updatedAt: Date;
  // ...
};
```

**Plan Features Examples**:
- `"no_ads"` - User doesn't see advertisements
- `"premium_support"` - User gets priority support
- `"unlimited_teams"` - User can create unlimited teams
- `"advanced_stats"` - User gets advanced statistics
- etc.

### 2. Dashboard Layout
**File**: `src/components/layouts/dashboard.tsx`

**Major Changes**:

1. **Import Redux Hook**:
```typescript
import { useAppSelector } from "@/store/hooks";
```

2. **Get User from Redux**:
```typescript
const { user } = useAppSelector((state) => state.auth);
```

3. **Check for "no_ads" Feature**:
```typescript
const hasNoAds = user?.plan_features?.includes("no_ads") ?? false;
```

4. **Conditional Ad Display**:
```typescript
const shouldShowAds = !isBlank && !hasNoAds;
```

5. **Conditional Rendering**:
```typescript
{shouldShowAds ? (
  <AdProvider isShowAd={true}>
    {/* Layout with ads */}
  </AdProvider>
) : (
  {/* Layout without ads */}
)}
```

## Logic Flow

### Ad Display Decision Tree
```
Is page blank (/, /auth/*, /welcome)?
├─ Yes → Don't show ads
└─ No → Check user plan features
    ├─ User has "no_ads" feature?
    │   ├─ Yes → Don't show ads
    │   └─ No → Show ads
    └─ User not loaded yet?
        └─ Show ads (default behavior)
```

### Code Logic
```typescript
// Step 1: Check if page is blank
const isBlank = pathname === "/" || 
                pathname?.startsWith("/auth/") || 
                pathname?.startsWith("/welcome");

// Step 2: Check if user has no_ads feature
const hasNoAds = user?.plan_features?.includes("no_ads") ?? false;

// Step 3: Determine if ads should be shown
const shouldShowAds = !isBlank && !hasNoAds;

// Step 4: Conditionally render AdProvider
{shouldShowAds ? <AdProvider>...</AdProvider> : <div>...</div>}
```

## User Experience

### Free Plan User
```
User Data:
{
  plan: "free",
  plan_features: []
}

Result: Sees ads on all non-blank pages
```

### Premium Plan User
```
User Data:
{
  plan: "premium",
  plan_features: ["no_ads", "premium_support"]
}

Result: No ads on any page
```

### Pro Plan User
```
User Data:
{
  plan: "pro",
  plan_features: ["no_ads", "premium_support", "unlimited_teams", "advanced_stats"]
}

Result: No ads on any page + additional features
```

## Benefits

### 1. Flexible Plan Management
- Easy to add/remove features per user
- Server controls feature access
- No client-side code changes needed

### 2. Better User Experience
- Premium users get ad-free experience
- Clear value proposition for upgrades
- Immediate effect after plan change

### 3. Performance
- AdProvider not loaded for premium users
- Reduces JavaScript bundle size
- Faster page loads for premium users

### 4. Maintainability
- Single source of truth (user.plan_features)
- Easy to add new features
- Consistent across application

## Feature Flags

The `plan_features` array acts as feature flags:

```typescript
// Check for specific features
const hasNoAds = user?.plan_features?.includes("no_ads");
const hasPremiumSupport = user?.plan_features?.includes("premium_support");
const hasUnlimitedTeams = user?.plan_features?.includes("unlimited_teams");
const hasAdvancedStats = user?.plan_features?.includes("advanced_stats");

// Use in conditional rendering
{hasAdvancedStats && <AdvancedStatsPanel />}
{hasPremiumSupport && <PremiumSupportButton />}
```

## API Integration

### User Data from API
The `/api/auth/me` endpoint should return user with plan_features:

```json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "premium",
    "plan_features": ["no_ads", "premium_support"],
    ...
  },
  "success": true
}
```

### Plan Upgrade Flow
```
1. User upgrades plan
2. Server updates user.plan_features
3. Client refreshes user data
4. Redux state updates
5. Layout re-renders
6. Ads disappear (if "no_ads" added)
```

## Testing

### Test Free User (With Ads)
1. Login with free plan user
2. Navigate to dashboard
3. Should see advertisements
4. Check Redux state: `plan_features` is empty or doesn't include "no_ads"

### Test Premium User (No Ads)
1. Login with premium plan user
2. Navigate to dashboard
3. Should NOT see advertisements
4. Check Redux state: `plan_features` includes "no_ads"

### Test Plan Upgrade
1. Login with free plan user
2. See ads on dashboard
3. Upgrade to premium plan
4. Refresh user data (or re-login)
5. Ads should disappear

### Test Blank Pages
1. Login with any user
2. Navigate to `/`, `/auth/signin`, `/welcome`
3. Should NOT see ads regardless of plan
4. These pages are always ad-free

## Edge Cases

### User Not Loaded Yet
```typescript
const hasNoAds = user?.plan_features?.includes("no_ads") ?? false;
// If user is null/undefined, defaults to false (show ads)
```

### plan_features is undefined
```typescript
user?.plan_features?.includes("no_ads")
// Optional chaining prevents errors
// Returns undefined if plan_features doesn't exist
// ?? false converts undefined to false
```

### Empty plan_features Array
```typescript
user.plan_features = []
user.plan_features.includes("no_ads") // false
// Shows ads (correct behavior)
```

## Security Considerations

### Client-Side Check Only
- This is a UX feature, not security
- Ad display is controlled client-side
- Server should still validate plan features for critical features

### Server-Side Validation
For critical features (not just ads), always validate on server:

```typescript
// API Route
const token = cookies().get("token")?.value;
const user = await getUserFromToken(token);

if (!user.plan_features?.includes("premium_feature")) {
  return NextResponse.json(
    { message: "Premium feature required", success: false },
    { status: 403 }
  );
}
```

## Future Enhancements

### 1. More Granular Ad Control
```typescript
const adSettings = {
  showBannerAds: !user?.plan_features?.includes("no_banner_ads"),
  showVideoAds: !user?.plan_features?.includes("no_video_ads"),
  showSponsoredContent: !user?.plan_features?.includes("no_sponsored"),
};
```

### 2. Feature-Based Components
```typescript
// Create reusable component
<FeatureGate feature="no_ads" fallback={<AdProvider />}>
  <div>Ad-free content</div>
</FeatureGate>
```

### 3. Analytics
```typescript
// Track ad impressions by plan
if (shouldShowAds) {
  analytics.track("ad_impression", {
    plan: user?.plan,
    page: pathname,
  });
}
```

### 4. A/B Testing
```typescript
// Test different ad placements for free users
const adVariant = user?.plan === "free" ? getAdVariant() : null;
```

## Plan Feature Examples

### Free Plan
```json
{
  "plan": "free",
  "plan_features": []
}
```

### Premium Plan
```json
{
  "plan": "premium",
  "plan_features": [
    "no_ads",
    "premium_support",
    "cloud_saves"
  ]
}
```

### Pro Plan
```json
{
  "plan": "pro",
  "plan_features": [
    "no_ads",
    "premium_support",
    "cloud_saves",
    "unlimited_teams",
    "advanced_stats",
    "priority_queue",
    "custom_branding"
  ]
}
```

## Conclusion

This implementation provides a flexible, maintainable way to control ad display based on user plan features. It's easily extensible to other features and provides a good foundation for a freemium business model.
