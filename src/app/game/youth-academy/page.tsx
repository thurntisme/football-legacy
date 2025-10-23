import BtnStaffManagement from "@/components/common/btn-staff-management";
import PageTitle from "@/components/common/page-title";
import YouthCoaching from "@/components/pages/youth-academy/youtch-coaching";
import YouthFacilities from "@/components/pages/youth-academy/youth-facilities";
import YouthPlayers from "@/components/pages/youth-academy/youth-players";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function YouthAcademyPage() {
  return (
    <>
      <PageTitle title="Youth Academy">
        <BtnStaffManagement />
      </PageTitle>

      <Tabs defaultValue="players">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="players">Youth Players</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="coach">Coach</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <YouthPlayers />
        </TabsContent>

        <TabsContent value="facilities">
          <YouthFacilities />
        </TabsContent>

        <TabsContent value="coach">
          <YouthCoaching />
        </TabsContent>
      </Tabs>
    </>
  );
}
