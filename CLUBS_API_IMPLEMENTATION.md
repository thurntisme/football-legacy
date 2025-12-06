# Clubs API Implementation

## Overview
Implemented API integration to fetch user's available clubs on the welcome page.

## Files Created/Modified

### 1. API Routes

#### `/api/clubs` - Main Endpoint
**File**: `src/app/api/clubs/route.tsx`
- Fetches user's clubs from external API
- Requires authentication (token from httpOnly cookie)
- Returns team data or error response

**Response Format**:
```json
{
  "clubs": [
    {
      "id": "1",
      "name": "Manchester City",
      "server": "EU-1",
      "region": "Europe",
      "squadSize": 25,
      "createdDate": "2024-01-15",
      "level": 12,
      "squadValue": 8000000
    }
  ],
  "success": true
}
```

#### `/api/clubs-with-fallback` - Development Endpoint
**File**: `src/app/api/clubs-with-fallback/route.tsx`
- Tries external API first
- Falls back to mock data if external API fails
- Useful for development/testing

### 2. Welcome Page
**File**: `src/app/welcome/page.tsx`

**Changes**:
- Removed hardcoded teams data
- Added separate state management for clubs and servers
- Implemented parallel data fetching for clubs and servers
- Added loading and error states for both clubs and servers
- Passes loading/error states to child components

**New State**:
```typescript
const [teams, setTeams] = useState<Team[]>([]);
const [servers, setServers] = useState<Server[]>([]);
const [loadingTeams, setLoadingTeams] = useState(true);
const [loadingServers, setLoadingServers] = useState(true);
const [teamsError, setTeamsError] = useState<string | null>(null);
const [serversError, setServersError] = useState<string | null>(null);
```

### 3. TeamGrid Component
**File**: `src/components/pages/welcome/team-grid.tsx`

**Changes**:
- Added `loading` and `error` props
- Displays loading spinner while fetching teams
- Shows error message if fetch fails
- Prevents interaction during loading state

**New Props**:
```typescript
interface Props {
  teams: Team[];
  availableSlots: number;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  loading?: boolean;
  error?: string | null;
}
```

## Data Flow

```
Welcome Page (Client)
    ↓
apiClient.get("/api/clubs")
    ↓
/api/clubs (Next.js API Route)
    ↓
Read token from httpOnly cookie
    ↓
externalApi.get("clubs", { headers: { Authorization: Bearer ${token} } })
    ↓
External API Gateway
    ↓
Return user's clubs data
    ↓
Display in TeamGrid component
```

## Features

### Parallel Data Fetching
Clubs and servers are fetched simultaneously for better performance:
```typescript
useEffect(() => {
  const fetchData = async () => {
    // Fetch clubs (non-blocking)
    // Fetch servers (non-blocking)
  };
  fetchData();
}, []);
```

### Loading States
- **Clubs loading**: Shows spinner in TeamGrid area
- **Servers loading**: Shows spinner in ServerInfo area
- Independent loading states prevent blocking

### Error Handling
- Displays specific error messages for clubs and servers
- Falls back gracefully if one API fails
- Logs errors to console for debugging

### Authentication
- Requires valid token in httpOnly cookie
- Returns 401 if unauthorized
- Token automatically forwarded to external API

### Empty State
- If user has no teams, only "Create New Team" card is shown
- Available slots calculated based on team count (max 3 teams)

## Team Interface

```typescript
interface Team {
  id: string;
  name: string;
  server: string;
  region: string;
  squadSize: number;
  createdDate: string;
  level: number;
  squadValue: number;
}
```

## Testing

### Test with Real API
1. Login to get authentication token
2. Navigate to `/welcome`
3. Clubs should load from external API
4. Should show user's actual clubs

### Test with Fallback
1. Use `/api/clubs-with-fallback` endpoint
2. If external API fails, mock data will be displayed
3. Check console for fallback indicator

### Test Empty State
1. Login with account that has no clubs
2. Navigate to `/welcome`
3. Should show only "Create New Team" card
4. Should show "3 slots available"

### Test Error State
1. Logout (remove token)
2. Navigate to `/welcome`
3. Should redirect to `/auth/signin` (auth guard)

## User Experience

### First Time User
1. Login successfully
2. Redirected to `/welcome`
3. Shows loading spinner briefly
4. Displays "Create New Team" card (no clubs yet)
5. Can create up to 3 clubs

### Returning User
1. Login successfully
2. Redirected to `/welcome`
3. Shows loading spinner briefly
4. Displays existing clubs
5. Can select club to enter dashboard
6. Can create more clubs if slots available

### Loading Flow
```
┌─────────────────────┐
│  ⟳ Loading clubs... │
└─────────────────────┘
        ↓
┌─────────────────────┐
│  [Club 1] [Club 2]  │
│  [Create New Team]  │
└─────────────────────┘
```

## Integration with Other Features

### Auth Guard
- Welcome page is protected by `AuthInitializer`
- Unauthenticated users redirected to `/auth/signin`
- Token automatically included in API requests

### Redux Store
- User data stored in Redux after authentication
- Can access user info from any component
- Consistent state across application

### Server Selection
- Teams display their assigned server
- Server info fetched separately
- Can view server status and capacity

## Future Enhancements
- Add club refresh button
- Implement club deletion
- Add club switching functionality
- Cache club data to reduce API calls
- Add club statistics and achievements
- Implement club search/filter
- Add club sorting options
