export type FacilityLevel = {
  level: number;
  cost: number;
  maintenanceCost: number;
  benefits: string[];
  capacity?: number;
  income?: number;
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  enabled: boolean;
  currentLevel: number;
  maxLevel: number;
  levels: FacilityLevel[];
  defaultLevel?: number;
};
