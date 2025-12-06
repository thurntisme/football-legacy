# Switch Club Implementation

## Overview
Implemented club switching functionality that calls the API before redirecting to the dashboard when a user selects a team.

## Files Created/Modified

### 1. API Routes

#### `/api/club/[id]/switch` - Main Endpoint
**File**: `src/app/api/club/[id]/switch/route.tsx`
- Switches the active club for the authenticated user
- Requires authentication (token from httpOnly cookie)
- Uses dynamic route parameter `[id]` for club ID

**Request**:
```
POST /api/club/123/switch
Headers: Cookie with token (automatic)
Body: {} (empty)
```

**Response Format**:
```json
{
  "club": {
    "id": "123",
    "name": "Manchester United",
    ...
  },
  "message": "Club switched successfully",
  "success": true
}
```

#### `/api/club/[id]/switch-with-fallback` - Development Endpoint
**File**: `src/app/api/club/[id]/switch-with-fallback/route.tsx`
- Tries external API first
- Falls back to mock success if external API fails
- Useful for development/testing

### 2. TeamGrid Component
**File**: `src/components/pages/welcome/team-grid.tsx`

**Major Changes**:

1. **Updated handleSelectTeam Function**:
```typescript
// Before
const handleSelectTeam = (_teamId: string) => {
  router.push(`/dashboard`);
};

// After
const handleSelectTeam = async (teamId: string) => {
  setSwitchingTeamId(teamId);

  try {
    const response = await apiClient.post(`/api/club/${teamId}/switch`);

    if (response.data.success) {
      toast({
        title: "Success!",
        description: response.data.message || "Club switched successfully",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: response.data.message || "Failed to switch club",
        variant: "destructive",
      });
      setSwitchingTeamId(null);
    }
  } catch (err: any) {
    console.error("Error switching club:", err);
    toast({
      title: "Error",
      description: err.response?.data?.message || "Failed to switch club",
      variant: "destructive",
    });
    setSwitchingTeamId(null);
  }
};
```

2. **Added Loading State**:
```typescript
const [switchingTeamId, setSwitchingTeamId] = useState<string | null>(null);
```

3. **Updated Button with Loading Indicator**:
```typescript
<Button 
  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
  disabled={switchingTeamId === team.id}
>
  {switchingTeamId === team.id ? (
    <>
      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
      Switching...
    </>
  ) : (
    "Enter Dashboard"
  )}
</Button>
```

4. **Added Visual Feedback to Card**:
```typescript
<Card
  className={`bg-white border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all cursor-pointer group ${
    switchingTeamId === team.id ? "opacity-50 pointer-events-none" : ""
  }`}
  onClick={() => handleSelectTeam(team.id)}
>
```

## Data Flow

### Switch Club Flow
```
User clicks team card
    ↓
handleSelectTeam(teamId)
    ↓
Set switchingTeamId (show loading state)
    ↓
apiClient.post(`/api/club/${teamId}/switch`)
    ↓
/api/club/[id]/switch (Next.js API Route)
    ↓
Read token from httpOnly cookie
    ↓
externalApi.post(`club/${teamId}/switch`, {}, { headers: { Authorization } })
    ↓
External API Gateway
    ↓
Switch active club on server
    ↓
Return success response
    ↓
Show success toast
    ↓
router.push("/dashboard")
    ↓
User redirected to dashboard with new active club
```

## Features

### 1. Loading State
- Shows spinner on button while switching
- Disables button during switch
- Dims card and prevents clicks
- Visual feedback for better UX

### 2. Error Handling
- Catches API errors
- Shows error toast with message
- Resets loading state on error
- User can try again

### 3. Success Feedback
- Shows success toast
- Redirects to dashboard only on success
- Ensures server-side switch completed

### 4. Authentication
- Requires valid token in httpOnly cookie
- Returns 401 if unauthorized
- Token automatically forwarded to external API

## User Experience

### Successful Switch
1. User clicks team card
2. Button shows "Switching..." with spinner
3. Card becomes slightly transparent
4. API call completes
5. Success toast appears
6. User redirected to dashboard
7. Dashboard shows selected club

### Failed Switch
1. User clicks team card
2. Button shows "Switching..." with spinner
3. API call fails
4. Error toast appears with message
5. Loading state resets
6. User remains on welcome page
7. User can try again

### Visual States

#### Normal State
```
┌─────────────────────┐
│ Manchester United   │
│ Europe              │
│                     │
│ [Enter Dashboard]   │
└─────────────────────┘
```

#### Loading State
```
┌─────────────────────┐ (50% opacity)
│ Manchester United   │
│ Europe              │
│                     │
│ [⟳ Switching...]    │ (disabled)
└─────────────────────┘
```

## Benefits

### 1. Server-Side State Management
- Active club stored on server
- Consistent across devices
- Survives page refreshes
- Single source of truth

### 2. Better UX
- Clear loading feedback
- Error handling
- Success confirmation
- Prevents double-clicks

### 3. Security
- Server validates club ownership
- User can only switch to their own clubs
- Token-based authentication

### 4. Reliability
- Only redirects on success
- Handles network errors
- Retryable on failure

## Testing

### Test Successful Switch
1. Login and navigate to `/welcome`
2. Click on a team card
3. Should see "Switching..." on button
4. Should see success toast
5. Should redirect to `/dashboard`
6. Dashboard should show selected club

### Test Error Handling
1. Disconnect network
2. Click on a team card
3. Should see "Switching..." on button
4. Should see error toast
5. Should stay on welcome page
6. Loading state should reset

### Test Multiple Clubs
1. Have multiple clubs
2. Click on different clubs
3. Each should switch correctly
4. Dashboard should reflect selected club

### Test Unauthorized
1. Logout (remove token)
2. Try to access `/welcome`
3. Should redirect to `/auth/signin`

## Code Quality

### Async/Await Pattern
```typescript
const handleSelectTeam = async (teamId: string) => {
  // Clean async/await syntax
  // Proper error handling
  // Clear flow
};
```

### Loading State Management
```typescript
// Single state for tracking which team is being switched
const [switchingTeamId, setSwitchingTeamId] = useState<string | null>(null);

// Easy to check if specific team is loading
switchingTeamId === team.id
```

### Error Recovery
```typescript
catch (err: any) {
  // Log error
  console.error("Error switching club:", err);
  
  // Show user-friendly message
  toast({ title: "Error", description: err.response?.data?.message || "Failed to switch club" });
  
  // Reset state for retry
  setSwitchingTeamId(null);
}
```

## API Endpoint Details

### Dynamic Route Parameter
```typescript
// Route: src/app/api/club/[id]/switch/route.tsx
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const clubId = params.id; // Extract from URL
  // ...
}
```

### External API Call
```typescript
await externalApi.post(
  `club/${clubId}/switch`,  // Dynamic endpoint
  {},                        // Empty body
  {
    headers: {
      Authorization: `Bearer ${token}`,  // Auth token
    },
  }
);
```

## Future Enhancements
- Add confirmation dialog before switching
- Show club details in confirmation
- Add recent clubs list
- Implement quick switch dropdown
- Add keyboard shortcuts
- Cache active club locally
- Add club switching history
- Implement optimistic updates
- Add undo functionality
- Show club stats before switching
