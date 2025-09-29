import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/common/page-title";
import StaffOverview from "@/components/pages/staff/overview";
import StaffList from "@/components/pages/staff/list";
import HireStaff from "@/components/pages/staff/hire-staff";

export default function StaffPage() {
  return (
    <>
      <PageTitle title="Staff Management" />

      <StaffOverview />

      <Tabs defaultValue="coaching">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="coaching">Coaching Staff</TabsTrigger>
          <TabsTrigger value="medical">Medical Staff</TabsTrigger>
          <TabsTrigger value="scouting">Scouting Staff</TabsTrigger>
          <TabsTrigger value="hire">Hire Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="coaching" className="mt-6">
          <StaffList type="coaching" />
        </TabsContent>

        <TabsContent value="medical" className="mt-6">
          <StaffList type="medical" />
        </TabsContent>

        <TabsContent value="scouting" className="mt-6">
          <StaffList type="scouting" />
        </TabsContent>

        <TabsContent value="hire" className="mt-6">
          <HireStaff />
        </TabsContent>
      </Tabs>
    </>
  );
}
