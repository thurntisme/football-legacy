"use client";

import { useState } from "react";

import PageTitle from "@/components/common/page-title";
import HireStaff from "@/components/pages/staff/hire-staff";
import StaffList from "@/components/pages/staff/list";
import StaffOverview from "@/components/pages/staff/overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaffPage() {
  const [selectedTab, setSelectedTab] = useState<string>("own");

  const handleSelectHireTab = () => {
    setSelectedTab("hire");
  };

  return (
    <>
      <PageTitle title="Staff Management" />

      <StaffOverview />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="own">My Staff</TabsTrigger>
          <TabsTrigger value="hire">Hire Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="own" className="mt-6">
          <StaffList onSelectHireTab={handleSelectHireTab} />
        </TabsContent>

        <TabsContent value="hire" className="mt-6">
          <HireStaff />
        </TabsContent>
      </Tabs>
    </>
  );
}
