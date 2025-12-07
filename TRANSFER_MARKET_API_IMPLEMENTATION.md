# Transfer Market API Implementation

## Overview
Implemented API integration to fetch transfer market players from the external API with support for filtering, pagination, and search.

## Files Created/Modified

### 1. API Routes

#### `/api/market/list` - Main Endpoint
**File**: `src/app/api/market/list/route.ts`
- Fetches transfer market players from external API
- Requires authentication (token from httpOnly cookie)
- Supports query parameters for filtering and pagination

**Request Format**:
```
GET /api/market/list?page=1&limit=20&position=ST&minPrice=1000000&maxPrice=20000000&minRating=85&nationality=Brazil&search=Neymar
```

**Query Parameters**:
- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 20) - Number of items per page
- `position` (optional) - Filter by player position (ST, CM, CB, etc.)
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `minRating` (optional) - Minimum rating filter
- `maxRating` (optional) - Maximum rating filter
- `nationality` (optional) - Filter by nationality
- `search` (optional) - Search by player name

**Response Format**:
```json
{
  "players": [
    {
      "id": "1",
      "name": "Cristiano Ronaldo",
      "position": "ST",
      "rating": 91,
      "price": 15000000,
      "nationality": "Portugal",
      "age": 38,
      "club": "Al Nassr",
      "image": "/placeholder.svg"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20,
  "success": true
}
```

#### `/api/market/list-with-fallback` - Development Endpoint
**File**: `src/app/api/market/list-with-fallback/route.ts`
- Tries external API first
- Falls back to mock data if external API fails
- Applies filters to mock data
- Useful for development/testing

## Data Flow

### Fetch Transfer Market Players
```
Client Component
    ↓
apiClient.get("/api/market/list?page=1&limit=20&position=ST")
    ↓
/api/market/list (Next.js API Route)
    ↓
Read token from httpOnly cookie
    ↓
Parse query parameters
    ↓
Build query string
    ↓
externalApi.get("transfer/players?page=1&limit=20&position=ST", { headers: { Authorization } })
    ↓
External API Gateway
    ↓
Return filtered players data
    ↓
Format response with pagination info
    ↓
Return to client
```

## Features

### 1. Authentication
- Requires valid token in httpOnly cookie
- Returns 401 if unauthorized
- Token automatically forwarded to external API

### 2. Filtering
Multiple filter options:
- **Position**: Filter by player position
- **Price Range**: Min/max price filters
- **Rating Range**: Min/max rating filters
- **Nationality**: Filter by country
- **Search**: Search by player name

### 3. Pagination
- Page-based pagination
- Configurable page size (limit)
- Returns total count for UI
- Returns current page and limit

### 4. Query Parameter Handling
- Extracts parameters from URL
- Validates and sanitizes inputs
- Builds proper query string for external API
- Only includes non-empty parameters

### 5. Error Handling
- Catches API errors
- Returns user-friendly error messages
- Logs errors for debugging
- Proper HTTP status codes

## Usage Examples

### Basic Request
```typescript
const response = await apiClient.get("/api/market/list");
// Returns first 20 players
```

### With Pagination
```typescript
const response = await apiClient.get("/api/market/list?page=2&limit=50");
// Returns players 51-100
```

### Filter by Position
```typescript
const response = await apiClient.get("/api/market/list?position=ST");
// Returns only strikers
```

### Filter by Price Range
```typescript
const response = await apiClient.get("/api/market/list?minPrice=5000000&maxPrice=15000000");
// Returns players priced between 5M and 15M
```

### Filter by Rating
```typescript
const response = await apiClient.get("/api/market/list?minRating=85&maxRating=95");
// Returns players rated 85-95
```

### Search by Name
```typescript
const response = await apiClient.get("/api/market/list?search=Ronaldo");
// Returns players with "Ronaldo" in their name
```

### Combined Filters
```typescript
const response = await apiClient.get(
  "/api/market/list?position=ST&minRating=85&maxPrice=20000000&page=1&limit=10"
);
// Returns top 10 strikers rated 85+ under 20M
```

