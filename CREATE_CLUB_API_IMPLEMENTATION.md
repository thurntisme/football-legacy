# Create Club API Implementation

## Overview
Implemented API integration to create a new club/team with server selection using data from the servers API.

## Files Created/Modified

### 1. API Routes

#### `/api/fm/club` - Main Endpoint
**File**: `src/app/api/fm/club/route.tsx`
- Creates a new club via external API
- Requires authentication (token from httpOnly cookie)
- Accepts `server_id` and `name` as parameters

**Request Format**:
```json
{
  "server_id": "eu-1",
  "name": "Manchester United"
}
```

**Response Format**:
```json
{
  "club": {
    "id": "club-123",
    "name": "Manchester United",
    "server": "eu-1",
    "region": "Europe",
    "squadSize": 0,
    "createdDate": "2024-12-06",
    "level": 1,
    "squadValue": 0
  },
  "message": "Club created successfully",
  "success": true
}
```

#### `/api/fm/club-with-fallback` - Development Endpoint
**File**: `src/app/api/fm/club-with-fallback/route.tsx`
- Tries external API first
- Falls back to mock data if external API fails
- Useful for development/testing

### 2. TeamGrid Component
**File**: `src/components/pages/welcome/team-grid.tsx`

**Major Changes**:
1. **Removed hardcoded SERVERS constant**
   - Now receives servers from parent component via props
   - Uses dynamic server data from API

2. **Updated Props Interface**:
```typescript
interface Server {
  id: string;
  name: string;
  region: string;
  status: string;
  capacity?: number;
  [key: string]: any;
}

type Props = {
  teams: Team[];
  availableSlots: number;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  loading?: boolean;
  error?: string | null;
  servers?: Server[];  // NEW
};
```

3. **Implemented Real API Call**:
   - Replaced `setTimeout` mock with actual API call to `/api/fm/club`
   - Sends `server_id` and `name` to backend
   - Handles success and error responses
   - Updates team list on successful creation

4. **Dynamic Server Selection**:
   - Server dropdown populated from API data
   - Shows loading state if servers not loaded yet
   - Displays server details (status, region, capacity) dynamically

5. **Fixed Router Navigation**:
   - Changed from `${FOOTBALL_STATS_URL}/dashboard` to `/dashboard`
   - Fixed unused parameter warning

### 3. Welcome Page
**File**: `src/app/welcome/page.tsx`

**Changes**:
- Passes `servers` prop to `TeamGrid` component
- Servers data fetched from API is now shared with TeamGrid

## Data Flow

### Create Club Flow
```
TeamGrid Component
    ↓
User fills form (name + server)
    ↓
handleCreateTeam()
    ↓
apiClient.post("/api/clubs", { server_id, name })
    ↓
/api/clubs (Next.js API Route - POST)
    ↓
Read token from httpOnly cookie
    ↓
externalApi.post("clubs", { server_id, name }, { headers: { Authorization } })
    ↓
External API Gateway
    ↓
Return created club data
    ↓
Show success toast
    ↓
Close dialog
    ↓
Call onRefreshTeams() callback
    ↓
Welcome Page: fetchClubs()
    ↓
apiClient.get("/api/clubs")
    ↓
/api/clubs (Next.js API Route - GET)
    ↓
Fetch updated clubs list from external API
    ↓
Update teams state with fresh data
```

### Server Selection Flow
```
Welcome Page
    ↓
Fetch servers from /api/servers
    ↓
Pass servers to TeamGrid
    ↓
TeamGrid displays servers in dropdown
    ↓
User selects server
    ↓
Show server details (status, region, capacity)
```

## Features

### Dynamic Server Loading
- Servers loaded from API, not hardcoded
- Shows "Loading servers..." if servers not yet loaded
- Displays server details when selected

### Real-time Club Creation
- Calls actual backend API
- Shows loading spinner during creation
- Displays success/error messages via toast
- Updates team list immediately on success

### Error Handling
- Validates team name (required, non-empty)
- Validates server selection (required)
- Handles API errors gracefully
- Shows user-friendly error messages

### Authentication
- Requires valid token in httpOnly cookie
- Returns 401 if unauthorized
- Token automatically forwarded to external API

### User Experience
- Loading state with spinner during creation
- Success toast with custom message
- Error toast with specific error details
- Dialog closes automatically on success
- Form resets after successful creation

## Validation

### Client-side Validation
```typescript
// Team name validation
if (!newTeamName.trim()) {
  toast({
    title: "Error",
    description: "Please enter a team name",
    variant: "destructive",
  });
  return;
}

// Server selection validation
if (!newTeamServer) {
  toast({
    title: "Error",
    description: "Please select a server",
    variant: "destructive",
  });
  return;
}
```

### Server-side Validation
```typescript
// API route validation
if (!server_id || !name) {
  return NextResponse.json(
    { message: "Server ID and name are required", success: false },
    { status: 400 },
  );
}
```

## Testing

### Test with Real API
1. Login to get authentication token
2. Navigate to `/welcome`
3. Click "Create New Team"
4. Enter team name
5. Select server from dropdown
6. Click "Create Team"
7. Should create team via external API
8. Team should appear in grid immediately

### Test with Fallback
1. Use `/api/fm/club-with-fallback` endpoint
2. If external API fails, mock data will be used
3. Check console for fallback indicator

### Test Validation
1. Try to create team without name → Should show error
2. Try to create team without server → Should show error
3. Try to create team with valid data → Should succeed

### Test Error Handling
1. Logout (remove token)
2. Try to create team → Should show unauthorized error
3. Login and try again → Should work

## UI/UX Improvements

### Before
- Hardcoded server list
- Mock team creation with setTimeout
- No real API integration
- Fixed server data

### After
- Dynamic server list from API
- Real team creation via API
- Proper error handling
- Live server data (status, capacity)
- Better loading states
- User-friendly error messages

## Server Details Display

When a server is selected, the component shows:
- **Status**: Online/Busy/Offline (color-coded)
- **Region**: Server's geographic region
- **Capacity**: Current server capacity

```typescript
{newTeamServer && servers.length > 0 && (
  <Card className="bg-gray-50 border-gray-200">
    <CardContent className="pt-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="text-green-600 font-semibold">
            {servers.find((s) => s.id === newTeamServer)?.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Region:</span>
          <span className="text-gray-900">
            {servers.find((s) => s.id === newTeamServer)?.region}
          </span>
        </div>
        {servers.find((s) => s.id === newTeamServer)?.capacity && (
          <div className="flex justify-between">
            <span className="text-gray-600">Capacity:</span>
            <span className="text-gray-900">
              {servers.find((s) => s.id === newTeamServer)?.capacity?.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
)}
```

## Future Enhancements
- Add team logo upload
- Add team color selection
- Implement team name uniqueness check
- Add server capacity warnings
- Show server ping/latency
- Add team creation confirmation dialog
- Implement team creation history
- Add team templates/presets
