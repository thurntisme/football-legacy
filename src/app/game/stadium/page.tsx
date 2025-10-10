"use client";

import type React from "react";
import { useEffect, useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import ConfirmDowngradeDialog from "@/components/pages/stadium/confirm-downgrade-dialog";
import ConfirmUpgradeDialog from "@/components/pages/stadium/confirm-upgrade-dialog";
import StadiumFacility from "@/components/pages/stadium/stadium-facility";
import StadiumOverview from "@/components/pages/stadium/stadium-overview";
import { toast } from "@/components/ui/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Facility } from "@/types/stadium";
import { useQuery } from "@tanstack/react-query";

export default function StadiumPage() {
  const [facilities, setFacilities] = useState<Facility[]>();

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null,
  );
  const [confirmUpgradeDialogOpen, setConfirmUpgradeDialogOpen] =
    useState(false);
  const [confirmDowngradeDialogOpen, setConfirmDowngradeDialogOpen] =
    useState(false);

  const {
    data: facilityList,
    isLoading,
    error,
    refetch,
  } = useQuery<Facility[] | null>({
    queryKey: ["item-list"],
    queryFn: async () => {
      const { data } = await internalApi.get("/stadium");
      return data;
    },
  });

  useEffect(() => {
    if (facilityList) {
      setFacilities(facilityList);
    }
  }, [facilityList]);

  const handleToggleFacility = (facilityId: string) => {
    if (!facilities) return;

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
      }),
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
    if (!selectedFacility || !facilities) return;

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
      }),
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
    if (!selectedFacility || !facilities) return;

    setFacilities(
      facilities.map((facility) => {
        if (facility.id === selectedFacility.id && facility.currentLevel > 1) {
          return {
            ...facility,
            currentLevel: facility.currentLevel - 1,
          };
        }
        return facility;
      }),
    );

    toast({
      title: "Facility Downgraded",
      description: `${selectedFacility.name} has been downgraded to level ${
        selectedFacility.currentLevel - 1
      }.`,
    });

    setConfirmDowngradeDialogOpen(false);
  };

  return (
    <>
      <PageTitle title="Stadium Development" />

      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <StadiumOverview facilities={facilities} />

        <StadiumFacility
          facilities={facilities}
          handleToggleFacility={handleToggleFacility}
          handleUpgradeFacility={handleUpgradeFacility}
          handleDowngradeFacility={handleDowngradeFacility}
        />

        <ConfirmUpgradeDialog
          confirmUpgradeDialogOpen={confirmUpgradeDialogOpen}
          setConfirmUpgradeDialogOpen={setConfirmUpgradeDialogOpen}
          selectedFacility={selectedFacility}
          confirmUpgrade={confirmUpgrade}
        />

        <ConfirmDowngradeDialog
          confirmDowngradeDialogOpen={confirmDowngradeDialogOpen}
          setConfirmDowngradeDialogOpen={setConfirmDowngradeDialogOpen}
          selectedFacility={selectedFacility}
          confirmDowngrade={confirmDowngrade}
        />
      </ContentWrapper>
    </>
  );
}
