"use client";

import PageTitle from "@/components/common/page-title";
import LoanMarket from "@/components/pages/market/loan-market";
import MyListings from "@/components/pages/market/my-listings";
import TransferMarket from "@/components/pages/market/transfer-market";
import TransferOverview from "@/components/pages/market/transfer-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketPage() {
  return (
    <>
      <PageTitle title="Transfer Market" />

      <TransferOverview />

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Market</TabsTrigger>
          <TabsTrigger value="loan-market">Loan Market</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <TransferMarket />
        </TabsContent>

        <TabsContent value="loan-market">
          <LoanMarket />
        </TabsContent>

        <TabsContent value="my-listings">
          <MyListings />
        </TabsContent>
      </Tabs>
    </>
  );
}
