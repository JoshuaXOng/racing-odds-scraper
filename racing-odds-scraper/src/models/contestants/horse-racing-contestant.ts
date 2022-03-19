import { Contestant, ContestantParams } from "./contestant";

type Horse = {
  id: string;
  name: string;
}

type HorseRacingContestantParams = ContestantParams & {
  horse: Horse;
}

export class HorseRacingContestant extends Contestant {
  horse: Horse;
  constructor({ id, name, horse }: HorseRacingContestantParams) {
    super({ id, name });
    this.horse = horse;
  }
}
