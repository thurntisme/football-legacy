import PageTitle from "@/components/common/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyCoins from "@/components/user/payment/buy-coins";
import PaymentMethods from "@/components/user/payment/payment-methods";
import Subscriptions from "@/components/user/payment/subscriptions";
import TransferFunds from "@/components/user/payment/transfer-funds";

export default function PaymentPage() {
  return (
    <>
      <PageTitle title="Payment & Subscriptions" />

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="coins">Buy Coins</TabsTrigger>
          <TabsTrigger value="transfer-funds">Transfer Funds</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <Subscriptions />
        </TabsContent>

        <TabsContent value="coins" className="space-y-6">
          <BuyCoins />
        </TabsContent>

        <TabsContent value="transfer-funds" className="space-y-6">
          <TransferFunds />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-6">
          <PaymentMethods />
        </TabsContent>
      </Tabs>
    </>
  );
}
