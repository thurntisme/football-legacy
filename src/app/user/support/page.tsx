import PageTitle from "@/components/common/page-title";
import Faq from "@/components/faq";
import NewTicket from "@/components/new-ticket";
import SupportTickets from "@/components/support-tickets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SupportPage() {
  return (
    <>
      <PageTitle title="Support Center" />

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <SupportTickets />
        </TabsContent>

        <TabsContent value="new-ticket" className="space-y-6">
          <NewTicket />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Faq />
        </TabsContent>
      </Tabs>
    </>
  );
}
