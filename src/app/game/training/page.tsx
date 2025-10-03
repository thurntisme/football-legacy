import PageTitle from "@/components/common/page-title";
import TrainingFocus from "@/components/pages/training/training-focus";
import TrainingSchedule from "@/components/pages/training/training-schedule";
import TrainingSessions from "@/components/pages/training/training-sessions";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrainingPage() {
  return (
    <>
      <PageTitle
        title="Training"
        subTitle="Manage your team's training schedule and player development"
      />

      <Separator className="my-4" />

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="sessions">Training Sessions</TabsTrigger>
          <TabsTrigger value="focus">Training Focus</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4 mt-6">
          <TrainingSchedule />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 mt-6">
          <TrainingSessions />
        </TabsContent>

        <TabsContent value="focus" className="space-y-4 mt-6">
          <TrainingFocus />
        </TabsContent>
      </Tabs>
    </>
  );
}
