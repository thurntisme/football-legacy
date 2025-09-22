'use client';

import { useState } from 'react';

import {
  Brain,
  Briefcase,
  Clipboard,
  Dumbbell,
  FileText,
  Flag,
  Footprints,
  Heart,
  Info,
  Lightbulb,
  Megaphone,
  Search,
  Shield,
  Star,
  Swords,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { availableStaffList, staffList } from '@/mock/football';

// Types for staff members
type StaffMember = {
  id: number;
  name: string;
  role: string;
  specialty?: string;
  nationality: string;
  age: number;
  experience: number; // 1-20
  reputation:
    | 'world class'
    | 'elite'
    | 'established'
    | 'developing'
    | 'amateur';
  salary: number;
  contractYears?: number;
  attributes: {
    tactical: number; // 1-20
    technical: number; // 1-20
    mental: number; // 1-20
    physical: number; // 1-20
    youth: number; // 1-20
    scouting: number; // 1-20
    medical: number; // 1-20
    negotiation: number; // 1-20
  };
  benefits: string[];
  hired?: boolean;
};

// Types for staff categories
type StaffType = 'coaching' | 'medical' | 'scouting' | 'hire';

interface StaffManagementProps {
  staffType: StaffType;
}

export default function StaffManagement({ staffType }: StaffManagementProps) {
  // Current staff members
  const [currentStaff, setCurrentStaff] = useState<StaffMember[]>(
    staffList as StaffMember[]
  );

  // Available staff to hire
  const [availableStaff, setAvailableStaff] = useState<StaffMember[]>(
    availableStaffList as StaffMember[]
  );

  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);
  const [fireDialogOpen, setFireDialogOpen] = useState(false);
  const [hireCategory, setHireCategory] = useState<string>('all');

  // Filter staff based on type
  const getFilteredCurrentStaff = () => {
    if (staffType === 'coaching') {
      return currentStaff.filter((staff) =>
        [
          'Assistant Manager',
          'Tactical Manager',
          'Fitness Coach',
          'Technical Coach',
          'Goalkeeping Coach',
          'Set-Piece Coach',
          'Mental Coach',
          'Youth Development Manager',
        ].includes(staff.role)
      );
    } else if (staffType === 'medical') {
      return currentStaff.filter((staff) =>
        [
          'Head Physio',
          'Sports Scientist',
          'Nutritionist',
          'Head of Medical',
          'Performance Director',
        ].includes(staff.role)
      );
    } else if (staffType === 'scouting') {
      return currentStaff.filter((staff) =>
        [
          'Chief Scout',
          'Youth Scout',
          'Data Analyst',
          'Director of Scouting',
          'Technical Director',
          'Data Analysis Director',
        ].includes(staff.role)
      );
    }
    return currentStaff;
  };

  // Filter available staff based on category
  const getFilteredAvailableStaff = () => {
    if (hireCategory === 'all') {
      return availableStaff;
    } else {
      return availableStaff.filter((staff) => {
        if (hireCategory === 'tactical') {
          return ['Tactical Manager', 'Assistant Manager'].includes(staff.role);
        } else if (hireCategory === 'technical') {
          return [
            'Technical Coach',
            'Technical Manager',
            'Set-Piece Coach',
            'Attacking Coach',
          ].includes(staff.role);
        } else if (hireCategory === 'fitness') {
          return [
            'Fitness Manager',
            'Fitness Coach',
            'Performance Director',
          ].includes(staff.role);
        } else if (hireCategory === 'youth') {
          return ['Youth Development Manager', 'Youth Scout'].includes(
            staff.role
          );
        } else if (hireCategory === 'medical') {
          return [
            'Head of Medical',
            'Head Physio',
            'Sports Scientist',
            'Nutritionist',
          ].includes(staff.role);
        } else if (hireCategory === 'scouting') {
          return [
            'Director of Scouting',
            'Chief Scout',
            'Data Analysis Director',
          ].includes(staff.role);
        }
        return true;
      });
    }
  };

  // Handle hiring staff
  const handleHireStaff = (staff: StaffMember) => {
    // Add to current staff
    const updatedStaff = { ...staff, hired: true, contractYears: 2 };
    setCurrentStaff([...currentStaff, updatedStaff]);

    // Remove from available staff
    setAvailableStaff(availableStaff.filter((s) => s.id !== staff.id));

    // Close dialog
    setHireDialogOpen(false);
    setSelectedStaff(null);

    toast({
      title: 'Staff Hired',
      description: `${staff.name} has joined your staff team.`,
    });
  };

  const handleCloseHireDialog = () => {
    console.log('handleCloseHirePopup');
    setHireDialogOpen(false);
    setSelectedStaff(null);
  };

  // Handle firing staff
  const handleFireStaff = (staff: StaffMember) => {
    // Remove from current staff
    setCurrentStaff(currentStaff.filter((s) => s.id !== staff.id));

    // Close dialog
    setFireDialogOpen(false);
    setSelectedStaff(null);

    toast({
      title: 'Staff Fired',
      description: `${staff.name} has been removed from your staff team.`,
    });
  };

  // Get reputation badge color
  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case 'world class':
        return 'bg-red-500';
      case 'elite':
        return 'bg-purple-500';
      case 'established':
        return 'bg-blue-500';
      case 'developing':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get attribute color
  const getAttributeColor = (value: number) => {
    if (value >= 18) return 'text-green-600 font-bold';
    if (value >= 15) return 'text-green-500';
    if (value >= 12) return 'text-blue-500';
    if (value >= 9) return 'text-amber-500';
    return 'text-red-500';
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Assistant Manager':
      case 'Tactical Manager':
        return <Clipboard className="h-5 w-5 text-blue-500" />;
      case 'Fitness Coach':
      case 'Fitness Manager':
        return <Dumbbell className="h-5 w-5 text-green-500" />;
      case 'Technical Coach':
      case 'Technical Manager':
        return <Footprints className="h-5 w-5 text-purple-500" />;
      case 'Goalkeeping Coach':
        return <Shield className="h-5 w-5 text-amber-500" />;
      case 'Head Physio':
      case 'Head of Medical':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'Sports Scientist':
      case 'Performance Director':
        return <TrendingUp className="h-5 w-5 text-cyan-500" />;
      case 'Chief Scout':
      case 'Director of Scouting':
        return <Search className="h-5 w-5 text-indigo-500" />;
      case 'Youth Scout':
      case 'Youth Development Manager':
        return <Users className="h-5 w-5 text-emerald-500" />;
      case 'Data Analyst':
      case 'Data Analysis Director':
        return <FileText className="h-5 w-5 text-violet-500" />;
      case 'Mental Coach':
        return <Brain className="h-5 w-5 text-pink-500" />;
      case 'Set-Piece Coach':
        return <Flag className="h-5 w-5 text-orange-500" />;
      case 'Nutritionist':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'Attacking Coach':
        return <Swords className="h-5 w-5 text-red-500" />;
      case 'Defensive Coach':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'Technical Director':
        return <Briefcase className="h-5 w-5 text-gray-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  // Render staff details
  const renderStaffDetails = (staff: StaffMember) => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-4">
            <div className="flex items-center gap-3">
              {getRoleIcon(staff.role)}
              <div>
                <h3 className="font-bold text-lg">{staff.name}</h3>
                <p className="text-muted-foreground">{staff.role}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nationality:</span>
                <span>{staff.nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{staff.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span>{staff.experience} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reputation:</span>
                <Badge className={getReputationColor(staff.reputation)}>
                  {staff.reputation.charAt(0).toUpperCase() +
                    staff.reputation.slice(1)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salary:</span>
                <span>£{staff.salary.toLocaleString()}/week</span>
              </div>
              {staff.contractYears && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract:</span>
                  <span>{staff.contractYears} years</span>
                </div>
              )}
              {staff.specialty && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialty:</span>
                  <span>{staff.specialty}</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Attributes</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex justify-between">
                  <span>Tactical:</span>
                  <span
                    className={getAttributeColor(staff.attributes.tactical)}
                  >
                    {staff.attributes.tactical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Technical:</span>
                  <span
                    className={getAttributeColor(staff.attributes.technical)}
                  >
                    {staff.attributes.technical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mental:</span>
                  <span className={getAttributeColor(staff.attributes.mental)}>
                    {staff.attributes.mental}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Physical:</span>
                  <span
                    className={getAttributeColor(staff.attributes.physical)}
                  >
                    {staff.attributes.physical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Youth:</span>
                  <span className={getAttributeColor(staff.attributes.youth)}>
                    {staff.attributes.youth}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Scouting:</span>
                  <span
                    className={getAttributeColor(staff.attributes.scouting)}
                  >
                    {staff.attributes.scouting}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Medical:</span>
                  <span className={getAttributeColor(staff.attributes.medical)}>
                    {staff.attributes.medical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Negotiation:</span>
                  <span
                    className={getAttributeColor(staff.attributes.negotiation)}
                  >
                    {staff.attributes.negotiation}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Benefits</h4>
              <ul className="space-y-1">
                {staff.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current staff view
  if (staffType !== 'hire') {
    const filteredStaff = getFilteredCurrentStaff();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <Card key={staff.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{staff.name}</CardTitle>
                    <CardDescription>{staff.role}</CardDescription>
                  </div>
                  <Badge className={getReputationColor(staff.reputation)}>
                    {staff.reputation.charAt(0).toUpperCase() +
                      staff.reputation.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span>{staff.nationality}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{staff.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary:</span>
                    <span>£{staff.salary.toLocaleString()}/week</span>
                  </div>
                  {staff.specialty && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{staff.specialty}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStaff(staff)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Staff Details</DialogTitle>
                      <DialogDescription>
                        View detailed information about this staff member
                      </DialogDescription>
                    </DialogHeader>
                    {selectedStaff && renderStaffDetails(selectedStaff)}
                  </DialogContent>
                </Dialog>

                <Dialog open={fireDialogOpen} onOpenChange={setFireDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => setSelectedStaff(staff)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Fire Staff Member</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to fire {selectedStaff?.name}?
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        Firing this staff member will remove them from your team
                        immediately.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setFireDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          selectedStaff && handleFireStaff(selectedStaff)
                        }
                      >
                        Fire Staff Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No Staff Found</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any staff in this category.
            </p>
            <Button asChild>
              <Link href="/staff?tab=hire">Hire Staff</Link>
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Render hire staff view
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setHireCategory}>
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tactical">Tactical</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="youth">Youth</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="scouting">Scouting</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getFilteredAvailableStaff().map((staff) => (
          <Card key={staff.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {staff.role}
                    </p>
                  </div>
                  <Badge className={getReputationColor(staff.reputation)}>
                    {staff.reputation.charAt(0).toUpperCase() +
                      staff.reputation.slice(1)}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span>{staff.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{staff.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">
                      £{staff.salary.toLocaleString()}/week
                    </span>
                  </div>
                  {staff.specialty && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{staff.specialty}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Staff Profile</DialogTitle>
                        <DialogDescription>
                          View detailed information about this staff member
                        </DialogDescription>
                      </DialogHeader>
                      {selectedStaff && renderStaffDetails(selectedStaff)}
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={hireDialogOpen}
                    onOpenChange={setHireDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setSelectedStaff(staff)}>
                        Hire
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hire Staff Member</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to hire {selectedStaff?.name} as
                          your {selectedStaff?.role}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex justify-between mb-2">
                          <span>Salary:</span>
                          <span className="font-bold">
                            £{selectedStaff?.salary.toLocaleString()}/week
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract Length:</span>
                          <span className="font-bold">2 years</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={handleCloseHireDialog}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            selectedStaff && handleHireStaff(selectedStaff)
                          }
                        >
                          Confirm Hire
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="p-4 bg-muted md:w-48 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Attributes</h4>
                  <div className="space-y-1">
                    {Object.entries(staff.attributes)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key}:</span>
                          <span className={getAttributeColor(value)}>
                            {value}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Top Benefit</h4>
                  <p className="text-xs">{staff.benefits[0]}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {getFilteredAvailableStaff().length === 0 && (
        <div className="text-center py-8">
          <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No Staff Available</h3>
          <p className="text-muted-foreground">
            There are no staff available in this category.
          </p>
        </div>
      )}
    </div>
  );
}
