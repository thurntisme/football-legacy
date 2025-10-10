import { StaffCategoryEnum, StaffReputationEnum } from "@/constants/staff";

export type StaffMember = {
  id: number;
  name: string;
  role: StaffCategoryEnum;
  specialty?: string;
  nationality: string;
  age: number;
  experience: number; // 1-20
  reputation: StaffReputationEnum;
  salary: number;
  contractYears?: number;
  attributes: {
    tactical: number; // 1-20
    technical: number; // 1-20
    mental: number; // 1-20
    physical: number; // 1-20
    youth: number; // 1-20
    scouting: number; // 1-20
    medical: number; // 1-20
    negotiation: number; // 1-20
  };
  benefits: string[];
  hired?: boolean;
};
