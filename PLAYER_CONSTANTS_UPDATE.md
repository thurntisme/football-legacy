# Player Constants Update

## Overview
Updated the `playerAttributes` constant in `src/constants/player.tsx` to match the new snake_case naming convention from the PlayerAttributes type.

## Changes Made

### Updated Attribute Keys
Changed the following attribute keys from camelCase to snake_case:

| Category | Old Key (camelCase) | New Key (snake_case) | Label |
|----------|--------------------|--------------------|-------|
| Technical | `ballControl` | `ball_control` | Ball Control |
| Technical | `longShots` | `long_shots` | Long Shots |
| Technical | `shortPassing` | `short_passing` | Short Passing |
| Technical | `longPassing` | `long_passing` | Long Passing |
| Technical | `powerShots` | `power_shots` | Power Shots |
| Technical | `setPieces` | `set_pieces` | Set Pieces |
| Mental | `decisionMaking` | `decision_making` | Decision Making |
| Mental | `workRate` | `work_rate` | Work Rate |
| Goalkeeping | `positioningGK` | `positioning_gk` | GK Positioning |
| Goalkeeping | `oneOnOne` | `one_on_one` | One-on-One |
| Goalkeeping | `commandOfArea` | `command_of_area` | Command of Area |

### Added Missing Attribute
Added the missing `reactions` attribute to the Technical category:
- **Key**: `reactions`
- **Label**: "Reactions"
- **Description**: Response time to situations (second ball, rebounds)

### Updated Max Values
Updated the `maxValue` for the Technical category from `1430` to `1540` to account for the added `reactions` attribute (assuming max value of 110 per attribute).

## Complete Updated Structure

```typescript
export const playerAttributes = [
  {
    key: "physical",
    title: "Physical",
    attributes: [
      { key: "pace", label: "Pace" },
      { key: "acceleration", label: "Acceleration" },
      { key: "agility", label: "Agility" },
      { key: "stamina", label: "Stamina" },
      { key: "strength", label: "Strength" },
      { key: "jumping", label: "Jumping" },
    ],
    maxValue: 660, // 6 attributes × 110 max
  },
  {
    key: "technical",
    title: "Technical",
    attributes: [
      { key: "dribbling", label: "Dribbling" },
      { key: "ball_control", label: "Ball Control" },
      { key: "crossing", label: "Crossing" },
      { key: "shooting", label: "Shooting" },
      { key: "finishing", label: "Finishing" },
      { key: "long_shots", label: "Long Shots" },
      { key: "reactions", label: "Reactions" }, // ADDED
      { key: "heading", label: "Heading" },
      { key: "tackling", label: "Tackling" },
      { key: "defending", label: "Defending" },
      { key: "short_passing", label: "Short Passing" },
      { key: "long_passing", label: "Long Passing" },
      { key: "power_shots", label: "Power Shots" },
      { key: "set_pieces", label: "Set Pieces" },
    ],
    maxValue: 1540, // 14 attributes × 110 max
  },
  {
    key: "mental",
    title: "Mental",
    attributes: [
      { key: "vision", label: "Vision" },
      { key: "positioning", label: "Positioning" },
      { key: "anticipation", label: "Anticipation" },
      { key: "decision_making", label: "Decision Making" },
      { key: "composure", label: "Composure" },
      { key: "concentration", label: "Concentration" },
      { key: "work_rate", label: "Work Rate" },
      { key: "leadership", label: "Leadership" },
      { key: "flair", label: "Flair" },
      { key: "creativity", label: "Creativity" },
    ],
    maxValue: 1100, // 10 attributes × 110 max
  },
  {
    key: "goalkeeping",
    title: "Goalkeeping",
    attributes: [
      { key: "reflexes", label: "Reflexes" },
      { key: "diving", label: "Diving" },
      { key: "handling", label: "Handling" },
      { key: "kicking", label: "Kicking" },
      { key: "positioning_gk", label: "GK Positioning" },
      { key: "one_on_one", label: "One-on-One" },
      { key: "command_of_area", label: "Command of Area" },
    ],
    maxValue: 770, // 7 attributes × 110 max
  },
];
```

## Benefits

### 1. Consistency with Type Definition
- Matches the updated `PlayerAttributes` type exactly
- No more mismatch between constants and types
- Consistent snake_case naming throughout

