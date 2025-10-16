import { Badge } from "@/components/ui/badge";
import { StandingZoneEnum, TeamFormEnum } from "@/constants/league";

export const getStandingZone = (zone: StandingZoneEnum) => {
  switch (zone) {
    case StandingZoneEnum.CHAMPIONS:
      return (
        <div
          className="ml-2 w-2 h-2 rounded-full bg-blue-500"
          title="Champions League"
        ></div>
      );
    case StandingZoneEnum.EUROPE:
      return (
        <div
          className="ml-2 w-2 h-2 rounded-full bg-orange-500"
          title="Europa League"
        ></div>
      );
    case StandingZoneEnum.CONFERENCE:
      return (
        <div
          className="ml-2 w-2 h-2 rounded-full bg-green-500"
          title="Conference League"
        ></div>
      );

    default:
      return null;
  }
};

export const getTeamFormBadge = (
  form: TeamFormEnum,
  shortText = true,
  key = 9999,
) => {
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

  return (
    <Badge className={className} key={key}>
      {title} {key}
    </Badge>
  );
};

export const getStandingPosition = (position: number) => {
  if (position === 1) {
    return "1st";
  } else if (position === 2) {
    return "2nd";
  } else if (position === 3) {
    return "3rd";
  } else {
    return `${position}th`;
  }
};
