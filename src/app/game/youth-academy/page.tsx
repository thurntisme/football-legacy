import PageTitle from "@/components/common/page-title";
import YouthFacilities from "@/components/pages/youth-academy/youth-facilities";
import YouthIntake from "@/components/pages/youth-academy/youth-intake";
import YouthMatches from "@/components/pages/youth-academy/youth-matches";
import YouthPlayers from "@/components/pages/youth-academy/youth-players";
import YouthScouting from "@/components/pages/youth-academy/youth-scouting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function YouthAcademyPage() {
  return (
    <>
      <PageTitle title="Youth Academy">
        <div className="flex items-center bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-md">
          <span className="text-amber-800 dark:text-amber-300 font-medium text-sm">
            Academy Budget: €2.5M/year
          </span>
        </div>
      </PageTitle>

      <Tabs defaultValue="players">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="players">Youth Players</TabsTrigger>
          <TabsTrigger value="scouting">Youth Scouting</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="matches">Youth Matches</TabsTrigger>
          <TabsTrigger value="intake">Youth Intake</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <YouthPlayers />
        </TabsContent>

        <TabsContent value="scouting">
          <YouthScouting />
        </TabsContent>

        <TabsContent value="facilities">
          <YouthFacilities />
        </TabsContent>

        <TabsContent value="matches">
          <YouthMatches />
        </TabsContent>

        <TabsContent value="intake">
          <YouthIntake />
        </TabsContent>
      </Tabs>
    </>
  );
}
