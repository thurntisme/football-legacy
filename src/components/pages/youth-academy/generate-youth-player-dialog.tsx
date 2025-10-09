import React from 'react';

import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

type Props = {
  generatePlayerDialogOpen: boolean;
  setGeneratePlayerDialogOpen: (open: boolean) => void;
  handleGeneratePlayer: () => void;
};

const GenerateYouthPlayerDialog = ({
  generatePlayerDialogOpen,
  setGeneratePlayerDialogOpen,
  handleGeneratePlayer,
}: Props) => {
  const [generatedPlayerName, setGeneratedPlayerName] = React.useState('');
  const [generatedPlayerAge, setGeneratedPlayerAge] = React.useState([15]);
  const [generatedPlayerPosition, setGeneratedPlayerPosition] =
    React.useState('GK');
  const [generatedPlayerNationality, setGeneratedPlayerNationality] =
    React.useState('England');
  const [generatedPlayerPotential, setGeneratedPlayerPotential] =
    React.useState('random');
  return (
    <Dialog
      open={generatePlayerDialogOpen}
      onOpenChange={setGeneratePlayerDialogOpen}
    >
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Youth Player</DialogTitle>
          <DialogDescription>
            Create a new youth player for your academy. Higher potential players
            cost more to generate.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 ">
          <div className="space-y-2">
            <Label htmlFor="player-name">Player Name</Label>
            <Input
              id="player-name"
              placeholder="Enter player name"
              value={generatedPlayerName}
              onChange={(e) => setGeneratedPlayerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={15}
                max={19}
                step={1}
                value={generatedPlayerAge}
                onValueChange={setGeneratedPlayerAge}
              />
              <span className="font-medium w-8 text-center">
                {generatedPlayerAge[0]}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="player-position">Position</Label>
            <Select
              value={generatedPlayerPosition}
              onValueChange={setGeneratedPlayerPosition}
            >
              <SelectTrigger id="player-position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GK">Goalkeeper</SelectItem>
                <SelectItem value="CB">Center Back</SelectItem>
                <SelectItem value="LB">Left Back</SelectItem>
                <SelectItem value="RB">Right Back</SelectItem>
                <SelectItem value="CM">Center Midfielder</SelectItem>
                <SelectItem value="CDM">Defensive Midfielder</SelectItem>
                <SelectItem value="CAM">Attacking Midfielder</SelectItem>
                <SelectItem value="LW">Left Winger</SelectItem>
                <SelectItem value="RW">Right Winger</SelectItem>
                <SelectItem value="ST">Striker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="player-nationality">Nationality</Label>
            <Select
              value={generatedPlayerNationality}
              onValueChange={setGeneratedPlayerNationality}
            >
              <SelectTrigger id="player-nationality">
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="England">England</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Italy">Italy</SelectItem>
                <SelectItem value="Brazil">Brazil</SelectItem>
                <SelectItem value="Argentina">Argentina</SelectItem>
                <SelectItem value="Netherlands">Netherlands</SelectItem>
                <SelectItem value="Portugal">Portugal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Potential Level</Label>
            <RadioGroup
              value={generatedPlayerPotential}
              onValueChange={setGeneratedPlayerPotential}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="random" id="potential-random" />
                <Label htmlFor="potential-random">Random (£50,000)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="potential-high" />
                <Label htmlFor="potential-high">
                  High Potential (£150,000)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-high" id="potential-very-high" />
                <Label htmlFor="potential-very-high">
                  Very High Potential (£300,000)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Separator className="my-4" />
          <div className="bg-muted p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Cost:</span>
              <span className="font-bold text-lg">
                £
                {generatedPlayerPotential === 'random'
                  ? '50,000'
                  : generatedPlayerPotential === 'high'
                    ? '150,000'
                    : '300,000'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This amount will be deducted from your youth academy budget.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setGeneratePlayerDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGeneratePlayer}
            disabled={!generatedPlayerName}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Generate Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateYouthPlayerDialog;
