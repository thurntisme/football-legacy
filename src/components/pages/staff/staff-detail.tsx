import React from "react";

import { Star } from "lucide-react";

import { StaffMember } from "@/types/staff";
import {
  getAttributeColor,
  getReputationColor,
  getRoleIcon,
} from "@/lib/staff";
import { Badge } from "@/components/ui/badge";

type Props = {
  selectedStaff: StaffMember;
};

const StaffDetail = ({ selectedStaff }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <div className="flex items-center gap-3">
            {getRoleIcon(selectedStaff.role)}
            <div>
              <h3 className="font-bold text-lg">{selectedStaff.name}</h3>
              <p className="text-muted-foreground">{selectedStaff.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nationality:</span>
              <span>{selectedStaff.nationality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age:</span>
              <span>{selectedStaff.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span>{selectedStaff.experience} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reputation:</span>
              <Badge className={getReputationColor(selectedStaff.reputation)}>
                {selectedStaff.reputation.charAt(0).toUpperCase() +
                  selectedStaff.reputation.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Salary:</span>
              <span>£{selectedStaff.salary.toLocaleString()}/week</span>
            </div>
            {selectedStaff.contractYears && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract:</span>
                <span>{selectedStaff.contractYears} years</span>
              </div>
            )}
            {selectedStaff.specialty && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialty:</span>
                <span>{selectedStaff.specialty}</span>
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
                  className={getAttributeColor(
                    selectedStaff.attributes.tactical,
                  )}
                >
                  {selectedStaff.attributes.tactical}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Technical:</span>
                <span
                  className={getAttributeColor(
                    selectedStaff.attributes.technical,
                  )}
                >
                  {selectedStaff.attributes.technical}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mental:</span>
                <span
                  className={getAttributeColor(selectedStaff.attributes.mental)}
                >
                  {selectedStaff.attributes.mental}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Physical:</span>
                <span
                  className={getAttributeColor(
                    selectedStaff.attributes.physical,
                  )}
                >
                  {selectedStaff.attributes.physical}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Youth:</span>
                <span
                  className={getAttributeColor(selectedStaff.attributes.youth)}
                >
                  {selectedStaff.attributes.youth}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Scouting:</span>
                <span
                  className={getAttributeColor(
                    selectedStaff.attributes.scouting,
                  )}
                >
                  {selectedStaff.attributes.scouting}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Medical:</span>
                <span
                  className={getAttributeColor(
                    selectedStaff.attributes.medical,
                  )}
                >
                  {selectedStaff.attributes.medical}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Negotiation:</span>
                <span
                  className={getAttributeColor(
                    selectedStaff.attributes.negotiation,
                  )}
                >
                  {selectedStaff.attributes.negotiation}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Benefits</h4>
            <ul className="space-y-1">
              {selectedStaff.benefits.map((benefit, index) => (
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

export default StaffDetail;
