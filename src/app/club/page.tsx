import { Banknote, Users } from "lucide-react";

import ClubFinances from "@/components/club-finances";
import ClubInformation from "@/components/club-information";
import PageTitle from "@/components/common/page-title";
import PlayerManagement from "@/components/player-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClubPage() {
  return (
    <>
      <PageTitle title="Club Management" />

      <ClubInformation />

      <Tabs defaultValue="players" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="players" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Player Management
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center">
            <Banknote className="mr-2 h-4 w-4" />
            Club Finances
          </TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-6">
          <PlayerManagement />
        </TabsContent>

        <TabsContent value="finances" className="space-y-6">
          <ClubFinances />
        </TabsContent>
      </Tabs>
    </>
  );
}
