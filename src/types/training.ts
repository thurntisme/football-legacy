export interface ITeamTraining {
  id: string;
  name: string;
  description: string;
  currentLevel: number;
}

export interface IPlayerTraining {
  id: string;
  name: string;
  position: string;
  age: number;
  image: string;
  attributes: {
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
  };
  focus: string;
  development: number;
  trainingIntensity: number;
}
