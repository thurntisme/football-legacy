"use client";

import type React from "react";
import { useState } from "react";

import {
  Building2,
  ParkingSquare,
  ShoppingBag,
  Sofa,
  Ticket,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react";

import PageTitle from "@/components/common/page-title";
import StadiumDowngradeConfirmationDialog from "@/components/stadium-downgrade-confirmation-dialog";
import StadiumFacility from "@/components/stadium-facility";
import StadiumOverview from "@/components/stadium-overview";
import StadiumUpgradeConfirmationDialog from "@/components/stadium-upgrade-confirmation-dialog";
import { toast } from "@/components/ui/use-toast";

// Define facility types
type FacilityLevel = {
  level: number;
  cost: number;
  maintenanceCost: number;
  benefits: string[];
  capacity?: number;
  income?: number;
};

type Facility = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  currentLevel: number;
  maxLevel: number;
  levels: FacilityLevel[];
  defaultLevel?: number;
};

export default function StadiumPage() {
  // Initial facilities data
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: "main-stand",
      name: "Main Stand",
      description: "The primary seating area for fans",
      icon: <Building2 className="h-5 w-5" />,
      enabled: true,
      currentLevel: 3,
      maxLevel: 5,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 500000,
          maintenanceCost: 5000,
          capacity: 5000,
          income: 50000,
          benefits: ["Basic seating", "Standard amenities"],
        },
        {
          level: 2,
          cost: 1500000,
          maintenanceCost: 10000,
          capacity: 10000,
          income: 120000,
          benefits: [
            "Improved seating",
            "Better visibility",
            "More concession stands",
          ],
        },
        {
          level: 3,
          cost: 3000000,
          maintenanceCost: 20000,
          capacity: 20000,
          income: 250000,
          benefits: [
            "Premium seating options",
            "Executive boxes",
            "Enhanced fan experience",
          ],
        },
        {
          level: 4,
          cost: 6000000,
          maintenanceCost: 35000,
          capacity: 35000,
          income: 450000,
          benefits: [
            "State-of-the-art seating",
            "Expanded executive areas",
            "Advanced amenities",
          ],
        },
        {
          level: 5,
          cost: 12000000,
          maintenanceCost: 60000,
          capacity: 60000,
          income: 800000,
          benefits: [
            "World-class stadium experience",
            "Maximum capacity",
            "Elite facilities",
          ],
        },
      ],
    },
    {
      id: "hospitality",
      name: "Hospitality Suites",
      description: "Premium areas for VIP guests and corporate clients",
      icon: <Sofa className="h-5 w-5" />,
      enabled: true,
      currentLevel: 2,
      maxLevel: 5,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 300000,
          maintenanceCost: 8000,
          income: 30000,
          benefits: ["Basic hospitality boxes", "Simple catering"],
        },
        {
          level: 2,
          cost: 800000,
          maintenanceCost: 15000,
          income: 80000,
          benefits: [
            "Improved suites",
            "Better catering options",
            "Enhanced service",
          ],
        },
        {
          level: 3,
          cost: 2000000,
          maintenanceCost: 25000,
          income: 200000,
          benefits: [
            "Premium suites",
            "High-end catering",
            "Exclusive experiences",
          ],
        },
        {
          level: 4,
          cost: 4000000,
          maintenanceCost: 40000,
          income: 400000,
          benefits: ["Luxury suites", "Gourmet dining", "Concierge service"],
        },
        {
          level: 5,
          cost: 8000000,
          maintenanceCost: 70000,
          income: 800000,
          benefits: [
            "World-class luxury",
            "Celebrity chef catering",
            "Ultimate VIP experience",
          ],
        },
      ],
    },
    {
      id: "concessions",
      name: "Concession Stands",
      description: "Food and beverage outlets throughout the stadium",
      icon: <Utensils className="h-5 w-5" />,
      enabled: true,
      currentLevel: 2,
      maxLevel: 4,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 100000,
          maintenanceCost: 3000,
          income: 15000,
          benefits: ["Basic food options", "Limited beverage selection"],
        },
        {
          level: 2,
          cost: 300000,
          maintenanceCost: 6000,
          income: 40000,
          benefits: [
            "More food variety",
            "Expanded beverage options",
            "Faster service",
          ],
        },
        {
          level: 3,
          cost: 700000,
          maintenanceCost: 12000,
          income: 90000,
          benefits: [
            "Premium food options",
            "Craft beverages",
            "Multiple service points",
          ],
        },
        {
          level: 4,
          cost: 1500000,
          maintenanceCost: 20000,
          income: 200000,
          benefits: [
            "Gourmet food options",
            "Full bar service",
            "Mobile ordering",
          ],
        },
      ],
    },
    {
      id: "merchandise",
      name: "Club Store",
      description: "Official team merchandise shop",
      icon: <ShoppingBag className="h-5 w-5" />,
      enabled: true,
      currentLevel: 2,
      maxLevel: 4,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 150000,
          maintenanceCost: 4000,
          income: 20000,
          benefits: ["Basic merchandise", "Limited selection"],
        },
        {
          level: 2,
          cost: 400000,
          maintenanceCost: 8000,
          income: 50000,
          benefits: [
            "Expanded merchandise",
            "Better store layout",
            "More exclusive items",
          ],
        },
        {
          level: 3,
          cost: 900000,
          maintenanceCost: 15000,
          income: 120000,
          benefits: [
            "Premium merchandise",
            "Custom items",
            "Interactive experiences",
          ],
        },
        {
          level: 4,
          cost: 2000000,
          maintenanceCost: 25000,
          income: 250000,
          benefits: [
            "Flagship store experience",
            "Limited edition items",
            "Personalization services",
          ],
        },
      ],
    },
    {
      id: "parking",
      name: "Parking Facilities",
      description: "Parking areas for fans and staff",
      icon: <ParkingSquare className="h-5 w-5" />,
      enabled: true,
      currentLevel: 1,
      maxLevel: 3,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 200000,
          maintenanceCost: 5000,
          income: 10000,
          benefits: ["Basic parking", "Limited spaces"],
        },
        {
          level: 2,
          cost: 600000,
          maintenanceCost: 10000,
          income: 30000,
          benefits: ["Expanded parking", "Better access", "Reserved sections"],
        },
        {
          level: 3,
          cost: 1500000,
          maintenanceCost: 20000,
          income: 70000,
          benefits: ["Multi-level parking", "VIP parking", "Shuttle service"],
        },
      ],
    },
    {
      id: "technology",
      name: "Stadium Technology",
      description: "Screens, WiFi, and other tech amenities",
      icon: <Wifi className="h-5 w-5" />,
      enabled: false,
      currentLevel: 0,
      maxLevel: 4,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 250000,
          maintenanceCost: 8000,
          benefits: ["Basic screens", "Limited WiFi"],
        },
        {
          level: 2,
          cost: 700000,
          maintenanceCost: 15000,
          benefits: ["HD screens", "Stadium-wide WiFi", "Basic mobile app"],
        },
        {
          level: 3,
          cost: 1800000,
          maintenanceCost: 30000,
          benefits: ["4K screens", "High-speed WiFi", "Enhanced mobile app"],
        },
        {
          level: 4,
          cost: 4000000,
          maintenanceCost: 50000,
          benefits: [
            "State-of-the-art displays",
            "5G connectivity",
            "AR/VR experiences",
          ],
        },
      ],
    },
    {
      id: "media",
      name: "Media Facilities",
      description: "Press boxes and broadcast infrastructure",
      icon: <Tv className="h-5 w-5" />,
      enabled: false,
      currentLevel: 0,
      maxLevel: 3,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 200000,
          maintenanceCost: 5000,
          benefits: ["Basic press area", "Limited broadcast capabilities"],
        },
        {
          level: 2,
          cost: 600000,
          maintenanceCost: 12000,
          benefits: [
            "Improved press facilities",
            "Better broadcast infrastructure",
            "Interview rooms",
          ],
        },
        {
          level: 3,
          cost: 1500000,
          maintenanceCost: 25000,
          benefits: [
            "State-of-the-art press center",
            "Advanced broadcast capabilities",
            "Media lounge",
          ],
        },
      ],
    },
    {
      id: "ticketing",
      name: "Ticketing System",
      description: "Ticket sales and entry management",
      icon: <Ticket className="h-5 w-5" />,
      enabled: true,
      currentLevel: 1,
      maxLevel: 3,
      defaultLevel: 1,
      levels: [
        {
          level: 1,
          cost: 100000,
          maintenanceCost: 3000,
          benefits: ["Basic ticketing", "Manual entry checks"],
        },
        {
          level: 2,
          cost: 300000,
          maintenanceCost: 8000,
          benefits: ["Digital ticketing", "Automated entry", "Basic analytics"],
        },
        {
          level: 3,
          cost: 800000,
          maintenanceCost: 15000,
          benefits: [
            "Fully integrated digital system",
            "Contactless entry",
            "Advanced analytics",
            "Dynamic pricing",
          ],
        },
      ],
    },
  ]);

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [confirmUpgradeDialogOpen, setConfirmUpgradeDialogOpen] =
    useState(false);
  const [confirmDowngradeDialogOpen, setConfirmDowngradeDialogOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate total maintenance costs
  const totalMaintenanceCost = facilities
    .filter((facility) => facility.enabled)
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level ? level.maintenanceCost : 0);
    }, 0);

  // Calculate total income
  const totalIncome = facilities
    .filter((facility) => facility.enabled)
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level && level.income ? level.income : 0);
    }, 0);

  // Calculate total capacity
  const totalCapacity = facilities
    .filter((facility) => facility.enabled && facility.id === "main-stand")
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level && level.capacity ? level.capacity : 0);
    }, 0);

  const handleToggleFacility = (facilityId: string) => {
    setFacilities(
      facilities.map((facility) => {
        if (facility.id === facilityId) {
          // If enabling, set to default level
          const newLevel =
            !facility.enabled && facility.defaultLevel
              ? facility.defaultLevel
              : facility.currentLevel;
          return {
            ...facility,
            enabled: !facility.enabled,
            currentLevel: !facility.enabled ? newLevel : facility.currentLevel,
          };
        }
        return facility;
      })
    );

    toast({
      title: "Facility Updated",
      description: `The facility has been ${
        facilities.find((f) => f.id === facilityId)?.enabled
          ? "disabled"
          : "enabled"
      }.`,
    });
  };

  const handleUpgradeFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setConfirmUpgradeDialogOpen(true);
  };

  const handleDowngradeFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setConfirmDowngradeDialogOpen(true);
  };

  const confirmUpgrade = () => {
    if (!selectedFacility) return;

    setFacilities(
      facilities.map((facility) => {
        if (
          facility.id === selectedFacility.id &&
          facility.currentLevel < facility.maxLevel
        ) {
          return {
            ...facility,
            currentLevel: facility.currentLevel + 1,
          };
        }
        return facility;
      })
    );

    const nextLevel = selectedFacility.currentLevel + 1;
    const upgradeCost = selectedFacility.levels[nextLevel - 1].cost;

    toast({
      title: "Facility Upgraded",
      description: `${
        selectedFacility.name
      } has been upgraded to level ${nextLevel} for £${upgradeCost.toLocaleString()}.`,
    });

    setConfirmUpgradeDialogOpen(false);
  };

  const confirmDowngrade = () => {
    if (!selectedFacility) return;

    setFacilities(
      facilities.map((facility) => {
        if (facility.id === selectedFacility.id && facility.currentLevel > 1) {
          return {
            ...facility,
            currentLevel: facility.currentLevel - 1,
          };
        }
        return facility;
      })
    );

    toast({
      title: "Facility Downgraded",
      description: `${selectedFacility.name} has been downgraded to level ${
        selectedFacility.currentLevel - 1
      }.`,
    });

    setConfirmDowngradeDialogOpen(false);
  };

  const resetToDefault = (facilityId: string) => {
    setFacilities(
      facilities.map((facility) => {
        if (facility.id === facilityId && facility.defaultLevel) {
          return {
            ...facility,
            currentLevel: facility.defaultLevel,
          };
        }
        return facility;
      })
    );

    toast({
      title: "Facility Reset",
      description: "The facility has been reset to its default level.",
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <PageTitle title="Stadium Development">
          <div className="flex items-center bg-blue-100 dark:bg-blue-950 px-3 py-1 rounded-md">
            <span className="text-blue-800 dark:text-blue-300 font-medium text-sm">
              Stadium Budget: €10M
            </span>
          </div>
        </PageTitle>

        <StadiumOverview
          totalCapacity={totalCapacity}
          totalMaintenanceCost={totalMaintenanceCost}
          totalIncome={totalIncome}
        />

        <StadiumFacility
          facilities={facilities}
          handleToggleFacility={handleToggleFacility}
          handleUpgradeFacility={handleUpgradeFacility}
          handleDowngradeFacility={handleDowngradeFacility}
        />
      </div>

      <StadiumUpgradeConfirmationDialog
        confirmUpgradeDialogOpen={confirmUpgradeDialogOpen}
        setConfirmUpgradeDialogOpen={setConfirmUpgradeDialogOpen}
        selectedFacility={selectedFacility}
        confirmUpgrade={confirmUpgrade}
      />

      <StadiumDowngradeConfirmationDialog
        confirmDowngradeDialogOpen={confirmDowngradeDialogOpen}
        setConfirmDowngradeDialogOpen={setConfirmDowngradeDialogOpen}
        selectedFacility={selectedFacility}
        confirmDowngrade={confirmDowngrade}
      />
    </>
  );
}