### 2. Complete Attribute Coverage
- All 37 attributes now represented
- No missing attributes in UI components
- Proper categorization maintained

### 3. Accurate Max Values
- Updated to reflect actual number of attributes
- Useful for progress bars and percentage calculations
- Consistent with attribute ranges

## Impact on Components

### Components That Use playerAttributes
The following components will automatically use the updated attribute keys:

1. **Player Detail Dialogs**
   - Attribute displays
   - Player comparison views
   - Player statistics

2. **Player Cards**
   - Attribute previews
   - Quick stats display
   - Player ratings

3. **Player Forms**
   - Attribute editing
   - Player creation
   - Attribute validation

### Automatic Updates
Since components use the `playerAttributes` constant, they will automatically:
- Display the correct attribute labels
- Access the correct attribute keys from player data
- Calculate totals using updated max values

## Usage Examples

### Accessing Attributes in Components
```typescript
import { playerAttributes } from '@/constants/player';

// Get all technical attributes
const technicalAttributes = playerAttributes.find(cat => cat.key === 'technical')?.attributes;

// Display attribute value
const ballControlValue = player.attributes.ball_control;
const ballControlLabel = technicalAttributes?.find(attr => attr.key === 'ball_control')?.label;

// Calculate category total
const technicalTotal = technicalAttributes?.reduce((sum, attr) => {
  return sum + (player.attributes[attr.key as keyof PlayerAttributes] || 0);
}, 0);
```

### Rendering Attribute Lists
```typescript
{playerAttributes.map(category => (
  <div key={category.key}>
    <h3>{category.title}</h3>
    {category.attributes.map(attr => (
      <div key={attr.key}>
        <span>{attr.label}</span>
        <span>{player.attributes[attr.key as keyof PlayerAttributes]}</span>
      </div>
    ))}
  </div>
))}
```

### Progress Bars
```typescript
const categoryProgress = (categoryTotal / category.maxValue) * 100;
```

## Data Migration

### JSON Data Files
If you have JSON data files with player data, they may need to be updated to use the new attribute names:

```json
{
  "attributes": {
    "ball_control": 85,
    "long_shots": 78,
    "short_passing": 92,
    "long_passing": 88,
    "power_shots": 82,
    "set_pieces": 90,
    "decision_making": 87,
    "work_rate": 89,
    "positioning_gk": 75,
    "one_on_one": 80,
    "command_of_area": 85
  }
}
```

### API Responses
Ensure your API responses use the new snake_case attribute names to match the frontend expectations.

## Testing

### Verify Attribute Access
```typescript
import { playerAttributes } from '@/constants/player';
import { Player } from '@/types/player';

// Test that all attribute keys exist in PlayerAttributes type
playerAttributes.forEach(category => {
  category.attributes.forEach(attr => {
    // This should not cause TypeScript errors
    const value: number = testPlayer.attributes[attr.key as keyof PlayerAttributes];
    expect(typeof value).toBe('number');
  });
});
```

### Validate Max Values
```typescript
// Test max value calculations
const physicalMax = 6 * 110; // 6 attributes × 110 max each
const technicalMax = 14 * 110; // 14 attributes × 110 max each
const mentalMax = 10 * 110; // 10 attributes × 110 max each
const goalkeepingMax = 7 * 110; // 7 attributes × 110 max each

expect(playerAttributes[0].maxValue).toBe(physicalMax);
expect(playerAttributes[1].maxValue).toBe(technicalMax);
expect(playerAttributes[2].maxValue).toBe(mentalMax);
expect(playerAttributes[3].maxValue).toBe(goalkeepingMax);
```

## Future Considerations

### Dynamic Attribute Configuration
Consider making attributes configurable:
```typescript
type AttributeConfig = {
  key: keyof PlayerAttributes;
  label: string;
  category: string;
  importance: number;
  displayOrder: number;
};
```

### Position-Specific Attributes
Filter attributes based on player position:
```typescript
const getRelevantAttributes = (position: string) => {
  if (position === 'GK') {
    return playerAttributes.filter(cat => 
      cat.key === 'physical' || cat.key === 'goalkeeping'
    );
  }
  // ... other position logic
};
```

This update ensures complete consistency between the type definitions and constants, providing a solid foundation for player attribute management throughout the application.