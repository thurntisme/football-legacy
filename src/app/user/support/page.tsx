import PageTitle from "@/components/common/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Faq from "@/components/user/support/faq";
import NewTicketDialog from "@/components/user/support/new-ticket-dialog";
import SupportTickets from "@/components/user/support/support-tickets";

export default function SupportPage() {
  return (
    <>
      <PageTitle title="Support Center">
        <NewTicketDialog />
      </PageTitle>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <SupportTickets />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Faq />
        </TabsContent>
      </Tabs>
    </>
  );
}
