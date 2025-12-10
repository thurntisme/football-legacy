# Transfer Bid Implementation - Correction

## Issue
Initially updated the wrong file (`src/components/common/player-detail-dialog.tsx`) instead of the market-specific dialog (`src/components/pages/market/market-player-detail-dialog.tsx`).

## Resolution
1. Reverted changes to `src/components/common/player-detail-dialog.tsx`
2. Updated the correct file: `src/components/pages/market/market-player-detail-dialog.tsx`

## Correct Implementation

### File Updated
**`src/components/pages/market/market-player-detail-dialog.tsx`**

### Changes Made

#### 1. Added Imports
```typescript
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api/api";
```

#### 2. Added State Management
```typescript
const [bidAmount, setBidAmount] = useState("");
const [weeklyWage, setWeeklyWage] = useState("");
const [notes, setNotes] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
```

#### 3. Added Bid Handler Function
```typescript
const handlePlaceBid = async () => {
  // Validation
  if (!bidAmount || !weeklyWage) {
    toast({ title: "Error", description: "Please enter bid amount and weekly wage offer", variant: "destructive" });
    return;
  }

  // Parse and validate numbers
  const bidAmountNum = parseFloat(bidAmount);
  const weeklyWageNum = parseFloat(weeklyWage);

  if (isNaN(bidAmountNum) || bidAmountNum <= 0) {
    toast({ title: "Error", description: "Please enter a valid bid amount", variant: "destructive" });
    return;
  }

  if (isNaN(weeklyWageNum) || weeklyWageNum <= 0) {
    toast({ title: "Error", description: "Please enter a valid weekly wage offer", variant: "destructive" });
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await apiClient.post("/api/fm/transfer/bids", {
      player_instance_id: selectedPlayer.id,
      club_id: selectedPlayer.clubId || 1,
      bid_amount: bidAmountNum,
      weekly_wage_offer: weeklyWageNum,
      ...(notes && { notes }),
    });

    if (response.data.success) {
      toast({ title: "Success!", description: response.data.message || "Bid placed successfully" });
      setBidAmount("");
      setWeeklyWage("");
      setNotes("");
    } else {
      toast({ title: "Error", description: response.data.message || "Failed to place bid", variant: "destructive" });
    }
  } catch (err: any) {
    console.error("Error placing bid:", err);
    toast({ title: "Error", description: err.response?.data?.message || "Failed to place bid", variant: "destructive" });
  } finally {
    setIsSubmitting(false);
  }
};
```

#### 4. Added Bid Form UI
Added a new Card component with the bid form before the AlertDialogFooter:

```typescript
<Card className="bg-blue-50 dark:bg-blue-950/20">
  <CardContent className="p-4">
    <div className="flex items-center gap-2 mb-4">
      <ShoppingCart className="h-5 w-5 text-blue-600" />
      <h3 className="font-semibold text-lg">Place Your Bid</h3>
    </div>
    
    <div className="space-y-4">
      {/* Bid Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="bid-amount">Bid Amount</Label>
        <Input
          id="bid-amount"
          type="number"
          placeholder="Enter bid amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Market Value: {formatCurrency(selectedPlayer.marketValue)}
        </p>
      </div>

      {/* Weekly Wage Input */}
      <div className="space-y-2">
        <Label htmlFor="weekly-wage">Weekly Wage Offer</Label>
        <Input
          id="weekly-wage"
          type="number"
          placeholder="Enter weekly wage offer"
          value={weeklyWage}
          onChange={(e) => setWeeklyWage(e.target.value)}
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Current Salary: {formatCurrency(selectedPlayer.salary)}
        </p>
      </div>

      {/* Notes Textarea */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Add any notes about this bid..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handlePlaceBid}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Placing Bid...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Confirm Purchase
          </>
        )}
      </Button>
    </div>
  </CardContent>
</Card>
```

#### 5. Removed Old Purchase Button
Removed the `ConfirmPurchasePlayerDialog` button from the footer since the bid form now handles purchases.

## Key Differences from Common Dialog

### Common Player Detail Dialog
- **Purpose**: View player details in squad, team management, etc.
- **Features**: Player stats, attributes, form, fitness
- **No bid functionality**: Just displays information

### Market Player Detail Dialog
- **Purpose**: View and bid on players in transfer market
- **Features**: Player stats + market info + competing offers + bid form
- **Bid functionality**: Integrated bid form with API call

## API Integration

### Endpoint
```
POST /api/fm/transfer/bids
```

### Request Body
```json
{
  "player_instance_id": 1,
  "club_id": 2,
  "bid_amount": 1000000,
  "weekly_wage_offer": 50000,
  "notes": "We need a striker"  // optional
}
```

### Response
```json
{
  "bid": {
    "id": "bid-123",
    "player_instance_id": 1,
    "club_id": 2,
    "bid_amount": 1000000,
    "weekly_wage_offer": 50000,
    "status": "pending",
    "created_at": "2024-12-08T10:00:00Z"
  },
  "message": "Bid placed successfully",
  "success": true
}
```

## Visual Layout

The bid form appears in the right column after the "Competing Offers" section:

```
┌─────────────────────────────────────────────────┐
│ Transfer Market - Player Details               │
├─────────────────────────────────────────────────┤
│ Left Column          │ Right Column             │
│ - Player Image       │ - Market Value           │
│ - Basic Info         │ - Competing Offers       │
│ - Personality        │ - Place Your Bid ← NEW   │
│ - Purchase Reasons   │   • Bid Amount           │
│                      │   • Weekly Wage          │
│                      │   • Notes                │
│                      │   • [Confirm Purchase]   │
└─────────────────────────────────────────────────┘
```

## Testing

1. Navigate to transfer market
2. Click shopping cart icon on a player
3. Dialog opens with player details
4. Scroll to "Place Your Bid" section
5. Enter bid amount and weekly wage
6. (Optional) Add notes
7. Click "Confirm Purchase"
8. Should see success toast
9. Form should reset

## Files Status

### ✅ Correct Files
- `src/components/pages/market/market-player-detail-dialog.tsx` - Updated with bid form
- `src/app/api/fm/transfer/bids/route.tsx` - API endpoint created
- `src/app/api/fm/transfer/bids-with-fallback/route.tsx` - Fallback endpoint created

### ✅ Reverted Files
- `src/components/common/player-detail-dialog.tsx` - Reverted to original (no bid form)

## Conclusion

The transfer bid functionality is now correctly implemented in the market-specific player detail dialog, keeping the common player detail dialog clean for non-market use cases.
