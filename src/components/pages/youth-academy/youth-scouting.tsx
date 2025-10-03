'use client';

import { useState } from 'react';

import {
  AlertTriangle,
  Loader2,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// Youth scouting mission type
type ScoutingMission = {
  id: number;
  region: string;
  country: string;
  focus:
    | 'general'
    | 'specific_position'
    | 'high_potential'
    | 'physical'
    | 'technical';
  positions: string[];
  ageRange: [number, number];
  duration: number; // in days
  cost: number;
  startDate: string;
  progress: number;
  status: 'active' | 'completed';
  results?: ScoutingResult[];
};

// Scouting result type
type ScoutingResult = {
  id: number;
  playerName: string;
  age: number;
  position: string;
  nationality: string;
  club: string;
  potential: number; // 1-100
  attributes: {
    technical: number;
    mental: number;
    physical: number;
  };
  signCost: number;
  signChance: 'high' | 'medium' | 'low';
  status: 'pending' | 'approached' | 'signed' | 'rejected';
};

export default function YouthScouting() {
  // Mock scouting missions
  const [scoutingMissions, setScoutingMissions] = useState<ScoutingMission[]>([
    {
      id: 1,
      region: 'Europe',
      country: 'England',
      focus: 'general',
      positions: [],
      ageRange: [15, 18],
      duration: 30,
      cost: 15000,
      startDate: '2025-02-01',
      progress: 100,
      status: 'completed',
      results: [
        {
          id: 1,
          playerName: 'Jack Thompson',
          age: 16,
          position: 'CM',
          nationality: 'England',
          club: 'Sunderland AFC Youth',
          potential: 78,
          attributes: {
            technical: 65,
            mental: 62,
            physical: 60,
          },
          signCost: 250000,
          signChance: 'high',
          status: 'pending',
        },
        {
          id: 2,
          playerName: 'Oliver Wilson',
          age: 17,
          position: 'RW',
          nationality: 'England',
          club: 'Leeds United Academy',
          potential: 82,
          attributes: {
            technical: 70,
            mental: 65,
            physical: 68,
          },
          signCost: 350000,
          signChance: 'medium',
          status: 'pending',
        },
        {
          id: 3,
          playerName: 'Harry Davis',
          age: 15,
          position: 'CB',
          nationality: 'England',
          club: 'Manchester City Academy',
          potential: 85,
          attributes: {
            technical: 62,
            mental: 68,
            physical: 72,
          },
          signCost: 500000,
          signChance: 'low',
          status: 'pending',
        },
      ],
    },
    {
      id: 2,
      region: 'South America',
      country: 'Brazil',
      focus: 'technical',
      positions: ['CAM', 'LW', 'RW'],
      ageRange: [16, 19],
      duration: 45,
      cost: 25000,
      startDate: '2025-02-10',
      progress: 65,
      status: 'active',
    },
    {
      id: 3,
      region: 'Europe',
      country: 'Spain',
      focus: 'specific_position',
      positions: ['GK'],
      ageRange: [15, 17],
      duration: 21,
      cost: 12000,
      startDate: '2025-02-20',
      progress: 30,
      status: 'active',
    },
  ]);

  const [activeTab, setActiveTab] = useState('active');
  const [showNewMissionDialog, setShowNewMissionDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [selectedMission, setSelectedMission] =
    useState<ScoutingMission | null>(null);
  const [selectedResult, setSelectedResult] = useState<ScoutingResult | null>(
    null
  );
  const [showApproachDialog, setShowApproachDialog] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);
  const [approachResult, setApproachResult] = useState<
    'success' | 'failure' | null
  >(null);

  // New mission form state
  const [newMission, setNewMission] = useState({
    region: 'Europe',
    country: '',
    focus: 'general',
    positions: [] as string[],
    ageRange: [15, 18] as [number, number],
    duration: 30,
  });

  // Available regions and countries
  const regions = [
    {
      id: 'Europe',
      countries: [
        'England',
        'Spain',
        'Germany',
        'France',
        'Italy',
        'Portugal',
        'Netherlands',
      ],
    },
    {
      id: 'South America',
      countries: ['Brazil', 'Argentina', 'Uruguay', 'Colombia', 'Chile'],
    },
    {
      id: 'Africa',
      countries: [
        'Nigeria',
        'Ghana',
        'Senegal',
        'Ivory Coast',
        'Cameroon',
        'South Africa',
      ],
    },
    { id: 'North America', countries: ['USA', 'Mexico', 'Canada'] },
    { id: 'Asia', countries: ['Japan', 'South Korea', 'China', 'Australia'] },
  ];

  // Available positions
  const positions = [
    'GK',
    'CB',
    'LB',
    'RB',
    'CDM',
    'CM',
    'CAM',
    'LW',
    'RW',
    'ST',
  ];

  // Filter missions based on active tab
  const filteredMissions = scoutingMissions.filter((mission) => {
    if (activeTab === 'active') {
      return mission.status === 'active';
    } else if (activeTab === 'completed') {
      return mission.status === 'completed';
    }
    return true;
  });

  // Handle creating a new scouting mission
  const handleCreateMission = () => {
    // Validate form
    if (!newMission.region || !newMission.country || !newMission.focus) {
      toast({
        title: 'Missing Information',
        description:
          'Please fill in all required fields to create a scouting mission.',
        variant: 'destructive',
      });
      return;
    }

    // Calculate cost based on duration, region, and focus
    let baseCost = 10000;
    if (newMission.region === 'South America') baseCost = 15000;
    if (newMission.region === 'Africa') baseCost = 12000;
    if (newMission.focus === 'high_potential') baseCost *= 1.5;
    if (newMission.focus === 'specific_position') baseCost *= 1.2;

    const cost = Math.round(baseCost * (newMission.duration / 30));

    // Create new mission
    const newMissionObj: ScoutingMission = {
      id: Math.max(...scoutingMissions.map((m) => m.id)) + 1,
      region: newMission.region,
      country: newMission.country,
      focus: newMission.focus as any,
      positions: newMission.positions,
      ageRange: newMission.ageRange,
      duration: newMission.duration,
      cost: cost,
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'active',
    };

    setScoutingMissions([...scoutingMissions, newMissionObj]);
    setShowNewMissionDialog(false);

    // Reset form
    setNewMission({
      region: 'Europe',
      country: '',
      focus: 'general',
      positions: [],
      ageRange: [15, 18] as [number, number],
      duration: 30,
    });

    toast({
      title: 'Scouting Mission Created',
      description: `Your scouts have been sent to ${newMission.country} to find young talent.`,
    });
  };

  // Handle viewing mission results
  const handleViewResults = (mission: ScoutingMission) => {
    setSelectedMission(mission);
    setShowResultsDialog(true);
  };

  // Handle approaching a player
  const handleApproachPlayer = (result: ScoutingResult) => {
    setSelectedResult(result);
    setApproachResult(null);
    setShowApproachDialog(true);
  };

  // Attempt to approach and sign a player
  const attemptApproach = () => {
    if (!selectedResult || !selectedMission) return;

    setIsApproaching(true);

    // Simulate loading time
    setTimeout(() => {
      // Determine success based on sign chance
      let successChance = 0.3; // Low
      if (selectedResult.signChance === 'medium') successChance = 0.5;
      if (selectedResult.signChance === 'high') successChance = 0.8;

      const success = Math.random() < successChance;
      setApproachResult(success ? 'success' : 'failure');

      if (success) {
        // Update the result status
        const updatedMissions = scoutingMissions.map((mission) => {
          if (mission.id === selectedMission.id && mission.results) {
            const updatedResults = mission.results.map((result) =>
              result.id === selectedResult.id
                ? { ...result, status: 'approached' }
                : result
            );
            return { ...mission, results: updatedResults };
          }
          return mission;
        });

        // setScoutingMissions(updatedMissions);

        toast({
          title: 'Approach Successful',
          description: `${selectedResult.playerName} and ${selectedResult.club} have agreed to negotiate.`,
        });
      } else {
        toast({
          title: 'Approach Failed',
          description: `${selectedResult.club} has rejected your approach for ${selectedResult.playerName}.`,
          variant: 'destructive',
        });
      }

      setIsApproaching(false);
    }, 2000);
  };

  // Complete the signing of a player
  const completeSigningPlayer = () => {
    if (!selectedResult || !selectedMission) return;

    // Update the result status
    const updatedMissions = scoutingMissions.map((mission) => {
      if (mission.id === selectedMission.id && mission.results) {
        const updatedResults = mission.results.map((result) =>
          result.id === selectedResult.id
            ? { ...result, status: 'signed' }
            : result
        );
        return { ...mission, results: updatedResults };
      }
      return mission;
    });

    // setScoutingMissions(updatedMissions);
    setShowApproachDialog(false);

    toast({
      title: 'Player Signed',
      description: `${selectedResult.playerName} has joined your youth academy!`,
    });
  };

  // Get focus badge
  const getFocusBadge = (focus: string) => {
    switch (focus) {
      case 'general':
        return <Badge className="bg-blue-500">General</Badge>;
      case 'specific_position':
        return <Badge className="bg-purple-500">Position Specific</Badge>;
      case 'high_potential':
        return <Badge className="bg-amber-500">High Potential</Badge>;
      case 'physical':
        return <Badge className="bg-green-500">Physical</Badge>;
      case 'technical':
        return <Badge className="bg-red-500">Technical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get sign chance badge
  const getSignChanceBadge = (chance: string) => {
    switch (chance) {
      case 'high':
        return <Badge className="bg-green-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-red-500">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'approached':
        return <Badge className="bg-blue-500">Approached</Badge>;
      case 'signed':
        return <Badge className="bg-green-500">Signed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get days remaining
  const getDaysRemaining = (
    startDate: string,
    duration: number,
    progress: number
  ) => {
    if (progress >= 100) return 'Completed';

    const start = new Date(startDate);
    const daysElapsed = Math.floor(
      (new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysRemaining = duration - daysElapsed;

    return daysRemaining > 0
      ? `${daysRemaining} days remaining`
      : 'Completing soon';
  };

  // Toggle position selection
  const togglePosition = (position: string) => {
    if (newMission.positions.includes(position)) {
      setNewMission({
        ...newMission,
        positions: newMission.positions.filter((p) => p !== position),
      });
    } else {
      setNewMission({
        ...newMission,
        positions: [...newMission.positions, position],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="active">
              Active Missions (
              {scoutingMissions.filter((m) => m.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed Missions (
              {scoutingMissions.filter((m) => m.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All Missions ({scoutingMissions.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Dialog
          open={showNewMissionDialog}
          onOpenChange={setShowNewMissionDialog}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Scouting Mission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Scouting Mission</DialogTitle>
              <DialogDescription>
                Send your scouts to find young talent around the world
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">
                  Region
                </Label>
                <Select
                  value={newMission.region}
                  onValueChange={(value) =>
                    setNewMission({ ...newMission, region: value, country: '' })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Select
                  value={newMission.country}
                  onValueChange={(value) =>
                    setNewMission({ ...newMission, country: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions
                      .find((r) => r.id === newMission.region)
                      ?.countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="focus" className="text-right">
                  Focus
                </Label>
                <Select
                  value={newMission.focus}
                  onValueChange={(value) =>
                    setNewMission({ ...newMission, focus: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Scouting</SelectItem>
                    <SelectItem value="specific_position">
                      Specific Positions
                    </SelectItem>
                    <SelectItem value="high_potential">
                      High Potential
                    </SelectItem>
                    <SelectItem value="physical">
                      Physical Attributes
                    </SelectItem>
                    <SelectItem value="technical">
                      Technical Attributes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMission.focus === 'specific_position' && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Positions</Label>
                  <div className="col-span-3 grid grid-cols-3 gap-2">
                    {positions.map((position) => (
                      <div
                        key={position}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`position-${position}`}
                          checked={newMission.positions.includes(position)}
                          onCheckedChange={() => togglePosition(position)}
                        />
                        <label
                          htmlFor={`position-${position}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {position}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Age Range</Label>
                <div className="col-span-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">
                      {newMission.ageRange[0]} years
                    </span>
                    <span className="text-sm">
                      {newMission.ageRange[1]} years
                    </span>
                  </div>
                  <Slider
                    value={[newMission.ageRange[0], newMission.ageRange[1]]}
                    min={15}
                    max={21}
                    step={1}
                    onValueChange={(value) =>
                      setNewMission({
                        ...newMission,
                        ageRange: [value[0], value[1]] as [number, number],
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Select
                  value={newMission.duration.toString()}
                  onValueChange={(value) =>
                    setNewMission({
                      ...newMission,
                      duration: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">2 Weeks</SelectItem>
                    <SelectItem value="21">3 Weeks</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="45">6 Weeks</SelectItem>
                    <SelectItem value="60">2 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">
                      Estimated Cost
                    </h4>
                    <p className="text-sm text-amber-700">
                      This scouting mission will cost approximately £
                      {(() => {
                        let baseCost = 10000;
                        if (newMission.region === 'South America')
                          baseCost = 15000;
                        if (newMission.region === 'Africa') baseCost = 12000;
                        if (newMission.focus === 'high_potential')
                          baseCost *= 1.5;
                        if (newMission.focus === 'specific_position')
                          baseCost *= 1.2;

                        return Math.round(
                          baseCost * (newMission.duration / 30)
                        ).toLocaleString();
                      })()}
                      . This will be deducted from your youth scouting budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateMission}>Create Mission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.length > 0 ? (
          filteredMissions.map((mission) => (
            <Card
              key={mission.id}
              className={
                mission.status === 'completed'
                  ? 'border-green-500/50'
                  : 'border-blue-500/50'
              }
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {mission.country}, {mission.region}
                  </CardTitle>
                  <div>{getFocusBadge(mission.focus)}</div>
                </div>
                <CardDescription>
                  {mission.focus === 'specific_position'
                    ? `Scouting for ${mission.positions.join(', ')} positions`
                    : `${mission.focus.replace('_', ' ').charAt(0).toUpperCase() + mission.focus.replace('_', ' ').slice(1)} scouting`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Age Range
                      </div>
                      <div className="font-medium">
                        {mission.ageRange[0]}-{mission.ageRange[1]} years
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Duration
                      </div>
                      <div className="font-medium">{mission.duration} days</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Start Date
                      </div>
                      <div className="font-medium">
                        {new Date(mission.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Cost
                      </div>
                      <div className="font-medium">
                        £{mission.cost.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span>{mission.progress}%</span>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                    <div className="flex justify-end text-xs text-muted-foreground">
                      {getDaysRemaining(
                        mission.startDate,
                        mission.duration,
                        mission.progress
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {mission.status === 'completed' ? (
                  <Button
                    className="w-full"
                    onClick={() => handleViewResults(mission)}
                  >
                    View Results ({mission.results?.length || 0} players)
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Scouting in Progress...
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 border rounded-md bg-muted/20">
            <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No Scouting Missions</h3>
            <p className="text-muted-foreground mb-4">
              {activeTab === 'active'
                ? "You don't have any active scouting missions. Create a new mission to start scouting for youth talent."
                : activeTab === 'completed'
                  ? "You don't have any completed scouting missions yet."
                  : "You haven't created any scouting missions yet."}
            </p>
            <Button onClick={() => setShowNewMissionDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Scouting Mission
            </Button>
          </div>
        )}
      </div>

      {/* Scouting Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMission && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Scouting Results: {selectedMission.country}
                </DialogTitle>
                <DialogDescription>
                  Players discovered during your scouting mission in{' '}
                  {selectedMission.country}, {selectedMission.region}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="grid grid-cols-1 gap-4">
                  {selectedMission.results &&
                  selectedMission.results.length > 0 ? (
                    selectedMission.results.map((result) => (
                      <Card key={result.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">
                              {result.playerName}
                            </CardTitle>
                            <div className="flex gap-2">
                              {getStatusBadge(result.status)}
                              {getSignChanceBadge(result.signChance)}
                            </div>
                          </div>
                          <CardDescription>
                            {result.age} years • {result.position} •{' '}
                            {result.nationality} • {result.club}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Potential
                              </div>
                              <div className="flex">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.round(result.potential / 20) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Sign Cost
                              </div>
                              <div className="font-medium">
                                £{result.signCost.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Technical</span>
                                <span>{result.attributes.technical}</span>
                              </div>
                              <Progress
                                value={result.attributes.technical}
                                className="h-1"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Mental</span>
                                <span>{result.attributes.mental}</span>
                              </div>
                              <Progress
                                value={result.attributes.mental}
                                className="h-1"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Physical</span>
                                <span>{result.attributes.physical}</span>
                              </div>
                              <Progress
                                value={result.attributes.physical}
                                className="h-1"
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          {result.status === 'pending' ? (
                            <Button
                              className="w-full"
                              onClick={() => handleApproachPlayer(result)}
                            >
                              Approach Player
                            </Button>
                          ) : result.status === 'approached' ? (
                            <Button
                              className="w-full"
                              onClick={() => handleApproachPlayer(result)}
                            >
                              Complete Signing
                            </Button>
                          ) : result.status === 'signed' ? (
                            <Button
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Player Signed
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Approach Rejected
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 border rounded-md bg-muted/20">
                      <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium mb-1">
                        No Players Found
                      </h3>
                      <p className="text-muted-foreground">
                        Your scouts didn't find any suitable players during this
                        mission.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approach Player Dialog */}
      <Dialog open={showApproachDialog} onOpenChange={setShowApproachDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedResult?.status === 'approached'
                ? 'Complete Signing'
                : 'Approach Player'}
            </DialogTitle>
            <DialogDescription>
              {selectedResult?.status === 'approached'
                ? `Complete the signing of ${selectedResult?.playerName} from ${selectedResult?.club}`
                : `Approach ${selectedResult?.playerName} from ${selectedResult?.club}`}
            </DialogDescription>
          </DialogHeader>

          {selectedResult && (
            <div className="py-4">
              {selectedResult.status === 'approached' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                    <Sparkles className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <h3 className="font-bold text-lg text-green-800">
                      Approach Successful
                    </h3>
                    <p className="text-green-700">
                      {selectedResult.club} has accepted your approach for{' '}
                      {selectedResult.playerName}. You can now complete the
                      signing.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Player:
                      </span>
                      <span className="font-medium">
                        {selectedResult.playerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Position:
                      </span>
                      <span className="font-medium">
                        {selectedResult.position}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Age:
                      </span>
                      <span className="font-medium">
                        {selectedResult.age} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Club:
                      </span>
                      <span className="font-medium">{selectedResult.club}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Signing Cost:
                      </span>
                      <span className="font-medium">
                        £{selectedResult.signCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Contract Details</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Youth contract for 3 years</li>
                      <li>• Training compensation to {selectedResult.club}</li>
                      <li>• Player will join your youth academy immediately</li>
                      <li>• No agent fees required for youth signings</li>
                    </ul>
                  </div>
                </div>
              ) : approachResult === 'success' ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                  <Sparkles className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-bold text-lg text-green-800">
                    Approach Successful!
                  </h3>
                  <p className="text-green-700">
                    {selectedResult.club} has accepted your approach for{' '}
                    {selectedResult.playerName}. You can now complete the
                    signing.
                  </p>
                </div>
              ) : approachResult === 'failure' ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <h3 className="font-bold text-lg text-red-800">
                    Approach Rejected
                  </h3>
                  <p className="text-red-700">
                    {selectedResult.club} has rejected your approach for{' '}
                    {selectedResult.playerName}. They are not interested in
                    selling the player at this time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Player Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Player:
                        </span>
                        <span className="font-medium">
                          {selectedResult.playerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Position:
                        </span>
                        <span className="font-medium">
                          {selectedResult.position}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Age:
                        </span>
                        <span className="font-medium">
                          {selectedResult.age} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Club:
                        </span>
                        <span className="font-medium">
                          {selectedResult.club}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Potential:
                        </span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(selectedResult.potential / 20) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Sign Cost:
                        </span>
                        <span className="font-medium">
                          £{selectedResult.signCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Sign Chance:
                        </span>
                        <span>
                          {getSignChanceBadge(selectedResult.signChance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">
                          Approach Information
                        </h4>
                        <p className="text-sm text-amber-700">
                          Approaching a player will cost £
                          {Math.round(
                            selectedResult.signCost * 0.1
                          ).toLocaleString()}{' '}
                          in agent fees. The success chance is based on the
                          player's club willingness to sell and your club's
                          reputation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedResult?.status === 'approached' ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowApproachDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={completeSigningPlayer}>
                  Complete Signing (£{selectedResult.signCost.toLocaleString()})
                </Button>
              </>
            ) : approachResult !== null ? (
              <Button onClick={() => setShowApproachDialog(false)}>
                Close
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowApproachDialog(false)}
                >
                  Cancel
                </Button>
                {isApproaching ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Approaching...
                  </Button>
                ) : (
                  <Button onClick={attemptApproach}>Approach Player</Button>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scouting Budget</CardTitle>
            <CardDescription>
              Monthly allocation for youth scouting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label>Monthly Budget</Label>
                  <span className="text-sm font-medium">£25,000</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label>Used This Month</Label>
                  <span className="text-sm font-medium">
                    £
                    {scoutingMissions
                      .filter((m) => {
                        const missionDate = new Date(m.startDate);
                        const now = new Date();
                        return (
                          missionDate.getMonth() === now.getMonth() &&
                          missionDate.getFullYear() === now.getFullYear()
                        );
                      })
                      .reduce((sum, m) => sum + m.cost, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={
                    (scoutingMissions
                      .filter((m) => {
                        const missionDate = new Date(m.startDate);
                        const now = new Date();
                        return (
                          missionDate.getMonth() === now.getMonth() &&
                          missionDate.getFullYear() === now.getFullYear()
                        );
                      })
                      .reduce((sum, m) => sum + m.cost, 0) /
                      25000) *
                    100
                  }
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label>Remaining Budget</Label>
                  <span className="text-sm font-medium">
                    £
                    {(
                      25000 -
                      scoutingMissions
                        .filter((m) => {
                          const missionDate = new Date(m.startDate);
                          const now = new Date();
                          return (
                            missionDate.getMonth() === now.getMonth() &&
                            missionDate.getFullYear() === now.getFullYear()
                          );
                        })
                        .reduce((sum, m) => sum + m.cost, 0)
                    ).toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={
                    (1 -
                      scoutingMissions
                        .filter((m) => {
                          const missionDate = new Date(m.startDate);
                          const now = new Date();
                          return (
                            missionDate.getMonth() === now.getMonth() &&
                            missionDate.getFullYear() === now.getFullYear()
                          );
                        })
                        .reduce((sum, m) => sum + m.cost, 0) /
                        25000) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scouting Network</CardTitle>
            <CardDescription>Global scouting coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-blue-500 mr-2">Europe</Badge>
                  <span>European Coverage</span>
                </div>
                <span className="font-medium">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-green-500 mr-2">S. America</Badge>
                  <span>South American Coverage</span>
                </div>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-amber-500 mr-2">Africa</Badge>
                  <span>African Coverage</span>
                </div>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-red-500 mr-2">Asia</Badge>
                  <span>Asian Coverage</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-purple-500 mr-2">N. America</Badge>
                  <span>North American Coverage</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scouting Statistics</CardTitle>
            <CardDescription>Results from scouting missions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Missions</span>
                <span className="font-medium">{scoutingMissions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed Missions</span>
                <span className="font-medium">
                  {
                    scoutingMissions.filter((m) => m.status === 'completed')
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Players Discovered</span>
                <span className="font-medium">
                  {scoutingMissions.reduce(
                    (sum, m) => sum + (m.results?.length || 0),
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Players Approached</span>
                <span className="font-medium">
                  {scoutingMissions.reduce(
                    (sum, m) =>
                      sum +
                      (m.results?.filter(
                        (r) =>
                          r.status === 'approached' || r.status === 'signed'
                      ).length || 0),
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Players Signed</span>
                <span className="font-medium">
                  {scoutingMissions.reduce(
                    (sum, m) =>
                      sum +
                      (m.results?.filter((r) => r.status === 'signed').length ||
                        0),
                    0
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
