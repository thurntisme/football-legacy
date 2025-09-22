'use client';

import { useState } from 'react';

import {
  Briefcase,
  DollarSign,
  Flag,
  Globe,
  MapPin,
  Plus,
  Search,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

type Scout = {
  id: number;
  name: string;
  nationality: string;
  age: number;
  experience: number; // 1-5
  specialization: 'youth' | 'senior' | 'technical' | 'physical' | 'mental';
  regions: string[];
  status: 'available' | 'assigned';
  assignment?: {
    region: string;
    focus: string;
    duration: string;
    progress: number;
  };
};

type Region = {
  id: string;
  name: string;
  countries: string[];
  knowledgeLevel: number; // 0-100
  talentLevel: number; // 1-5
  scoutingCost: number;
};

interface ScoutingNetworkProps {
  onRegionSelect: (region: string | null) => void;
}

export default function ScoutingNetwork({
  onRegionSelect,
}: ScoutingNetworkProps) {
  const [scouts, setScouts] = useState<Scout[]>([
    {
      id: 1,
      name: 'James Wilson',
      nationality: 'England',
      age: 42,
      experience: 4,
      specialization: 'senior',
      regions: ['Europe'],
      status: 'available',
    },
    {
      id: 2,
      name: 'Carlos Mendez',
      nationality: 'Spain',
      age: 38,
      experience: 3,
      specialization: 'youth',
      regions: ['Europe', 'South America'],
      status: 'assigned',
      assignment: {
        region: 'South America',
        focus: 'Young Talents (16-19)',
        duration: '3 months',
        progress: 65,
      },
    },
    {
      id: 3,
      name: 'Hiroshi Tanaka',
      nationality: 'Japan',
      age: 45,
      experience: 5,
      specialization: 'technical',
      regions: ['Asia', 'Europe'],
      status: 'available',
    },
    {
      id: 4,
      name: 'Samuel Osei',
      nationality: 'Ghana',
      age: 36,
      experience: 2,
      specialization: 'physical',
      regions: ['Africa'],
      status: 'assigned',
      assignment: {
        region: 'Africa',
        focus: 'Physical Attributes',
        duration: '2 months',
        progress: 30,
      },
    },
    {
      id: 5,
      name: 'David Thompson',
      nationality: 'England',
      age: 51,
      experience: 5,
      specialization: 'mental',
      regions: ['Europe', 'North America'],
      status: 'available',
    },
  ]);

  const [regions, setRegions] = useState<Region[]>([
    {
      id: 'europe',
      name: 'Europe',
      countries: [
        'England',
        'Spain',
        'Germany',
        'France',
        'Italy',
        'Portugal',
        'Netherlands',
        'Belgium',
      ],
      knowledgeLevel: 75,
      talentLevel: 4,
      scoutingCost: 10000,
    },
    {
      id: 'south_america',
      name: 'South America',
      countries: ['Brazil', 'Argentina', 'Uruguay', 'Colombia', 'Chile'],
      knowledgeLevel: 45,
      talentLevel: 5,
      scoutingCost: 15000,
    },
    {
      id: 'africa',
      name: 'Africa',
      countries: [
        'Nigeria',
        'Senegal',
        'Ghana',
        'Ivory Coast',
        'Cameroon',
        'Morocco',
        'Egypt',
      ],
      knowledgeLevel: 30,
      talentLevel: 4,
      scoutingCost: 12000,
    },
    {
      id: 'asia',
      name: 'Asia',
      countries: ['Japan', 'South Korea', 'Australia', 'Iran', 'Saudi Arabia'],
      knowledgeLevel: 20,
      talentLevel: 3,
      scoutingCost: 8000,
    },
  ]);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showHireScoutDialog, setShowHireScoutDialog] = useState(false);
  const [newScoutName, setNewScoutName] = useState('');
  const [newScoutNationality, setNewScoutNationality] = useState('');
  const [newScoutSpecialization, setNewScoutSpecialization] =
    useState('senior');
  const [newScoutRegion, setNewScoutRegion] = useState('');

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    onRegionSelect(region.id);
  };

  const handleHireScout = () => {
    if (
      !newScoutName ||
      !newScoutNationality ||
      !newScoutSpecialization ||
      !newScoutRegion
    ) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields to hire a scout.',
        variant: 'destructive',
      });
      return;
    }

    const newScout: Scout = {
      id: scouts.length + 1,
      name: newScoutName,
      nationality: newScoutNationality,
      age: 35 + Math.floor(Math.random() * 20),
      experience: 1 + Math.floor(Math.random() * 5),
      specialization: newScoutSpecialization as any,
      regions: [newScoutRegion],
      status: 'available',
    };

    setScouts([...scouts, newScout]);
    setShowHireScoutDialog(false);
    setNewScoutName('');
    setNewScoutNationality('');
    setNewScoutSpecialization('senior');
    setNewScoutRegion('');

    toast({
      title: 'Scout Hired',
      description: `${newScoutName} has joined your scouting team.`,
    });
  };

  const getExperienceStars = (experience: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < experience ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
        />
      ));
  };

  const getSpecializationLabel = (specialization: string) => {
    switch (specialization) {
      case 'youth':
        return <Badge className="bg-green-500">Youth</Badge>;
      case 'senior':
        return <Badge className="bg-blue-500">Senior</Badge>;
      case 'technical':
        return <Badge className="bg-purple-500">Technical</Badge>;
      case 'physical':
        return <Badge className="bg-orange-500">Physical</Badge>;
      case 'mental':
        return <Badge className="bg-cyan-500">Mental</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getKnowledgeBadge = (level: number) => {
    if (level >= 80) return <Badge className="bg-green-500">Excellent</Badge>;
    if (level >= 60) return <Badge className="bg-blue-500">Good</Badge>;
    if (level >= 40) return <Badge className="bg-amber-500">Average</Badge>;
    if (level >= 20) return <Badge className="bg-orange-500">Limited</Badge>;
    return <Badge className="bg-red-500">Poor</Badge>;
  };

  const getTalentBadge = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < level ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
        />
      ));
  };

  return (
    <Tabs defaultValue="scouts">
      <TabsList className="mb-4">
        <TabsTrigger value="scouts">Scouts</TabsTrigger>
        <TabsTrigger value="regions">Regions</TabsTrigger>
      </TabsList>

      <TabsContent value="scouts">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Scouting Team</h2>
          <Dialog
            open={showHireScoutDialog}
            onOpenChange={setShowHireScoutDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Hire New Scout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hire New Scout</DialogTitle>
                <DialogDescription>
                  Add a new scout to your scouting network
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newScoutName}
                    onChange={(e) => setNewScoutName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nationality" className="text-right">
                    Nationality
                  </Label>
                  <Input
                    id="nationality"
                    value={newScoutNationality}
                    onChange={(e) => setNewScoutNationality(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">
                    Specialization
                  </Label>
                  <Select
                    value={newScoutSpecialization}
                    onValueChange={setNewScoutSpecialization}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youth">Youth Recruitment</SelectItem>
                      <SelectItem value="senior">Senior Recruitment</SelectItem>
                      <SelectItem value="technical">
                        Technical Attributes
                      </SelectItem>
                      <SelectItem value="physical">
                        Physical Attributes
                      </SelectItem>
                      <SelectItem value="mental">Mental Attributes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">
                    Region
                  </Label>
                  <Select
                    value={newScoutRegion}
                    onValueChange={setNewScoutRegion}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleHireScout}>Hire Scout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scouts.map((scout) => (
            <Card
              key={scout.id}
              className={scout.status === 'assigned' ? 'border-primary' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{scout.name}</CardTitle>
                    <CardDescription>
                      {scout.nationality}, {scout.age} years old
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    {scout.status === 'assigned' ? (
                      <Badge className="bg-primary">Assigned</Badge>
                    ) : (
                      <Badge variant="outline">Available</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Experience:</span>
                    </div>
                    <div className="flex">
                      {getExperienceStars(scout.experience)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Specialization:</span>
                    </div>
                    <div>{getSpecializationLabel(scout.specialization)}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Regions:</span>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1">
                      {scout.regions.map((region) => (
                        <Badge key={region} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {scout.status === 'assigned' && scout.assignment && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm font-medium mb-2">
                        Current Assignment:
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Region:</span>
                          <span>{scout.assignment.region}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Focus:</span>
                          <span>{scout.assignment.focus}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span>{scout.assignment.duration}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress:
                            </span>
                            <span>{scout.assignment.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${scout.assignment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {scout.status === 'available' ? (
                  <Button className="w-full">Assign Scout</Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    View Assignment
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="regions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.map((region) => (
            <Card
              key={region.id}
              className={
                selectedRegion?.id === region.id ? 'border-primary' : ''
              }
              onClick={() => handleRegionSelect(region)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{region.name}</CardTitle>
                  <div>{getKnowledgeBadge(region.knowledgeLevel)}</div>
                </div>
                <CardDescription>
                  {region.countries.slice(0, 3).join(', ')}
                  {region.countries.length > 3 &&
                    ` +${region.countries.length - 3} more`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Knowledge Level:</span>
                    </div>
                    <div className="text-sm font-medium">
                      {region.knowledgeLevel}%
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Talent Level:</span>
                    </div>
                    <div className="flex">
                      {getTalentBadge(region.talentLevel)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Countries:</span>
                    </div>
                    <div className="text-sm font-medium">
                      {region.countries.length}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Scouting Cost:</span>
                    </div>
                    <div className="text-sm font-medium">
                      £{region.scoutingCost.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={
                    selectedRegion?.id === region.id ? 'default' : 'outline'
                  }
                  className="w-full"
                  onClick={() => handleRegionSelect(region)}
                >
                  {selectedRegion?.id === region.id
                    ? 'Selected'
                    : 'Select Region'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
