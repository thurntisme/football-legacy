# Servers API Implementation

## Overview
Implemented API integration to load the list of servers on the welcome page.

## Files Created/Modified

### 1. API Routes

#### `/api/servers` - Main Endpoint
**File**: `src/app/api/servers/route.tsx`
- Fetches servers list from external API
- Requires authentication (token from httpOnly cookie)
- Returns server data or error response

**Response Format**:
```json
{
  "servers": [
    {
      "id": "eu-1",
      "name": "EU-1",
      "region": "Europe",
      "status": "Online",
      "capacity": 15420
    }
  ],
  "success": true
}
```

#### `/api/servers-with-fallback` - Development Endpoint
**File**: `src/app/api/servers-with-fallback/route.tsx`
- Tries external API first
- Falls back to mock data if external API fails
- Useful for development/testing

### 2. Welcome Page
**File**: `src/app/welcome/page.tsx`

**Changes**:
- Added `useEffect` hook to fetch servers on component mount
- Added state management for servers, loading, and error states
- Integrated with internal API client (`apiClient`)
- Passes server data to `ServerInfo` component

**New State**:
```typescript
const [servers, setServers] = useState<Server[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### 3. ServerInfo Component
**File**: `src/components/pages/welcome/server-info.tsx`

**Changes**:
- Added props interface to accept servers data, loading, and error states
- Displays loading spinner while fetching
- Shows error message if fetch fails
- Falls back to `SERVERS` constant if no API data available
- Dynamic status indicator color based on server status
- Improved player count formatting

**Props**:
```typescript
interface Props {
  servers?: Server[];
  loading?: boolean;
  error?: string | null;
}
```

## Data Flow

```
Welcome Page (Client)
    ↓
apiClient.get("/api/servers")
    ↓
/api/servers (Next.js API Route)
    ↓
Read token from httpOnly cookie
    ↓
externalApi.get("servers", { headers: { Authorization: Bearer ${token} } })
    ↓
External API Gateway
    ↓
Return servers data
    ↓
Display in ServerInfo component
```

## Features

### Loading State
- Shows spinner and "Loading servers..." message
- Prevents layout shift during data fetch

### Error Handling
- Displays error message with icon if fetch fails
- Falls back to constant data for graceful degradation
- Logs errors to console for debugging

### Authentication
- Requires valid token in httpOnly cookie
- Returns 401 if unauthorized
- Token automatically forwarded to external API

### Responsive Design
- Grid layout adapts to screen size
- Mobile-friendly card display

## Testing

### Test with Real API
1. Login to get authentication token
2. Navigate to `/welcome`
3. Servers should load from external API

### Test with Fallback
1. Use `/api/servers-with-fallback` endpoint
2. If external API fails, mock data will be displayed
3. Check console for fallback indicator

### Test Error State
1. Logout (remove token)
2. Navigate to `/welcome`
3. Should show "Unauthorized" or error message

## Environment Variables
Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_EXTERNAL_API_URL=https://your-api-gateway.com
NEXT_PUBLIC_API_GATEWAY_KEY=your-api-key
```

## Future Enhancements
- Add server selection functionality
- Implement real-time server status updates
- Add server capacity indicators
- Cache server data to reduce API calls
- Add refresh button for manual updates
