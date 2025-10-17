"use client";

import { useState } from "react";

import { Building2, Heart, Users } from "lucide-react";

import PageTitle from "@/components/common/page-title";
import { MedicalFacilities } from "@/components/pages/medical/facilities";
import { InjuryPlayers } from "@/components/pages/medical/injury-players";
import { MedicalStaffAssignment } from "@/components/pages/medical/staff-assignment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalPage() {
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <>
      <PageTitle
        title="Medical Center"
        subTitle="Manage staff, facilities, and injured players"
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="staff" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Staff Assignment</span>
            <span className="sm:hidden">Staff</span>
          </TabsTrigger>
          <TabsTrigger value="facilities" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Facilities</span>
            <span className="sm:hidden">Facilities</span>
          </TabsTrigger>
          <TabsTrigger value="injuries" className="gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Injuries</span>
            <span className="sm:hidden">Injuries</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff">
          <MedicalStaffAssignment />
        </TabsContent>

        <TabsContent value="facilities">
          <MedicalFacilities />
        </TabsContent>

        <TabsContent value="injuries">
          <InjuryPlayers />
        </TabsContent>
      </Tabs>
    </>
  );
}
