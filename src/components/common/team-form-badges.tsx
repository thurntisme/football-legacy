import { Badge } from "../ui/badge";

import React from "react";

import { TeamFormEnum } from "@/constants/league";

type Props = {
  forms: TeamFormEnum[];
  shortText?: boolean;
  size?: "xs" | "sm" | "md";
};

const TeamFormBadges = ({ forms, shortText = true, size = "xs" }: Props) => {
  const getTeamFormBadge = (form: TeamFormEnum) => {
    let className = "";
    let title = "";
    switch (form) {
      case TeamFormEnum.WIN:
        className = "bg-green-500";
        title = shortText ? TeamFormEnum.WIN : "Win";
        break;
      case TeamFormEnum.DRAW:
        className = "bg-amber-500";
        title = shortText ? TeamFormEnum.DRAW : "Draw";
        break;
      case TeamFormEnum.LOSE:
        className = "bg-red-500";
        title = shortText ? TeamFormEnum.LOSE : "Lose";
        break;

      default:
        break;
    }

    return {
      className,
      title,
    };
  };

  if (!forms?.length) return null;

  return (
    <div className="flex justify-center gap-1">
      {forms.length &&
        forms.map((form, index) => {
          const { className, title } = getTeamFormBadge(form);
          return (
            <Badge key={index} className={className}>
              <span className={`text-${size}`}>{title}</span>
            </Badge>
          );
        })}
    </div>
  );
};

export default TeamFormBadges;
