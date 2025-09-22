import React from 'react';

import { Check, FileText, TrendingUp, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  incomeProposals: any[];
  handleApproveProposal: (proposalId: number) => void;
  handleRejectProposal: (proposalId: number) => void;
};

const IncomeProposals = ({
  incomeProposals,
  handleApproveProposal,
  handleRejectProposal,
}: Props) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Income Proposals
        </CardTitle>
        <CardDescription>
          Review and approve income opportunities for your club
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incomeProposals.map((proposal) => (
            <Card key={proposal.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 md:p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{proposal.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {proposal.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Potential Income
                      </p>
                      <p className="font-bold text-green-600">
                        £{proposal.value.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{proposal.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Proposed By
                      </p>
                      <p className="font-medium">{proposal.proposedBy}</p>
                    </div>
                  </div>
                  {proposal.status === 'pending' && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveProposal(proposal.id)}
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectProposal(proposal.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
                {proposal.image && (
                  <div className="w-full md:w-48 h-32 md:h-auto">
                    <img
                      src={proposal.image || '/placeholder.svg'}
                      alt={proposal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
          {incomeProposals.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Income Proposals</h3>
              <p className="text-muted-foreground mb-4">
                There are currently no income proposals to review.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeProposals;
