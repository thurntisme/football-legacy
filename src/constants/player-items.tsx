import {
  Award,
  Brain,
  ClubIcon,
  Crown,
  Dumbbell,
  Flame,
  Footprints,
  Gem,
  Shield,
  Swords,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Import the correct type for icons

export type PlayerItem = {
  id: number;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: 'normal' | 'rising' | 'young' | 'legend';
  icon: LucideIcon; // Use LucideIcon type for the icon property
  iconClassName: string; // New field for icon class names
  boostDescription: string;
};

export const playerItems: PlayerItem[] = [
  {
    id: 1,
    name: 'Normal Player Card',
    description: 'Generate a balanced player with standard attributes',
    rarity: 'common',
    type: 'normal',
    icon: ClubIcon,
    iconClassName: 'h-8 w-8 text-blue-500',
    boostDescription: 'No special boosts',
  },
  {
    id: 2,
    name: 'Rising Star Card',
    description: 'Generate a player with high potential and growth',
    rarity: 'rare',
    type: 'rising',
    icon: TrendingUp,
    iconClassName: 'h-8 w-8 text-purple-500',
    boostDescription: 'Faster training development, higher potential ceiling',
  },
  {
    id: 3,
    name: 'Young Talent Card',
    description: 'Generate a very young player with exceptional potential',
    rarity: 'epic',
    type: 'young',
    icon: Zap,
    iconClassName: 'h-8 w-8 text-amber-500',
    boostDescription:
      'Very high potential, lower initial rating but faster growth',
  },
  {
    id: 4,
    name: 'Legend Card',
    description:
      'Generate an experienced player with exceptional current ability',
    rarity: 'legendary',
    type: 'legend',
    icon: Award,
    iconClassName: 'h-8 w-8 text-red-500',
    boostDescription:
      'Highest initial rating, leadership bonus for team morale',
  },
  {
    id: 5,
    name: 'Defensive Specialist Card',
    description: 'Generate a player with exceptional defensive abilities',
    rarity: 'rare',
    type: 'normal',
    icon: Shield,
    iconClassName: 'h-8 w-8 text-green-500',
    boostDescription:
      'Enhanced defensive attributes, better positioning and tackling',
  },
  {
    id: 6,
    name: 'Attacking Maestro Card',
    description: 'Generate a player with exceptional attacking abilities',
    rarity: 'rare',
    type: 'normal',
    icon: Swords,
    iconClassName: 'h-8 w-8 text-orange-500',
    boostDescription:
      'Enhanced attacking attributes, better finishing and creativity',
  },
  {
    id: 7,
    name: 'Physical Beast Card',
    description: 'Generate a player with exceptional physical attributes',
    rarity: 'epic',
    type: 'normal',
    icon: Dumbbell,
    iconClassName: 'h-8 w-8 text-indigo-500',
    boostDescription:
      'Enhanced strength, stamina and pace, more resistant to injuries',
  },
  {
    id: 8,
    name: 'Technical Wizard Card',
    description: 'Generate a player with exceptional technical abilities',
    rarity: 'epic',
    type: 'normal',
    icon: Brain,
    iconClassName: 'h-8 w-8 text-cyan-500',
    boostDescription: 'Enhanced ball control, passing and vision',
  },
  {
    id: 9,
    name: 'Speedster Card',
    description: 'Generate a player with exceptional pace and agility',
    rarity: 'rare',
    type: 'normal',
    icon: Footprints,
    iconClassName: 'h-8 w-8 text-blue-500',
    boostDescription: 'Enhanced pace, agility and acceleration',
  },
  {
    id: 10,
    name: 'Wonderkid Card',
    description:
      'Generate an extremely young player with world-class potential',
    rarity: 'legendary',
    type: 'young',
    icon: Flame,
    iconClassName: 'h-8 w-8 text-pink-500',
    boostDescription: 'Extremely high potential, special development traits',
  },
  {
    id: 11,
    name: 'Premium Player Card',
    description: 'Generate a high-quality player with balanced attributes',
    rarity: 'epic',
    type: 'normal',
    icon: Gem,
    iconClassName: 'h-8 w-8 text-violet-500',
    boostDescription: 'Higher overall rating, balanced attribute distribution',
  },
  {
    id: 12,
    name: 'World Class Card',
    description: 'Generate a world-class player with exceptional abilities',
    rarity: 'legendary',
    type: 'normal',
    icon: Crown,
    iconClassName: 'h-8 w-8 text-yellow-500',
    boostDescription: 'Very high rating, special traits, leadership qualities',
  },
];