## Client-Side Integration

### React Component Example
```typescript
"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/api";

export default function TransferMarket() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/api/market/list?page=${page}&limit=20`
        );
        
        if (response.data.success) {
          setPlayers(response.data.players);
          setTotal(response.data.total);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [page]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
          <Pagination 
            page={page} 
            total={total} 
            onPageChange={setPage} 
          />
        </div>
      )}
    </div>
  );
}
```

### With Filters
```typescript
const [filters, setFilters] = useState({
  position: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  search: "",
});

const fetchPlayers = async () => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", "20");
  
  if (filters.position) params.append("position", filters.position);
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.minRating) params.append("minRating", filters.minRating);
  if (filters.search) params.append("search", filters.search);

  const response = await apiClient.get(`/api/market/list?${params.toString()}`);
  // ...
};
```

## Response Structure

### Success Response
```json
{
  "players": [
    {
      "id": "123",
      "name": "Player Name",
      "position": "ST",
      "rating": 85,
      "price": 10000000,
      "nationality": "Brazil",
      "age": 25,
      "club": "Club Name",
      "image": "/player-image.jpg",
      "stats": {
        "pace": 90,
        "shooting": 85,
        "passing": 80,
        "dribbling": 88,
        "defending": 40,
        "physical": 75
      }
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20,
  "success": true
}
```

### Error Response
```json
{
  "message": "Failed to fetch transfer market players",
  "success": false
}
```

### Unauthorized Response
```json
{
  "message": "Unauthorized",
  "success": false
}
```

## Testing

### Test Basic Fetch
1. Login to get authentication token
2. Call `/api/market/list`
3. Should return list of players
4. Should include pagination info

### Test Pagination
1. Call `/api/market/list?page=1&limit=10`
2. Should return first 10 players
3. Call `/api/market/list?page=2&limit=10`
4. Should return next 10 players

### Test Filters
1. Call `/api/market/list?position=ST`
2. Should return only strikers
3. Call `/api/market/list?minRating=85`
4. Should return only players rated 85+

### Test Search
1. Call `/api/market/list?search=Ronaldo`
2. Should return players with "Ronaldo" in name
3. Should be case-insensitive

### Test Error Handling
1. Logout (remove token)
2. Call `/api/market/list`
3. Should return 401 Unauthorized

### Test Fallback
1. Use `/api/market/list-with-fallback`
2. If external API fails, should return mock data
3. Filters should work on mock data

## Performance Considerations

### Query Parameter Optimization
- Only includes non-empty parameters
- Reduces query string size
- Improves API performance

### Pagination
- Limits data transfer
- Improves page load time
- Better user experience

### Caching (Future Enhancement)
```typescript
// Add cache headers
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
  }
});
```

## Security

### Authentication Required
- All requests require valid token
- Token validated on server
- Prevents unauthorized access

### Input Validation
- Query parameters sanitized
- Prevents injection attacks
- Type checking on numeric values

### Rate Limiting (Future Enhancement)
```typescript
// Add rate limiting
const rateLimiter = new RateLimiter({
  windowMs: 60000, // 1 minute
  max: 100 // 100 requests per minute
});
```

## Future Enhancements

### 1. Advanced Filters
- Filter by league
- Filter by club
- Filter by age range
- Filter by contract expiry

### 2. Sorting
- Sort by price (asc/desc)
- Sort by rating (asc/desc)
- Sort by age (asc/desc)
- Sort by name (alphabetical)

### 3. Saved Searches
- Save filter combinations
- Quick access to saved searches
- Share searches with other users

### 4. Real-time Updates
- WebSocket for live price updates
- Notifications for price changes
- Auto-refresh on new listings

### 5. Bulk Operations
- Add multiple players to watchlist
- Compare multiple players
- Bulk bid on players

### 6. Analytics
- Price history charts
- Market trends
- Popular players
- Recommended players
