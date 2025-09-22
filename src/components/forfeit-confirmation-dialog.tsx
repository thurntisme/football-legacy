import React from 'react';

import { AlertTriangle, DollarSign } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  forfeitDialogOpen: boolean;
  setForfeitDialogOpen: (open: boolean) => void;
  handleForfeit: () => void;
};

const ForfeitConfirmationDialog = ({
  forfeitDialogOpen,
  setForfeitDialogOpen,
  handleForfeit,
}: Props) => {
  return (
    <Dialog open={forfeitDialogOpen} onOpenChange={setForfeitDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Forfeit</DialogTitle>
          <DialogDescription>
            Are you sure you want to forfeit this match?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Forfeiting will result in:
              <ul className="list-disc list-inside mt-2">
                <li>1000 coins penalty</li>
                <li>A loss added to your record</li>
                <li>Rating decrease</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setForfeitDialogOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleForfeit}>
            <DollarSign className="h-4 w-4 mr-2" />
            Forfeit and Pay 1000 Coins
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForfeitConfirmationDialog;
