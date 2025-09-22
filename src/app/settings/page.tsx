import { Bell, Settings, User } from "lucide-react";

import PageTitle from "@/components/common/page-title";
import GameSettings from "@/components/game-settings";
import NotificationSettings from "@/components/notification-settings";
import ProfileSettings from "@/components/profile-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <>
      <PageTitle title="Settings" />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="game" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Game Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="game" className="space-y-6">
          <GameSettings />
        </TabsContent>
      </Tabs>
    </>
  );
}
