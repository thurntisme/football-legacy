import { User, Users } from "lucide-react";

import PageTitle from "@/components/common/page-title";
import PlayerTraining from "@/components/pages/training/player-training";
import TeamTraining from "@/components/pages/training/team-training";
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

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="player">
            <User className="h-4 w-4 mr-2" />
            Player
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <TeamTraining />
        </TabsContent>

        <TabsContent value="player">
          <PlayerTraining />
        </TabsContent>
      </Tabs>
    </>
  );
}
