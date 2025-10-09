"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { IncomeRequests } from "@/mock/club";

import BudgetAllocation from "./budget-allocation";
import FinanceOverview from "./finance-overview";
import FinancialBreakdown from "./financial-breakdown";
import IncomeProposals from "./income-proposals";

const transferBudget = 25000000; // Initial transfer budget
const wageBudget = 850000; // Initial wage budget

export default function ClubFinances() {
  const [incomeProposals, setIncomeProposals] = useState(IncomeRequests);

  const handleApproveProposal = (id: number) => {
    setIncomeProposals(
      incomeProposals.map((proposal) =>
        proposal.id === id ? { ...proposal, status: "approved" } : proposal,
      ),
    );
    toast({
      title: "Proposal Approved",
      description: "The income proposal has been approved successfully.",
    });
  };

  const handleRejectProposal = (id: number) => {
    setIncomeProposals(
      incomeProposals.map((proposal) =>
        proposal.id === id ? { ...proposal, status: "rejected" } : proposal,
      ),
    );
    toast({
      title: "Proposal Rejected",
      description: "The income proposal has been rejected.",
    });
  };

  const handleSaveBudgetAllocation = (
    transferBudget: number,
    wageBudget: number,
  ) => {
    console.log(
      `Transfer Budget: £${transferBudget}, Wage Budget: £${wageBudget}/week`,
    );
    toast({
      title: "Budget Allocation Saved",
      description: `Transfer Budget: £${transferBudget.toLocaleString()}, Wage Budget: £${wageBudget.toLocaleString()}/week`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Finances</CardTitle>
        <CardDescription>
          Financial overview and budget allocation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Financial Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
            <TabsTrigger value="breakdown">Income & Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <FinanceOverview
              transferBudget={transferBudget}
              wageBudget={wageBudget}
            />

            <IncomeProposals
              incomeProposals={incomeProposals}
              handleApproveProposal={handleApproveProposal}
              handleRejectProposal={handleRejectProposal}
            />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetAllocation
              transfer={transferBudget}
              wage={wageBudget}
              onSaveBudgetAllocation={handleSaveBudgetAllocation}
            />
          </TabsContent>

          <TabsContent value="breakdown">
            <FinancialBreakdown />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
