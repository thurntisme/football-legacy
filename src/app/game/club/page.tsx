import { Banknote, CalendarDays, Users } from "lucide-react";

import PageTitle from "@/components/common/page-title";
import AvailablePlayers from "@/components/pages/club/available-players";
import ClubFinances from "@/components/pages/club/club-finances";
import ClubHistory from "@/components/pages/club/club-history";
import ClubInformation from "@/components/pages/club/club-information";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClubPage() {
  return (
    <>
      <PageTitle title="Club Management" />

      <ClubInformation />

      <Tabs defaultValue="players" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="players" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Available Players
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center">
            <Banknote className="mr-2 h-4 w-4" />
            Club Finances
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            Club History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-6">
          <AvailablePlayers />
        </TabsContent>

        <TabsContent value="finances" className="space-y-6">
          <ClubFinances />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <ClubHistory />
        </TabsContent>
      </Tabs>
    </>
  );
}
