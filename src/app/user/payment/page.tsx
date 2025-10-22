import PageTitle from "@/components/common/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethods from "@/components/user/payment/payment-methods";
import Subscriptions from "@/components/user/payment/subscriptions";

export default function PaymentPage() {
  return (
    <>
      <PageTitle title="Payment & Subscriptions" />

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <Subscriptions />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-6">
          <PaymentMethods />
        </TabsContent>
      </Tabs>
    </>
  );
}
