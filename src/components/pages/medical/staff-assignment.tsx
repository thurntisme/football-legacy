"use client";

import { useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Staff {
  id: string;
  name: string;
  specialty: string;
  level: number;
  assigned: number;
  experience: number;
}

interface Assignment {
  id: string;
  staffId: string;
  playerName: string;
  status: "active" | "completed" | "pending";
  progress: number;
  startDate: string;
}

const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "Physiotherapy",
    level: 5,
    assigned: 3,
    experience: 15,
  },
  {
    id: "2",
    name: "Dr. Emma Wilson",
    specialty: "Sports Medicine",
    level: 4,
    assigned: 2,
    experience: 10,
  },
  {
    id: "3",
    name: "Dr. Michael Brown",
    specialty: "Surgery",
    level: 3,
    assigned: 1,
    experience: 8,
  },
];

const mockAssignments: Assignment[] = [
  {
    id: "1",
    staffId: "1",
    playerName: "John Doe",
    status: "active",
    progress: 65,
    startDate: "2024-10-01",
  },
  {
    id: "2",
    staffId: "1",
    playerName: "Jane Smith",
    status: "active",
    progress: 45,
    startDate: "2024-10-05",
  },
  {
    id: "3",
    staffId: "2",
    playerName: "Mike Johnson",
    status: "pending",
    progress: 0,
    startDate: "2024-10-15",
  },
];

export function MedicalStaffAssignment() {
  const [staff] = useState<Staff[]>(mockStaff);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>("");

  const handleAssign = () => {
    if (selectedStaff) {
      const newAssignment: Assignment = {
        id: String(assignments.length + 1),
        staffId: selectedStaff,
        playerName: "New Player",
        status: "pending",
        progress: 0,
        startDate: new Date().toISOString().split("T")[0],
      };
      setAssignments([...assignments, newAssignment]);
      setIsOpen(false);
      setSelectedStaff("");
    }
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      Physiotherapy: "bg-blue-100 text-blue-800",
      "Sports Medicine": "bg-green-100 text-green-800",
      Surgery: "bg-red-100 text-red-800",
    };
    return colors[specialty] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Assignments</CardTitle>
            <CardDescription>
              Manage staff assignments to players
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Medical Staff</DialogTitle>
                <DialogDescription>
                  Select a staff member to assign to a player
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Staff Member
                  </label>
                  <Select
                    value={selectedStaff}
                    onValueChange={setSelectedStaff}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Choose staff member..." />
                    </SelectTrigger>
                    <SelectContent className="">
                      {staff.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} - {member.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAssign} className="w-full">
                  Assign Staff
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {assignments.map((assignment) => {
            const assignedStaff = staff.find(
              (s) => s.id === assignment.staffId,
            );
            return (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex-1">
                  <p className="font-semibold">{assignedStaff?.name}</p>
                  <p className="text-sm">Patient: {assignment.playerName}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Recovery Progress</span>
                      <span className="font-semibold">
                        {assignment.progress}%
                      </span>
                    </div>
                    <Progress
                      value={assignment.progress}
                      className="h-2"
                      indicatorBg="bg-gradient-to-r from-green-500 to-green-600"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                  <ConfirmDialog
                    title="Remove Assignment"
                    description="Are you sure you want to remove this assignment?"
                    onConfirm={() => removeAssignment(assignment.id)}
                  >
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
